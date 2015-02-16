/**
 * @class build.ui.Switcher
 * @extends build.ui.Container
 */
Build('build.ui.Switcher', [ 'build::build.ui.Container', 'build::build.ui.SwitcherChildrenHandler', 'build::build.utility.Navigation' ], function($define, $super) {
	$define({
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
			this.watchValue('hiddenSoft', true, null, function(value, current, cancel) {
				this.refreshChildren();
				return value;
			}.bind(this));
			this.watchValue('active', 0, null, function(value, current, cancel) {
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
			}.bind(this), function(value, current, cancel) {
				if (!value) {
					return cancel;
				} else {
					var index = this.children.indexOf(value);
					return index != -1 ? index : cancel;
				}
			}.bind(this));
			this.activeChildrenSubscriber = function() {
				// Ensure active is correct.
			}
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
			refreshChildren : function(children) {
				$super().refreshChildren(this)(children);
				var hiddenClass = !this.hiddenSoft ? 'hidden' : 'hidden-soft';
				var element = this.innerElement;
				if (element) {
					children = children || this.children;
					for (var index = 0, length = children.length; index < length; index++) {
						var child = children[index];
						child.element.classList.add(hiddenClass);
					}
					var activeChild = children[this.active];
					if (activeChild && activeChild.element) {
						activeChild.element.classList.remove(hiddenClass);
					}
				}
			},
			subscribeChildren : function(children, childrenHandler) {
				$super().subscribeChildren(this)(children, childrenHandler);
				children.subscribe(this.activeChildrenSubscriber);
			},
			unsubscribeChildren : function(children, childrenHandler) {
				$super().unsubscribeChildren(this)(children, childrenHandler);
				children.unsubscribe(this.activeChildrenSubscriber);
			},
			/**
			 * @method createChildrenHandler
			 * We attempt to keep the active child active.
			 * If active child is removed, do not change active.
			 * If there are no children, active = 0.
			 */
			createChildrenHandler : function() {
				return new build.ui.SwitcherChildrenHandler(this.innerElement, this);
			}
		}
	});
});