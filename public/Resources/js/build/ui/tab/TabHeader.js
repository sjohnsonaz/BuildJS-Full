/**
 * @class build.ui.tab.TabHeader
 * @extends build.ui.Container
 */
Build('build.ui.tab.TabHeader', [ 'build::build.ui.Container', 'build::build.binding.TextBinding', 'build::build.binding.EventBinding', 'build::build.binding.ClassNameBinding', 'build::build.ui.element.List', 'build::build.ui.element.Link' ],
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
						var li = build.ui.element.List.create();
						var a = build.ui.element.Link.create();
						li.addChild(a);
						build.binding.TextBinding.create(a, {
							sources : [ {
								source : child,
								property : 'title'
							}, ]
						});
						build.binding.EventBinding.create(a, child, 'click', 'openTab');
						build.binding.ClassNameBinding.create(li, {
							sources : [ {
								source : this.parent,
								property : 'active'
							} ],
							className : 'tab-active'
						});
						return li.element;
					}
				}
			});
		});