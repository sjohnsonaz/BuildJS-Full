/**
 * @class build.ui.Container
 * @extends build.ui.Widget
 */
Build('build.ui.Container', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Container() {
			$super(this)();
			this.children = build.utility.ObservableArray();
			this.children.subscribe(function() {
				this.refreshChildren();
			}.bind(this));
			this.watchValue('directAppend', false);
			this.watchValue('iteratorType', 'div');
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				// this.refreshChildren();
				this.subscribe('directAppend', function(value) {
					this.refreshChildren();
				}.bind(this));
				this.subscribe('iteratorType', function(value) {
					this.refreshChildren();
				}.bind(this));
			},
			/**
			 * @method clearChildren
			 */
			clearChildren : function(element) {
				element = element || this.element;
				if (element) {
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
				}
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function() {
				var element = this.element;
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
					if (this.directAppend) {
						this.element.appendChild(child.element || child);
					} else {
						var iterator = document.createElement(this.iteratorType || 'div');
						iterator.appendChild(child.element || child);
						iterator.className = 'panel-iterator';
						this.element.appendChild(iterator);
					}
				}
			},
			/**
			 * @method addChild
			 */
			addChild : function(child) {
				this.children.push(child);
			},
			/**
			 * @method removeChild
			 */
			removeChild : function(child) {
				var index = this.children.indexOf(child);
				if (index != -1) {
					this.children.splice(index, 1);
				}
			}
		}
	});
});