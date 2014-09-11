/**
 * @class build.ui.tab.TabHeader
 * @extends build.ui.Container
 */
Build('build.ui.tab.TabHeader', [ 'build::build.ui.Container', 'build::build.binding.PropertyBinding', 'build::build.binding.EventBinding', 'build::build.binding.ClassNameBinding', 'build::build.ui.element.List', 'build::build.ui.tab.TabTitle' ],
		function(define, $super) {
			define({
				$extends : 'build.ui.Container',
				/**
				 * @constructor
				 */
				$constructor : function TabHeader() {
					$super(this)();
				},
				$prototype : {
					type : 'ul',
					createChild : function(child) {
						var title = build.ui.tab.TabTitle.create();
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
					}
				}
			});
		});