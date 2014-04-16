/**
 * @class build.widget.editor.CKEditor
 * @extends build.ui.Widget
 */
Build('build.widget.editor.CKEditor', [ 'build::build.ui.Widget' ], function(define, $super, helper) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 * @param name
		 */
		/**
		 * @property textArea
		 * @property value
		 */
		$constructor : function CKEditor(name) {
			this.textArea = document.createElement('textarea');
			this.textArea.name = name;
			Object.defineProperty(this, 'value', {
				get : function() {
					if (this.editor) {
						return this.editor.getData();
					} else {
						return this.textArea.value;
					}
				},
				set : function(value) {
					if (this.editor) {
						this.editor.setData(value);
						this.publish('value');
					} else {
						this.textArea.value = value;
					}
				}
			});
		},
		$prototype : {
			/**
			 * 
			 */
			init : function(name) {
				$super().init(this)();
				this.element.appendChild(this.textArea);
				this.replace();
			},
			/**
			 * 
			 */
			replace : function() {
				this.editor = CKEDITOR.replace(this.textArea);
			}
		}
	});
});