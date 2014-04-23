/**
 * @class build.ui.Widget
 * @extends build.ui.Module
 */
Build('build.ui.Widget', [ 'build::build.ui.Module', 'build::build.utility.ObservableArray' ], function(define, $super, helper) {
	var idCount = {};
	function preventDefault(event) {
		event.preventDefault();
	}
	define({
		$extends : 'build.ui.Module',
		/** 
		 * @constructor
		 */
		$constructor : function Widget() {
			$super(this)();
			this.type = 'div';
			this.watchProperty('id');
			this.watchProperty('className');
			this.children = build.utility.ObservableArray();
			this.children.subscribe(function() {
				this.refreshChildren();
			}.bind(this));
			this.directAppend = false;
		},
		$prototype : {
			/**
			 * @method init
			 */
			init : function() {
				this.id = this.uniqueId();
				this.className = this.uniqueClass();
				Object.defineProperty(this, 'classList', {
					get : function() {
						var classList = this.element.classList;
						var self = this;
						var add = classList.add;
						classList.add = function() {
							add.apply(this, arguments);
							self.publish('classList');
						};
						var remove = classList.remove;
						classList.remove = function() {
							remove.apply(this, arguments);
							self.publish('classList');
						};
						var toggle = classList.toggle;
						classList.toggle = function() {
							toggle.apply(this, arguments);
							self.publish('classList');
						};
						return classList;
					},
					set : function(value) {
						if (typeof value === 'string') {
							this.element.className = value;
						} else if (value instanceof Array) {
							this.element.className = value.join(' ');
						}
						this.publish('classList');
					}
				});
				this.refreshChildren();
			},
			/**
			 * @method createElement
			 */
			createElement : function() {
				this.element = document.createElement(this.type);
				// this.element.classList.add(this.uniqueClass());
				this.element.controller = this;
			},
			/**
			 * @method clearChildren
			 */
			clearChildren : function(element) {
				element = element || this.element;
				if (element) {
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
				}
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function() {
				var element = this.element;
				if (element) {
					this.clearChildren(element);
					if (this.children) {
						this.children.forEach(this.childIterator.bind(this));
					}
				}
			},
			/**
			 * @method childIterator
			 */
			childIterator : function(child, index, array) {
				if (child) {
					if (this.directAppend) {
						this.element.appendChild(child.element || child);
					} else {
						var iterator = document.createElement('div');
						iterator.appendChild(child.element || child);
						iterator.className = 'panel-iterator';
						this.element.appendChild(iterator);
					}
				}
			},
			/**
			 * @method addChild
			 */
			addChild : function(child) {
				this.children.push(child);
			},
			/**
			 * @method removeChild
			 */
			removeChild : function(child) {
				var index = this.children.indexOf(child);
				if (index != -1) {
					this.children.splice(index, 1);
				}
			},
			/**
			 * @method uniqueId
			 */
			uniqueId : function() {
				var $name = this.constructor.$name;
				idCount[$name] = idCount[$name] !== undefined ? idCount[$name] + 1 : 0;
				return Build.nameToCss($name + '-' + idCount[$name]);
			},
			/**
			 * @method uniqueClass
			 */
			uniqueClass : function() {
				var className = Build.nameToCss(this.constructor.$name);
				if (this.constructor.deferClassName && this.constructor.$parent) {
					var parent = this.constructor.$parent;
					while (parent.deferClassName) {
						parent = parent.$parent;
					}
					className += ' ' + Build.nameToCss(parent.$name);
				}
				return className;
			},
			// appendChild : function(widget) {
			// this.element.appendChild(widget.element);
			// },
			// removeChild : function(widget) {
			// this.element.removeChild(widget.element);
			// },
			/**
			 * @method addClass
			 */
			addClass : function(className) {
				if (className) {
					this.classList.add(className);
					this.publish('className');
				}
			},
			/**
			 * @method removeClass
			 */
			removeClass : function(className) {
				if (className) {
					this.classList.remove(className);
					this.publish('className');
				}
			},
			/**
			 * @method addEvent
			 */
			addEvent : function(type, listener, useCapture, bind) {
				if (bind) {
					this.element.addEventListener(type, listener.bind(bind, this.element), useCapture);
				} else {
					this.element.addEventListener(type, listener, useCapture);
				}
			},
			/**
			 * @method removeEvent
			 */
			removeEvent : function(type, listener) {
				this.element.removeEventListener(type, listener);
			},
			/**
			 * @method preventDefault
			 * @param type
			 */
			preventDefault : function(type) {
				this.element.addEventListener(type || 'click', preventDefault);
			},
			/**
			 * @method allowDefault
			 */
			allowDefault : function(type) {
				this.element.removeEventListener(type || 'click', preventDefault);
			},
			/**
			 * @method watchProperty
			 */
			watchProperty : function(property, name, get, set) {
				name = name || property;
				Object.defineProperty(this, property, {
					get : get ? function() {
						return get(this.element[name]);
					} : function() {
						return this.element[name];
					},
					set : set ? function(value) {
						this.element[name] = set(value) || '';
						this.publish(property);
					} : function(value) {
						this.element[name] = value || '';
						this.publish(property);
					}
				});
			},
			/**
			 * @method watchAttribute
			 */
			watchAttribute : function(property, attribute, get, set) {
				attribute = attribute || property;
				Object.defineProperty(this, property, {
					get : get ? function() {
						return get(this.element.getAttribute(attribute));
					} : function() {
						return this.element.getAttribute(attribute);
					},
					set : set ? function(value) {
						this.element.setAttribute(attribute, set(value) || '');
						this.publish(property);
					} : function(value) {
						this.element.setAttribute(attribute, value || '');
						this.publish(property);
					}
				});
			},
			/**
			 * @method watchStyle
			 */
			watchStyle : function(property, style, unit) {
				style = style || property;
				if (unit) {
					Object.defineProperty(this, property, {
						get : function() {
							return parseFloat(this.element.style[style] || 0);
						},
						set : function(value) {
							this.element.style[style] = (value || 0) + unit;
							this.publish(property);
						}
					});
				} else {
					Object.defineProperty(this, property, {
						get : function() {
							return this.element.style[style];
						},
						set : function(value) {
							this.element.style[style] = value;
							this.publish(property);
						}
					});
				}
			},
			// TODO: Remove this polyfill once IE10 support is dropped.
			/**
			 * @method watchData
			 */
			watchData : function(property, data) {
				data = data || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element.dataset ? this.element.dataset[data] : this.element.getAttribute('data-' + data);
					},
					set : function(value) {
						value = value || '';
						this.element.dataset ? this.element.dataset[data] = value : this.element.setAttribute('data-' + data, value);
						this.publish(property);
					}
				});
			},
			/**
			 * @method watchClass
			 */
			watchClass : function(property, className) {
				className = className || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element.classList.contains(className);
					},
					set : function(value) {
						if (value) {
							this.element.classList.add(className);
						} else {
							this.element.classList.remove(className);
						}
						this.publish(property);
					}
				});
			},
			/**
			 * 
			 */
			getPreloadContainer : function() {
				var preloadContainer = document.getElementById('build-preload-container');
				if (!preloadContainer) {
					preloadContainer = document.createElement('div');
					preloadContainer.id = 'build-preload-container';
					document.body.appendChild(preloadContainer);
				}
				return preloadContainer;
			}
		},
		$static : {
			/**
			 * @method create
			 * @static
			 */
			create : function() {
				var result = Object.create(this.prototype);
				result = this.apply(result, arguments) || result;
				result.createElement();
				result.init.apply(result, arguments);
				return result;
			},
			/**
			 * @static
			 */
			deferClassName : false
		}
	});
});