/**
 * @class build.widget.tab.TabContainer
 * @extends build.ui.Switcher
 */
Build('build.widget.tab.TabContainer', [ 'build::build.ui.Switcher', 'build::build.widget.tab.TabHeader' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Switcher',
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
			this.tabHeader = build.widget.tab.TabHeader.create();
			build.binding.ForEachBinding.create(this.tabHeader, this, 'children');
			this.element.appendChild(this.tabHeader.element);
			this.innerElement = document.createElement('div');
			this.innerElement.className = 'tab-body';
			this.element.appendChild(this.innerElement);
		},
		$prototype : {}
	});
});