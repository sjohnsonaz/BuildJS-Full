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
						if (element.controller) {
							element.controller.parent = null;
						} else {
							console.log(element);
						}
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
					// TODO: We do not need to set parent here.
					child.parent = this;

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
						//this.refreshChildren();
						var element = this.innerElement;
						if (element) {
							child = this.createChild(child);
							element.appendChild(child);
						}
					}.bind(this),
					pop : function() {
						this.refreshChildren();
						//var element = this.innerElement;
						//if (element) {
						//element.removeChild(element.lastChild);
						//}
					}.bind(this),
					unshift : function() {
						// Add to beginning of array
						this.refreshChildren();
					}.bind(this),
					shift : function() {
						// Remove from beginning of array
						this.refreshChildren();
					}.bind(this),
					reverse : function() {
						// Sort in opposite direction
						this.refreshChildren();
					}.bind(this),
					sort : function() {
						// Sort based on function
						this.refreshChildren();
					}.bind(this),
					splice : function() {
						this.refreshChildren();
					}.bind(this),
					get : function() {
						this.refreshChildren();
					}.bind(this),
					set : function() {
						this.refreshChildren();
					}.bind(this),
					removeAll : function() {
						this.refreshChildren();
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