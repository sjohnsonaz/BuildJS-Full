/**
 * @class build.ui.Switcher
 * @extends build.ui.Container
 */
Build('build.ui.Switcher', [ 'build::build.ui.Container', 'build::build.utility.Navigation' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property lockable
		 * @property active
		 * @property hiddenSoft
		 */
		$constructor : function Switcher(active) {
			$super(this)();
			this.lockable = false;
			var Navigation = build.utility.Navigation();
			this.watchValue('hiddenSoft', true, null, function(value, cancel) {
				this.refreshChildren();
				return value;
			}.bind(this));
			this.watchValue('active', 0, null, function(value, cancel) {
				// TODO: Locking may prevent manipulating children.
				var output = (this.lockable && Navigation.locked) ? (Navigation.run() ? value : cancel) : value;
				if (output != cancel && value !== this.active) {
					// Correct for index out of range.
					if (this.children.length) {
						output %= this.children.length;
					}
					this.showChild(output, this.active || 0);
				}
				return output;
			}.bind(this));
			this.watchValue('activeChild', undefined, function(value) {
				return this.children[this.active];
			}.bind(this), function(value, cancel) {
				if (!value) {
					return cancel;
				} else {
					var index = this.children.indexOf(value);
					return index != -1 ? index : cancel;
				}
			}.bind(this));
		},
		$prototype : {
			/**
			 * @method showChild
			 * @param index
			 * @param oldIndex
			 */
			showChild : function(index, oldIndex) {
				var child = this.children[index];
				var oldChild = oldIndex !== index ? this.children[oldIndex] : undefined;
				if (oldChild) {
					this.toggleChildElement(oldChild.element, false);
				}
				if (child) {
					this.toggleChildElement(child.element, true);
				}
			},
			/**
			 * @method toggleChildElement
			 */
			toggleChildElement : function(element, toggle) {
				if (toggle) {
					element.classList.remove(!this.hiddenSoft ? 'hidden' : 'hidden-soft');
				} else {
					element.classList.add(!this.hiddenSoft ? 'hidden' : 'hidden-soft');
				}
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function() {
				$super().refreshChildren(this)();
				var hiddenClass = !this.hiddenSoft ? 'hidden' : 'hidden-soft';
				var element = this.innerElement;
				if (element) {
					for (var index = 0, length = this.children.length; index < length; index++) {
						var child = this.children[index];
						child.element.classList.add(hiddenClass);
					}
					var activeChild = this.children[this.active];
					if (activeChild && activeChild.element) {
						activeChild.element.classList.remove(hiddenClass);
					}
				}
			},
			/**
			 * @method createChildrenHandler
			 * We attempt to keep the active child active.
			 * If active child is removed, do not change active.
			 * If there are no children, active = 0.
			 */
			createChildrenHandler : function() {
				return {
					push : function(child) {
						var element = this.innerElement;
						if (element) {
							child = this.createChild(child);
							element.appendChild(child);
						}
						if (this.children.length == 1) {
							this.toggleChildElement(child, true);
						} else {
							this.toggleChildElement(child, false);
						}
					}.bind(this),
					pop : function() {
						var element = this.innerElement;
						if (element) {
							if (element.lastChild) {
								this.destroyChild(element.lastChild);
								element.removeChild(element.lastChild);
							}
						}
					}.bind(this),
					unshift : function(child) {
						// Add to beginning of array
						var element = this.innerElement;
						if (element) {
							child = this.createChild(child);
							element.insertBefore(child, element.firstChild);
						}
						if (this.children.length == 1) {
							this.toggleChildElement(child, true);
						} else {
							this.toggleChildElement(child, false);
						}
					}.bind(this),
					shift : function() {
						// Remove from beginning of array
						var element = this.innerElement;
						if (element) {
							if (element.firstChild) {
								this.destroyChild(element.firstChild);
								element.removeChild(element.firstChild);
							}
						}
					}.bind(this),
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
					}.bind(this),
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