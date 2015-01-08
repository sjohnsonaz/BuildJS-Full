/**
 * @class build.widget.tab.TabHeader
 * @extends build.ui.Container
 */
Build('build.widget.tab.TabHeader', [ 'build::build.ui.Container', 'build::build.binding.PropertyBinding', 'build::build.binding.EventBinding', 'build::build.binding.ClassNameBinding', 'build::build.ui.element.List',
		'build::build.widget.tab.TabTitle' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TabHeader() {
			$super(this)();
			this.template = this.tabTemplate;
		},
		$prototype : {
			type : 'ul',
			// TODO: Manage this correctly.
			tabTemplate : (function() {
				return {
					create : function(child) {
						var title = build.widget.tab.TabTitle.create();
						build.binding.PropertyBinding.create(title, {
							sources : [ {
								source : child,
								property : 'title'
							}, ],
							property : 'title'
						});
						build.binding.EventBinding.create(title, child, 'openTab', 'click');
						build.binding.ClassNameBinding.create(title, {
							format : function() {
								return child.parent.children[child.parent.active] == child;
							},
							sources : [ {
								source : child.parent,
								property : 'active'
							} ],
							className : 'tab-active'
						});
						return title.element;
					},
					destroy : function() {

					}
				};
			})()
		}
	});
});