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
			//this.children.subscribe(function() {
			//this.refreshChildren();
			//}.bind(this));
			this.children.subscribe({
				push : function(child) {
					this.refreshChildren();
					//var element = this.element;
					//if (element) {
					//this.childIterator.bind(this)(child);
					//}
				}.bind(this),
				pop : function() {
					this.refreshChildren();
					//var element = this.element;
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
			});
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
			},
			destroy : function() {
				$super().destroy(this)();
				var element = element || this.element;
				if (element) {
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
				}
				for (var index = 0, length = this.children.length; index < length; index++) {
					this.children[index].destroy();
				}
				this.children.length = 0;
			}
		}
	});
});