/**
 * @class build.widget.tab.TabHeader
 * @extends build.ui.Container
 */
Build('build.widget.tab.TabHeader', [ 'build::build.ui.Container', 'build::build.binding.OneWayBinding', 'build::build.binding.EventBinding', 'build::build.binding.ClassNameBinding', 'build::build.widget.tab.TabTitle' ], function($define, $super) {
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
					title.bind([ {
						handler : 'oneWay',
						property : 'title',
						sources : [ {
							source : child,
							property : 'title'
						}, ]
					}, {
						handler : 'event',
						source : child,
						sourceProperty : 'openTab',
						type : 'click'
					}, {
						handler : 'className',
						format : function() {
							return child.parent.children[child.parent.active] == child;
						},
						sources : [ {
							source : child.parent,
							property : 'active'
						} ],
						className : 'tab-active'
					} ]);
					return title.element;
				},
				destroy : function(child, element) {

				}
			}
		}
	});
});