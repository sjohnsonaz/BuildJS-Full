Build('build.ui.Widget', [ 'build::build.ui.Module', 'build::build.utility.ObservableArray' ], function(define, $super, merge) {
	var idCount = {};
	define({
		$extends : 'build.ui.Module',
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
			createElement : function() {
				this.element = document.createElement(this.type);
				// this.element.classList.add(this.uniqueClass());
				this.element.controller = this;
			},
			clearChildren : function(element) {
				element = element || this.element;
				if (element) {
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
				}
			},
			refreshChildren : function() {
				var element = this.element;
				if (element) {
					this.clearChildren(element);
					if (this.children) {
						this.children.forEach(this.childIterator.bind(this));
					}
				}
			},
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
			addChild : function(child) {
				this.children.push(child);
			},
			removeChild : function(child) {
				var index = this.children.indexOf(child);
				if (index != -1) {
					this.children.splice(index, 1);
				}
			},
			uniqueId : function() {
				var $name = this.constructor.$name;
				idCount[$name] = idCount[$name] !== undefined ? idCount[$name] + 1 : 0;
				return Build.nameToCss($name + '-' + idCount[$name]);
			},
			uniqueClass : function() {
				return Build.nameToCss(this.constructor.$name);
			},
			// appendChild : function(widget) {
			// this.element.appendChild(widget.element);
			// },
			// removeChild : function(widget) {
			// this.element.removeChild(widget.element);
			// },
			addClass : function(className) {
				if (className) {
					this.classList.add(className);
					this.publish('className');
				}
			},
			removeClass : function(className) {
				if (className) {
					this.classList.remove(className);
					this.publish('className');
				}
			},
			addEvent : function(type, listener, useCapture, bind) {
				if (bind) {
					this.element.addEventListener(type, listener.bind(bind, this.element), useCapture);
				} else {
					this.element.addEventListener(type, listener, useCapture);
				}
			},
			removeEvent : function(type, listener) {
				this.element.removeEventListener(type, listener);
			},
			watchProperty : function(property, name, get, set) {
				name = name || property;
				Object.defineProperty(this, property, {
					get : get ? function() {
						return get(this.element[name]);
					} : function() {
						return this.element[name];
					},
					set : set ? function(value) {
						this.element[name] = set(value);
						this.publish(property);
					} : function(value) {
						this.element[name] = value;
						this.publish(property);
					}
				});
			},
			watchAttribute : function(property, attribute, get, set) {
				attribute = attribute || property;
				Object.defineProperty(this, property, {
					get : get ? function() {
						return get(this.element.getAttribute(attribute));
					} : function() {
						return this.element.getAttribute(attribute);
					},
					set : set ? function(value) {
						this.element.setAttribute(attribute, set(value));
						this.publish(property);
					} : function(value) {
						this.element.setAttribute(attribute, value);
						this.publish(property);
					}
				});
			},
			watchStyle : function(property, style, unit) {
				style = style || property;
				if (unit) {
					Object.defineProperty(this, property, {
						get : function() {
							return parseFloat(this.element.style[style] || 0);
						},
						set : function(value) {
							this.element.style[style] = value + unit;
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
			watchData : function(property, data) {
				data = data || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element.dataset ? this.element.dataset[data] : this.element.getAttribute('data-' + data);
					},
					set : function(value) {
						this.element.dataset ? this.element.dataset[data] = value : this.element.setAttribute('data-' + data, value);
						this.publish(property);
					}
				});
			},
			watchClass : function(property, className) {
				className = className || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element.classList.contains(className);
					},
					set : function(value) {
						if (value) {
							this.element.classList.add(value);
						} else {
							this.element.classList.remove(value);
						}
						this.publish(property);
					}
				});
			}
		},
		$static : {
			create : function() {
				var result = Object.create(this.prototype);
				result = this.apply(result, arguments) || result;
				result.createElement();
				result.init.apply(result, arguments);
				return result;
			}
		}
	});
});