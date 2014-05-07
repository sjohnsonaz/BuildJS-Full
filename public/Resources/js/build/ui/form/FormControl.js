/**
 * @class build.ui.form.FormControl
 * @extends build.ui.Widget
 */
Build('build.ui.form.FormControl', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
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
			this.labelIterator = document.createElement('div');
			this.labelIterator.className = 'form-control-iterator-label';
			this.controlIterator = document.createElement('div');
			this.controlIterator.className = 'form-control-iterator-control';
			this.watchValue('label', label, null, function(value) {
				var element = this.labelIterator;
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				if (value) {
					element.appendChild(value.element);
				}
			}.bind(this));
			this.watchValue('control', control, null, function(value) {
				var element = this.controlIterator;
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				if (value) {
					element.appendChild(value.element);
				}
			}.bind(this));
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
			}
		}
	});
});