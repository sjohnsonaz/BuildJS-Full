/**
 * @class build.container.table.Table
 * @extends build.ui.Container
 */
Build('build.container.table.Table', [ 'build.ui.Container', 'build.container.table.TableHeader', 'build.container.table.TableBody', 'build.container.table.TableFooter' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Table() {
			$super(this)();
			this.header = build.container.table.TableHeader.create();
			this.body = build.container.table.TableBody.create();
			this.footer = build.container.table.TableFooter.create();
			this.children.push(this.header);
			this.children.push(this.body);
			this.children.push(this.footer);
		},
		$prototype : {
			type : 'table'
		}
	});
});