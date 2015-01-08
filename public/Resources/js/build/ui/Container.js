/**
 * @class build.ui.Container
 * @extends build.ui.Widget
 */
Build('build.ui.Container', [ 'build::build.ui.Widget', 'build::build.utility.ObservableArray' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Container() {
			$super(this)();
			Object.defineProperty(this, 'innerElement', {
				value : this.element,
				configurable : true,
				writable : true,
				enumerable : false
			});
			var childrenHandler = this.createChildrenHandler();
			var baseArray = build.utility.ObservableArray();
			this.watchValue('children', baseArray, null, function(value, cancel) {
				if (this.children) {
					this.children.unsubscribe(childrenHandler);
				}
				if (value) {
					value.subscribe(childrenHandler);
				} else {
					baseArray.subscribe(childrenHandler);
				}
				return value;
			}.bind(this));
			this.watchValue('template', this.staticTemplate, null, function(value, cancel) {
				// We need to clear the children using the old template first.
				// TODO: Only run if the old template has been used.
				this.clearChildren();
				return value;
			}.bind(this));
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.refreshChildren();
				this.subscribe('children', function(value) {
					this.refreshChildren();
				}.bind(this));
				this.subscribe('template', function(value) {
					this.refreshChildren();
				}.bind(this));
			},
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
			refreshChildren : function() {
				var element = this.innerElement;
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
					this.innerElement.appendChild(this.createChild(child));
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
			createChild : function(child) {
				// If we have a template, run the child through there first.
				// If we have a managedTemplate, generate the template from there
				if (this.managedTemplate) {
					// TODO: This will not work if a child is contained multiple times.
					// That should not be a valid case.
					child.tempTemplate = this.managedTemplate();
					child = child.tempTemplate.create(child);
				} else if (this.template && this.template.create) {
					child = this.template.create(child);
				}
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
				} else if (child instanceof HTMLElement) {
					// If we have an element, return the element
					if (child.controller) {
						child.controller.parent = this;
					}
					return child;
				} else {
					// If we have anything else, wrap the element in a div.
					// TODO: Remove iteratorType.
					var iterator = document.createElement(this.iteratorType || 'div');
					iterator.innerHTML = child;
					iterator.className = 'container-child';
					return iterator;
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
			destroyChild : function(child) {
				// If we have a template, run child through there
				if (child.tempTemplate) {
					child.tempTemplate.destroy(child);
				} else if (this.template && this.template.destroy) {
					this.template.destroy(child);
				}
				// TODO: Do we need to do this here?
				if (child && child.controller) {
					child.controller.parent = null;
				}
			},
			destroy : function(isDestroying) {
				$super().destroy(this)();
				var element = this.innerElement;
				if (element) {
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
				}
				var child;
				while (child = this.children.pop()) {
					if (child) {
						child.destroy();
						delete child;
					} else {
						console.log('already destroyed?');
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
				return {
					push : function(child) {
						var element = this.innerElement;
						if (element) {
							child = this.createChild(child);
							element.appendChild(child);
						}
					}.bind(this),
					pop : function() {
						var element = this.innerElement;
						if (element) {
							this.destroyChild(element.lastChild);
							element.removeChild(element.lastChild);
						}
					}.bind(this),
					unshift : function(child) {
						// Add to beginning of array
						var element = this.innerElement;
						if (element) {
							child = this.createChild(child);
							element.insertBefore(child, element.firstChild);
						}
					}.bind(this),
					shift : function() {
						// Remove from beginning of array
						var element = this.innerElement;
						if (element) {
							this.destroyChild(element.firstChild);
							element.removeChild(element.firstChild);
						}
					}.bind(this),
					reverse : function() {
						// Sort in opposite direction
						// Array is sorted, we can simply remove all elements, and re-append them.
						this.modifyElement(function() {
							var element = this.innerElement;
							while (element.firstChild) {
								element.removeChild(element.firstChild);
							}

							for (var index = 0, length = this.children.length; index < length; index++) {
								element.appendChild(this.children[index].element);
							}
						}.bind(this));
					}.bind(this),
					sort : function() {
						// Sort based on function
						// Array is sorted, we can simply remove all elements, and re-append them.
						this.modifyElement(function() {
							var element = this.innerElement;
							while (element.firstChild) {
								element.removeChild(element.firstChild);
							}

							for (var index = 0, length = this.children.length; index < length; index++) {
								element.appendChild(this.children[index].element);
							}
						}.bind(this));
					}.bind(this),
					splice : function(index, howMany) {
						var element = this.innerElement;
						if (element) {
							var nextSibling = element.childNodes[index + howMany];
							var elementsToAdd = Array.prototype.slice.call(arguments, 2);
							var elementsToRemove = Array.prototype.slice.call(element.childNodes, index, index + howMany);
							var elementToRemove;
							while (elementToRemove = elementsToRemove.pop()) {
								this.destroyChild(elementToRemove);
								element.removeChild(elementToRemove);
							}
							var elementToAdd;
							while (elementToAdd = elementsToAdd.pop()) {
								elementToAdd = this.createChild(elementToAdd);
								element.insertBefore(elementToAdd, nextSibling);
							}
						}
						this.refreshChildren();
					}.bind(this),
					get : function(index) {
						// TODO: Is this necessary?
						var element = this.innerElement;
						return element.childNodes[index];
					}.bind(this),
					set : function(index, child) {
						var element = this.innerElement;
						if (element) {
							var oldChild = element.childNodes[index];
							if (oldChild) {
								this.destroyChild(oldChild);
								child = this.createChild(child);
								element.replaceChild(oldChild, child);
							}
						}
					}.bind(this),
					removeAll : function() {
						var element = this.innerElement;
						if (element) {
							while (element.firstChild) {
								this.destroyChild(element.firstChild);
								element.removeChild(element.firstChild);
							}
						}
					}.bind(this),
					subscribe : function() {
						this.refreshChildren();
					}.bind(this),
					publish : function() {
						this.refreshChildren();
					}.bind(this),
					all : function() {
						this.refreshChildren();
					}
				};
			}
		}
	});
});