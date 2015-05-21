/**
 * @class build.ui.Container
 * @extends build.ui.Widget
 */
Build('build.ui.Container', [ 'build::build.ui.Widget', 'build::build.utility.ObservableArray', 'build::build.ui.ChildrenHandler' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Container(text) {
			$super(this)();
			var self = this;
			// TODO: This should be protected in a Document Fragment.
			this.watchValue('innerElement', this.element, undefined, function(value, current, cancel) {
				var oldElement = self.innerElement || self.element;
				if (value != oldElement) {
					while (oldElement.firstChild) {
						value.appendChild(oldElement.firstChild);
					}
				}
				return value;
			});
			Object.defineProperty(this, 'innerElement', {
				value : this.element,
				configurable : true,
				writable : true,
				enumerable : false
			});
			var childrenHandler = this.createChildrenHandler();
			this.baseArray = build.utility.ObservableArray();
			this.watchValue('children', this.baseArray, undefined, function(value, current, cancel) {
				if (self.children != value) {
					if (self.children) {
						self.unsubscribeChildren(self.children, childrenHandler);
					}
					if (!value) {
						value = self.baseArray;
					}
					self.subscribeChildren(value, childrenHandler);
					self.refreshChildren(value);
				}
				return value;
			});

			this.watchValue('template', this.template, undefined, function(value, current, cancel) {
				// We need to clear the children using the old template first.
				// TODO: Only run if the old template has been used.
				self.refreshChildren();
				return value;
			});
			this.watchProperty('text', 'innerHTML', text || '', undefined, function(value, current, cancel) {
				return (self.children && self.children.length) ? cancel : self.formatString(value, self);
			});
			this.watchProperty('rawText', 'innerHTML', undefined, function(value, current, cancel) {
				return (self.children && self.children.length) ? cancel : (typeof value !== 'undefined' ? value : '');
			});
		},
		$prototype : {
			/**
			 * @method clearChildren
			 */
			clearChildren : function(element) {
				element = element || this.innerElement;
				if (element) {
					while (element.firstChild) {
						// TODO: This is inefficient.
						this.destroyChild(element.firstChild);
						element.removeChild(element.firstChild);
					}
				}
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function(children) {
				var element = this.innerElement;
				if (element) {
					this.clearChildren(element);
					children = children || this.children;
					if (children) {
						var self = this;
						children.forEach(function(child, index, array) {
							if (child) {
								var element = self.createChild(child, index);
								if (element instanceof HTMLElement) {
									self.innerElement.appendChild(element);
								} else {
									console.log('no element');
								}
							}
						});
					}
				}
			},
			refreshIndices : function(children) {
				children = children || this.children;
				for (var index = 0, length = children.length; index < length; index++) {
					var child = children[index];
					if (typeof child.$index !== 'undefined') {
						child.$index = index;
					}
				}
			},
			/**
			 * @method addChild
			 * @param child
			 */
			addChild : function(child, beforeElement) {
				if (beforeElement) {
					var index = this.children.indexOf(beforeElement);
					if (index != -1) {
						this.children.splice(index, 0, child);
					} else {
						this.children.push(child);
					}
				} else {
					this.children.push(child);
				}
			},
			/**
			 * @method removeChild
			 * @param child
			 */
			removeChild : function(child) {
				var index = this.children.indexOf(child);
				if (index != -1) {
					this.children.splice(index, 1);
				}
			},
			/**
			 * @method createChild
			 * @param child
			 * 
			 * How to make a template:
			 * 
			 * (function() {
			 *     return {
			 *         create : function(child) {
			 *             return child
			 *         },
			 *         destroy : function(child) {
			 *         }
			 *     };
			 * })();
			 */
			createChild : function(child, $index) {
				var element = null;
				$index = $index || 0;

				// If we have a template, run the child through there first.
				// If we have a managedTemplate, generate the template from there.
				var template = (typeof this.template === 'function') ? this.template() : this.template;
				if (template && typeof template.create === 'function') {
					if (child instanceof build.ui.Widget) {
						if (typeof child.$index === 'undefined') {
							child.watchValue('$index');
						}
						child.$index = $index;
					}
					var templateResult = template.create(child, this);
					this.updateParent(child);
					// TODO: Should this be the template parent or the child parent?
					this.updateParent(templateResult, true);
					element = templateResult.element || templateResult;
					element.$template = template;
					element.$child = child;
					//element.$controller = child;
				} else if (child instanceof build.ui.Widget) {
					// If we have a Widget, return the element
					this.updateParent(child);
					if (typeof child.$index === 'undefined') {
						child.watchValue('$index');
					}
					child.$index = $index;
					element = child.element;
				} else if (child instanceof build.ui.Text) {
					element = child.element;
				} else if (child instanceof HTMLElement) {
					//if (child.$controller) {
					//child.$controller.parent = this;
					//}
					element = child;
				}

				// If we still don't have an element, wrap the content in a div.
				if (!(element instanceof Node)) {
					// TODO: Remove iteratorType.
					element = document.createElement(this.iteratorType || 'div');
					element.innerHTML = child;
					element.className = 'container-child';
				}

				return element;
			},
			updateParent : function(child, isTemplate) {
				// We are the actual parent
				if (this.baseArray == this.children || isTemplate) {
					// We can set parent
					if (child instanceof build.ui.Widget) {
						// Set the value
						// If the value is already set, the watchValue will prevent publish.
						child.parent = this;
					}
				}
			},
			/**
			 * @method linkChild
			 * @param child
			 */
			linkChild : function(child) {
				// If we have a Widget, return the element
				if (child instanceof build.ui.Widget) {
					if (child.parent) {
						if (child.parent != this) {
							child.parent.children.remove(child);
							child.parent = this;
						}
					} else {
						child.parent = this;
					}
					return child.element;
				}
			},
			/**
			 * @method destroyChild
			 * @param child
			 */
			destroyChild : function(element) {
				// If we have a template, run child through there
				if (element.$template) {
					if (typeof element.$template.destroy === 'function') {
						element.$template.destroy(element.$controller, element);
					}
					if (element.$controller) {
						element.$controller.destroy();
					}
				}
				// TODO: Do we need to do this here?
				//element.$controller.parent = null;
			},
			destroy : function(isDestroying) {
				$super().destroy(this)();
				var element = this.innerElement;
				if (element) {
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
				}
				// TODO: Only delete children if we are the base?
				if (this.children === this.baseArray) {
					var child;
					while (child = this.children.pop()) {
						if (child) {
							if (child.destroy) {
								child.destroy(true);
							}
							delete child;
						} else {
							console.log('already destroyed?');
						}
					}
				}
			},
			defaultTemplate : (function() {
				return {
					create : function(child) {
						return child;
					},
					destroy : function(child) {
					}
				};
			})(),
			createChildrenHandler : function() {
				return new build.ui.ChildrenHandler(this.innerElement, this);
			},
			subscribeChildren : function(children, childrenHandler) {
				if (children.subscribe) {
					children.subscribe(childrenHandler);
				}
			},
			unsubscribeChildren : function(children, childrenHandler) {
				if (children.unsubscribe) {
					children.unsubscribe(childrenHandler);
				}
			}
		}
	});
});