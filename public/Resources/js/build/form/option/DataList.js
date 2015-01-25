/**
 * @class build.form.option.DataList
 * @extends build.ui.Container
 */
Build('build.form.option.DataList', [ 'build::build.ui.Container', 'build::build.form.option.Option' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function DataList() {
			$super(this)();
		},
		$prototype : {
			type : 'datalist',
			addOption : function(value, text, selected) {
				var option = build.form.option.Option.create(text);
				option.value = value;
				option.selected = !!selected;
				this.addChild(option);
			},
			removeOption : function(value) {
				var children = this.children;
				var match = null;
				for (var index = 0, length = children.length; index < length; index++) {
					var child = children[index];
					if (child.value == value) {
						match = child;
						break;
					}
				}
				if (match) {
					this.removeChild(match);
				}
			}
		}
	});
});