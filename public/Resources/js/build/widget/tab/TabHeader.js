/**
 * @class build.widget.tab.TabHeader
 * @extends build.ui.Container
 */
Build('build.widget.tab.TabHeader', [ 'build::build.ui.Container', 'build::build.binding.PropertyBinding', 'build::build.binding.EventBinding', 'build::build.binding.ClassNameBinding', 'build::build.widget.tab.TabTitle' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TabHeader() {
			$super(this)();
		},
		$prototype : {
			type : 'ul',
			template : {
				create : function(child) {
					var title = build.widget.tab.TabTitle.create();
					build.binding.PropertyBinding.create({
						destination : title,
						sources : [ {
							source : child,
							property : 'title'
						}, ],
						property : 'title'
					});
					build.binding.EventBinding.create({
						destination : title,
						source : child,
						sourceProperty : 'openTab',
						type : 'click'
					});
					build.binding.ClassNameBinding.create({
						destination : title,
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
				destroy : function(child, element) {

				}
			}
		}
	});
});