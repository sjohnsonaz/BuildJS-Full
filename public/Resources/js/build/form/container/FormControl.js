/**
 * @class build.form.container.FormControl
 * @extends build.ui.Widget
 */
Build('build.form.container.FormControl', [ 'build::build.ui.Widget', 'build::build.binding.OneWayBinding' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 * @property label
		 * @property control
		 * @property labelIterator
		 * @property controlIterator
		 */
		$constructor : function FormControl(label, control) {
			$super(this)();
			var self = this;
			this.labelIterator = document.createElement('div');
			this.labelIterator.className = 'form-control-iterator-label';
			this.controlIterator = document.createElement('div');
			this.controlIterator.className = 'form-control-iterator-control';
			this.watchValue('label', label, null, function(value) {
				var element = self.labelIterator;
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				if (value) {
					element.appendChild(value.element);
				}
				return value;
			});
			this.watchValue('control', control, null, function(value) {
				var element = self.controlIterator;
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				if (value) {
					element.appendChild(value.element);
				}
				return value;
			});
			this.bind([ {
				handler : 'oneWay',
				sources : [ {
					source : this,
					property : 'label'
				}, {
					source : this,
					property : 'control'
				}, ],
				output : function(label, control) {
					if (label) {
						label.control = control;
					}
				}
			} ]);
			this.element.appendChild(this.labelIterator);
			this.element.appendChild(this.controlIterator);
		},
		$prototype : {
			type : 'div'
		}
	});
});