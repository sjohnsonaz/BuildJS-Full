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
			this.template(this.element, this.innerElement);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.refreshChildren();
				this.subscribe('children', function(value) {
					this.refreshChildren();
				}.bind(this));
			},
			template : function(element, innerElement) {
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
			addChild : function(child) {
				this.children.push(child);
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
			 */
			createChild : function(child) {
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
						this.refreshChildren();
					}.bind(this),
					sort : function() {
						// Sort based on function
						this.refreshChildren();
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
								child = this.createChild(child);
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
					}.bind(this)
				};
			}
		}
	});
});