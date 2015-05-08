/**
 * @class build.ui.Widget
 * @extends build.Module
 */
Build('build.ui.Widget', [ 'build::build.Module' ], function($define, $super) {
	var idCount = {};
	function preventDefault(event) {
		event.preventDefault();
	}
	var cancel = {
		cancel : true
	};
	$define({
		$extends : 'build.Module',
		/** 
		 * @constructor
		 */
		$constructor : function Widget() {
			$super(this)();
			this.createElement();
			// id is left blank by default.
			this.watchProperty('id', 'id', Build.debug ? this.uniqueId() : undefined);
			this.watchProperty('className', 'className', this.uniqueClass());
			// A Widget may be contained by Container.
			this.watchProperty('parent');
			// TODO: Add options via watch method.
			Object.defineProperty(this, 'parent', {
				enumerable : false
			});
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
		$prototype : {
			/**
			 * @property type
			 */
			type : 'div',
			/**
			 * @method init
			 */
			init : function() {
			},
			/**
			 * @method createElement
			 */
			createElement : function() {
				Object.defineProperty(this, 'element', {
					value : document.createElement(this.type),
					configurable : true,
					writable : true,
					enumerable : false
				});
				// this.element.classList.add(this.uniqueClass());
				this.element.$controller = this;
			},
			/**
			 * @method uniqueId
			 */
			uniqueId : function(name) {
				var $name = name || this.constructor.$name;
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
			addEventListener : function(type, listener, useCapture, bind) {
				if (bind) {
					this.element.addEventListener(type, listener.bind(bind, this.element), useCapture);
				} else {
					this.element.addEventListener(type, listener, useCapture);
				}
			},
			/**
			 * @method removeEvent
			 */
			removeEventListener : function(type, listener) {
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
			// TODO: Fix value change detection on setter methods.
			watchProperty : function(property, name, value, get, set, thisArg, definition) {
				var self = this;
				this.watchValueFunction(property, name, value, get, set, thisArg, definition, function(name) {
					return self.element[name];
				}, function(name, value) {
					self.element[name] = typeof value === 'undefined' ? '' : value
				});
			},
			/**
			 * @method watchAttribute
			 */
			watchAttribute : function(property, attribute, value, get, set, thisArg, definition) {
				var self = this;
				this.watchValueFunction(property, attribute, value, get, set, thisArg, definition, function(attribute) {
					// TODO: Decide action on undefined
					return self.element.getAttribute(attribute);
				}, function(attribute, value) {
					self.element.setAttribute(attribute, typeof value === 'undefined' ? '' : value);
				});
			},
			/**
			 * @method watchStyle
			 */
			// TODO: Apply value change detection on setter methods.
			watchStyle : function(property, style, unit, value, get, set, thisArg, definition) {
				var self = this;
				this.watchValueFunction(property, style, value, get, set, thisArg, definition, function(style) {
					if (unit) {
						return parseFloat(self.element.style[style] || 0);
					} else {
						return self.element.style[style];
					}
				}, function(style, value) {
					if (unit) {
						self.element.style[style] = (value) + unit;
					} else {
						self.element.style[style] = value;
					}
				});
			},
			// TODO: Remove this polyfill once IE10 support is dropped.
			/**
			 * @method watchData
			 */
			watchData : function(property, data, value, get, set, thisArg, definition) {
				var self = this;
				this.watchValueFunction(property, data, value, get, set, thisArg, definition, function(data) {
					return self.element.dataset ? self.element.dataset[data] : self.element.getAttribute('data-' + data);
				}, function(data, value) {
					self.element.dataset ? self.element.dataset[data] = value : self.element.setAttribute('data-' + data, value);
				});
			},
			runClassName : function(className, value) {
				var newClassName;
				switch (typeof className) {
				case 'string':
					newClassName = value ? className : undefined;
					break;
				case 'object':
					newClassName = className[value];
					break;
				case 'function':
					newClassName = className(value);
					break;
				}
				return newClassName;
			},
			getClassName : function(className, lastClassName, hidden) {
				var value;
				switch (typeof className) {
				case 'string':
					value = this.element.classList.contains(className);
					break;
				case 'object':
					for ( var name in className) {
						if (className.hasOwnProperty(name)) {
							if (this.element.classList.contains(name)) {
								value = name;
								break;
							}
						}
					}
					break;
				case 'function':
					value = hidden;
					break;
				}
				return value;
			},
			setClassName : function(className, lastClassName, value) {
				var newClassName = this.runClassName(className, value);
				if (newClassName !== lastClassName) {
					if (lastClassName) {
						this.element.classList.remove(lastClassName);
					}
					if (newClassName) {
						this.element.classList.add(newClassName);
					}
				}
			},
			/**
			 * @method watchClass
			 */
			watchClass : function(property, className, value, get, set, thisArg, definition) {
				className = className || property;
				// TODO: Decide action on undefined
				var lastClassName = undefined;
				var firstValue = this.runSet(value, set, thisArg);
				if (typeof firstValue !== 'undefined') {
					this.setClassName(className, lastClassName, firstValue);
				}
				var hidden = firstValue;
				Object.defineProperty(this, property, Build.merge({
					configurable : true,
					enumerable : true,
					get : typeof get === 'function' ? function() {
						return thisArg ? get.call(thisArg, this.element.classList.contains(className), this) : get(this.element.classList.contains(className), this);
					} : function() {
						return this.element.classList.contains(className);
					},
					set : typeof set === 'function' ? function(value) {
						if (value !== this.element.classList.contains(className)) {
							value = thisArg ? set.call(thisArg, value, hidden, cancel) : set(value, hidden, cancel);
							if (value !== cancel) {
								hidden = value;
								if (value) {
									this.element.classList.add(className);
								} else {
									this.element.classList.remove(className);
								}
								this.publish(property);
							}
						}
					} : function(value) {
						if (value !== this.element.classList.contains(className)) {
							if (value) {
								this.element.classList.add(className);
							} else {
								this.element.classList.remove(className);
							}
							this.publish(property);
						}
					}
				}, definition));
			},
			/**
			 * @method modifyElement
			 * Prevents multiple DOM reflows.
			 */
			modifyElement : function(callback, async) {
				var element = this.innerElement;
				var parentNode = element.parentNode;
				var nextSibling = element.nextSibling;
				parentNode.removeChild(element);
				if (async) {
					callback(function() {
						if (nextSibling) {
							parentNode.insertBefore(element, nextSibling);
						} else {
							parentNode.appendChild(element);
						}
					});
				} else {
					callback();
					if (nextSibling) {
						parentNode.insertBefore(element, nextSibling);
					} else {
						parentNode.appendChild(element);
					}
				}
			},
			/**
			 * @method appendChildren
			 * Appends multiple children via a DocumentFragment.
			 */
			appendChildren : function(children, referenceElement) {
				if (!(children instanceof Array)) {
					if (referenceElement) {
						this.innerElement.insertBefore(children, referenceElement);
					} else {
						this.innerElement.appendChild(children);
					}
				} else {
					var fragment = document.createDocumentFragment();
					for (var index = 0, length = children.length; index < length; index++) {
						fragment.appendChild(children[index]);
					}
					if (referenceElement) {
						this.innerElement.insertBefore(fragment, referenceElement);
					} else {
						this.innerElement.appendChild(fragment);
					}
				}
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
			},
			/**
			 * 
			 */
			destroy : function(isDestroying) {
				$super().destroy(this)();
				// Assume parent is a Container
				if (this.parent) {
					if (!isDestroying) {
						this.parent.removeChild(this);
					}
					this.parent = undefined;
				}
			}
		},
		$static : {
			/**
			 * @method create
			 * @static
			 */
			create : function() {
				var result = Object.create(this.prototype, Build.debug ? {
					constructor : {
						value : this
					}
				} : undefined);
				result = this.apply(result, arguments) || result;
				result.init.apply(result, arguments);
				return result;
			},
			/**
			 * @method createType
			 * @static
			 */
			createType : function(type) {
				var result = Object.create(this.prototype, Build.debug ? {
					constructor : {
						value : this
					},
					type : {
						value : type
					}
				} : undefined);
				var args = Array.prototype.slice.call(arguments, 1);
				result = this.apply(result, args) || result;
				result.init.apply(result, args);
				return result;
			},
			/**
			 * 
			 */
			getController : function(element) {
				element = typeof element === 'string' ? document.getElementById(element) : element;
				if (element) {
					return element.$controller;
				}
			},
			/**
			 * @static
			 */
			deferClassName : false
		}
	});
});