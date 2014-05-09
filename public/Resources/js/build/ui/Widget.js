/**
 * @class build.ui.Widget
 * @extends build.Module
 */
Build('build.ui.Widget', [ 'build::build.Module', 'build::build.utility.ObservableArray' ], function(define, $super) {
	var idCount = {};
	function preventDefault(event) {
		event.preventDefault();
	}
	var cancel = {
		cancel : true
	};
	define({
		$extends : 'build.Module',
		/** 
		 * @constructor
		 */
		$constructor : function Widget() {
			$super(this)();
			this.type = 'div';
			this.watchProperty('id');
			this.watchProperty('className');
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
					configurable : true,
					get : typeof get === 'function' ? function() {
						return get(this.element[name], this);
					} : function() {
						return this.element[name];
					},
					set : typeof set === 'function' ? function(value) {
						value = set(value, cancel);
						if (value !== cancel) {
							this.element[name] = value || '';
							this.publish(property);
						}
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
					configurable : true,
					get : typeof get === 'function' ? function() {
						return get(this.element.getAttribute(attribute), this);
					} : function() {
						return this.element.getAttribute(attribute);
					},
					set : typeof set === 'function' ? function(value) {
						value = set(value, cancel);
						if (value !== cancel) {
							this.element.setAttribute(attribute, value || '');
							this.publish(property);
						}
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
						configurable : true,
						get : typeof get === 'function' ? function() {
							return get(parseFloat(this.element.style[style] || 0), this);
						} : function() {
							return parseFloat(this.element.style[style] || 0);
						},
						set : typeof set === 'function' ? function(value) {
							value = set(value, cancel);
							if (value !== cancel) {
								this.element.style[style] = (value || 0) + unit;
								this.publish(property);
							}
						} : function(value) {
							this.element.style[style] = (value || 0) + unit;
							this.publish(property);
						}
					});
				} else {
					Object.defineProperty(this, property, {
						get : typeof get === 'function' ? function() {
							return get(this.element.style[style], this);
						} : function() {
							return this.element.style[style];
						},
						set : typeof set === 'function' ? function(value) {
							value = set(value, cancel);
							if (value !== cancel) {
								this.element.style[style] = value;
								this.publish(property);
							}
						} : function(value) {
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
					configurable : true,
					get : typeof get === 'function' ? function() {
						return get(this.element.dataset ? this.element.dataset[data] : this.element.getAttribute('data-' + data), this);
					} : function() {
						return this.element.dataset ? this.element.dataset[data] : this.element.getAttribute('data-' + data);
					},
					set : typeof set === 'function' ? function(value) {
						value = set(value, cancel);
						if (value !== cancel) {
							value = value || '';
							this.element.dataset ? this.element.dataset[data] = value : this.element.setAttribute('data-' + data, value);
							this.publish(property);
						}
					} : function(value) {
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
					configurable : true,
					get : typeof get === 'function' ? function() {
						return get(this.element.classList.contains(className), this);
					} : function() {
						return this.element.classList.contains(className);
					},
					set : typeof set === 'function' ? function(value) {
						value = set(value, cancel);
						if (value !== cancel) {
							if (value) {
								this.element.classList.add(className);
							} else {
								this.element.classList.remove(className);
							}
							this.publish(property);
						}
					} : function(value) {
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
			 * 
			 */
			getController : function(element) {
				element = typeof element === 'string' ? document.getElementById(element) : element;
				if (element) {
					return element.controller;
				}
			},
			/**
			 * @static
			 */
			deferClassName : false
		}
	});
});