/**
 * @class build.ui.Switcher
 * @extends build.ui.Container
 */
Build('build.ui.Switcher', [ 'build::build.ui.Container', 'build::build.ui.SwitcherChildrenHandler', 'build::build.utility.Navigation', 'build::build.binding.TwoWayBinding' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property lockable
		 * @property active
		 */
		$constructor : function Switcher(active) {
			this.activeChildrenSubscriber = function() {
				/*
				 * Ensure active is correct.
				 * We attempt to keep the active child active.
				 * If active child is removed, do not change active.
				 * If there are no children, active = 0.
				 */
				if (this.active == -1) {
					this.active = 0;
				}
			}.bind(this);
			$super(this)();
			this.lockable = false;
			var Navigation = build.utility.Navigation();
			this.watchValue('active', -1, undefined, function(value, current, cancel) {
				value = value || 0;
				var length = this.children.length;
				return length ? ((value % length) + length) % length : value;
			}.bind(this));
			this.watchValue('activeChild', undefined, undefined, function(value, current, cancel) {
				// TODO: Locking may prevent manipulating children.
				var output = (this.lockable && Navigation.locked) ? (Navigation.run() ? value : cancel) : value;
				if (output != cancel) {
					output = this.children.indexOf(value) != -1 ? value : cancel;
					if (output != cancel) {
						this.showChild(output, current);
					}
				}
				return output;
			}.bind(this));
			build.binding.TwoWayBinding.create(this, this, 'active', 'activeChild', function(value) {
				// To active
				return this.children.indexOf(value);
			}.bind(this), function(value) {
				// To activeChild
				return this.children[value];
			}.bind(this));
		},
		$prototype : {
			/**
			 * @method showChild
			 * @param index
			 * @param oldIndex
			 */
			showChild : function(child, current) {
				if (current) {
					this.toggleChildElement(current.element, false);
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
					element.classList.remove('hidden-soft');
				} else {
					element.classList.add('hidden-soft');
				}
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function(children) {
				$super().refreshChildren(this)(children);
				var element = this.innerElement;
				if (element) {
					children = children || this.children;
					for (var index = 0, length = children.length; index < length; index++) {
						var child = children[index];
						this.toggleChildElement(child.element, false);
					}
					var activeChild = children[this.active];
					if (activeChild && activeChild.element) {
						this.toggleChildElement(activeChild.element, true);
					}
				}
			},
			createChild : function(child) {
				child = $super().createChild(this)(child);
				return this.initializeChild(child);
			},
			destroyChild : function(child) {
				$super().removeChild(this)(child);
				return this.cleanupChild(child);
			},
			initializeChild : function(child) {
				if (child instanceof HTMLElement) {
					child.classList.add('hidden-soft');
				}
				return child;
			},
			cleanupChild : function(child) {
				if (child instanceof HTMLElement) {
					child.classList.remove('hidden-soft');
				}
				return child;
			},
			subscribeChildren : function(children, childrenHandler) {
				$super().subscribeChildren(this)(children, childrenHandler);
				children.subscribe(this.activeChildrenSubscriber);
			},
			unsubscribeChildren : function(children, childrenHandler) {
				$super().unsubscribeChildren(this)(children, childrenHandler);
				children.unsubscribe(this.activeChildrenSubscriber);
			}
		}
	});
});