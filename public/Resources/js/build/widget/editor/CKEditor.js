Build('build.widget.editor.CKEditor', [ 'build::build.ui.Widget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
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
			init : function(name) {
				$super().init(this)();
				this.element.appendChild(this.textArea);
			},
			replace : function() {
				this.editor = CKEDITOR.replace(this.textArea);
			}
		}
	});
});