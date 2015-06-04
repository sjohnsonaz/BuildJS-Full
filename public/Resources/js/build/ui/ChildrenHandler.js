/**
 * @class build.ui.ChildrenHandler
 */
Build('build.ui.ChildrenHandler', [], function(define, $super) {
	define({
		/**
		 * @constructor
		 */
		$constructor : function ChildrenHandler(element, owner) {
			this.innerElement = element;
			this.owner = owner;
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
					var baseIndex = element.children.length;
					for (var index = 0, length = arguments.length; index < length; index++) {
						var child = this.createChild(arguments[index], baseIndex + index);
						element.appendChild(child);
					}
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
						var child = this.createChild(arguments[index], index);
						element.insertBefore(child, element.firstChild);
					}
					this.refreshIndices();
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
					this.refreshIndices();
				}
			},
			reverse : function() {
				// Sort in opposite direction
				// Array is sorted, we can simply remove all elements, and re-append them.
				var self = this;
				this.modifyElement(function() {
					var element = self.innerElement;
					var children = Array.prototype.slice.call(element.children);
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}

					children.reverse();
					for (var index = 0, length = children.length; index < length; index++) {
						element.appendChild(children[index]);
					}
					self.refreshIndices();
				});
			},
			sort : function() {
				// Sort based on function
				// Array is sorted, we can simply remove all elements, and re-append them.
				var self = this;
				this.modifyElement(function() {
					var element = self.innerElement;
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}

					// TODO: This will only work for HTMLElements.
					for (var index = 0, length = self.children.length; index < length; index++) {
						element.appendChild(self.children[index].element);
					}
					self.refreshIndices();
				});
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
					var baseIndex = index;
					while (elementToAdd = elementsToAdd.pop()) {
						elementToAdd = this.createChild(elementToAdd, baseIndex);
						element.insertBefore(elementToAdd, nextSibling);
						baseIndex++;
					}
					this.refreshIndices();
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
						child = this.createChild(child, index);
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