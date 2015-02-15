/**
 * @class build.ui.SwitcherChildrenHandler
 * @extends build.ui.ChildrenHandler
 */
Build('build.ui.SwitcherChildrenHandler', [ 'build::build.ui.ChildrenHandler' ], function(define, $super) {
	define({
		$extends : 'build.ui.ChildrenHandler',
		/**
		 * @constructor
		 */
		$constructor : function SwitcherChildrenHandler(element, owner) {
			$super(this)(element, owner);
		},
		$prototype : {
			run : function(name, args) {
				var handler = this[name];
				if (typeof handler === 'function') {
					handler.apply(this.owner, args);
				}
			},
			push : function() {
				var element = this.innerElement;
				if (element) {
					for (var index = 0, length = arguments.length; index < length; index++) {
						var child = this.createChild(arguments[index]);
						element.appendChild(child);
					}
				}
				if (this.children.length == 1) {
					this.toggleChildElement(child, true);
				} else {
					this.toggleChildElement(child, false);
				}
			},
			pop : function() {
				var element = this.innerElement;
				if (element) {
					if (element.lastChild) {
						this.destroyChild(element.lastChild);
						element.removeChild(element.lastChild);
					}
				}
			},
			unshift : function() {
				// Add to beginning of array
				var element = this.innerElement;
				if (element) {
					for (var index = arguments.length - 1; index >= 0; index--) {
						var child = this.createChild(arguments[index]);
						element.insertBefore(child, element.firstChild);
					}
				}
				if (this.children.length == 1) {
					this.toggleChildElement(child, true);
				} else {
					this.toggleChildElement(child, false);
				}
			},
			shift : function() {
				// Remove from beginning of array
				var element = this.innerElement;
				if (element) {
					if (element.firstChild) {
						this.destroyChild(element.firstChild);
						element.removeChild(element.firstChild);
					}
				}
			},
			reverse : function() {
				// Sort in opposite direction
				// Array is sorted, we can simply remove all elements, and re-append them.
				var activeChild = this.activeChild;
				// Remove from beginning of array
				this.modifyElement(function() {
					var element = this.innerElement;
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}

					for (var index = 0, length = this.children.length; index < length; index++) {
						element.appendChild(this.children[index].element);
					}
				}.bind(this));
				this.activeChild = activeChild;
			},
			sort : function() {
				// Sort based on function
				// Array is sorted, we can simply remove all elements, and re-append them.
				// Find the active child.
				var activeChild = this.activeChild;
				this.modifyElement(function() {
					var element = this.innerElement;
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}

					for (var index = 0, length = this.children.length; index < length; index++) {
						element.appendChild(this.children[index].element);
					}
				}.bind(this));
				this.activeChild = activeChild;
			},
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
			},
			get : function(index) {
				// TODO: Is this necessary?
				var element = this.innerElement;
				return element.childNodes[index];
			},
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
			},
			removeAll : function() {
				var element = this.innerElement;
				if (element) {
					while (element.firstChild) {
						this.destroyChild(element.firstChild);
						element.removeChild(element.firstChild);
					}
				}
			},
			subscribe : function() {
				this.refreshChildren();
			},
			publish : function() {
				this.refreshChildren();
			},
			all : function() {
				this.refreshChildren();
			}
		}
	});
});