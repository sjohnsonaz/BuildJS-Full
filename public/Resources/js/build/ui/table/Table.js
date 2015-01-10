/**
 * @class build.ui.table.Table
 * @extends build.ui.Container
 */
Build('build.ui.table.Table', [ 'build.ui.Container', 'build.ui.table.TableHeader', 'build.ui.table.TableBody', 'build.ui.table.TableFooter' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Table() {
			$super(this)();
			this.header = build.ui.table.TableHeader.create();
			this.body = build.ui.table.TableBody.create();
			this.footer = build.ui.table.TableFooter.create();
			this.children.push(this.header);
			this.children.push(this.body);
			this.children.push(this.footer);
		},
		$prototype : {
			type : 'table'
		}
	});
});