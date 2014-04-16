/**
 * @class build.ui.tab.TabContainer
 * @extends build.ui.SwitcherPanel
 */
Build('build.ui.tab.TabContainer', [ 'build::build.ui.SwitcherPanel' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		/**
		 * @constructor
		 */
		$constructor : function TabContainer() {
			$super(this)();
			var self = this;
			/**
			 * @method openTab
			 * @param tab
			 */
			this.openTab = function(tab) {
				var children = self.children;
				for (var index = 0, length = children.length; index < length; index++) {
					if (tab === children[index]) {
						self.openTabIndex(index);
						break;
					}
				}
			};
			/**
			 * @method openTabIndex
			 * @param index
			 */
			this.openTabIndex = function(index) {
				self.active = index;
			};
		},
		$prototype : {
			/**
			 * @method init
			 */
			init : function() {
				$super().init(this)();
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function() {
				$super().refreshChildren(this)();
				if (this.element) {
					var ul = document.createElement('ul');
					this.children.forEach(function(child, index, children) {
						var li = document.createElement('li');
						var a = document.createElement('a');
						li.appendChild(a);
						ul.appendChild(li);
						child.subscribe('title', function(value) {
							a.innerHTML = value;
						});
						this.subscribe('active', function(value) {
							if (index == value) {
								li.className = 'tab-active';
							} else {
								li.className = '';
							}
						});
						// li.dataset.bind = "css: { 'tab-active':
						// $parent.active() == $index() }, attr: { 'data-index'
						// : $index, 'data-parent' : $parent.active }";
						a.addEventListener('click', function() {
							this.openTab(child);
						}.bind(this));
					}.bind(this));
					this.element.insertBefore(ul, this.element.firstChild);
				}
			}
		}
	});
});