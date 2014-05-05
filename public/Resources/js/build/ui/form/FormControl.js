/**
 * @class build.ui.form.FormControl
 * @extends build.ui.form.FormElement
 */
Build('build.ui.form.FormControl', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 * @property directAppend
		 * @property label
		 * @property control
		 * @property labelIterator
		 * @property controlIterator
		 */
		$constructor : function FormControl(label, control) {
			$super(this)();
			this.type = 'div';
			this.directAppend = true;
			this.watchValue('label', label, null, function(value) {
				this.children.set(0, value);
			}.bind(this));
			this.watchValue('control', control, null, function(value) {
				this.children.set(1, value);
			}.bind(this));
			this.labelIterator = document.createElement('div');
			this.labelIterator.className = 'form-control-iterator-label';
			this.controlIterator = document.createElement('div');
			this.controlIterator.className = 'form-control-iterator-control';
		},
		$prototype : {
			/**
			 * @method init
			 * @param label
			 * @param control
			 */
			init : function(label, control) {
				$super().init(this)();
				this.label = label;
				this.control = control;
				if (label) {
					label.control = control;
				}
				this.element.appendChild(this.labelIterator);
				this.element.appendChild(this.controlIterator);
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function() {
				var element = this.element;
				if (element) {
					this.clearChildren(this.controlIterator);
					this.clearChildren(this.labelIterator);
					if (this.control) {
						this.controlIterator.appendChild(this.control.element);
					}
					if (this.label) {
						this.labelIterator.appendChild(this.label.element);
						this.label.control = this.control;
					}
				}
			}
		}
	});
});