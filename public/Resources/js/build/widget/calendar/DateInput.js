/**
 * @class build.widget.calendar.DateInput
 * @extends build.ui.Widget
 */
Build('build.widget.calendar.DateInput', [ 'build::build.ui.Widget', 'build::build.form.input.Text', 'build::build.form.input.Button', 'build::build.widget.calendar.Calendar', 'build::build.binding.ValueBinding' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function DateInput() {
			$super(this)();
			var inputControl = document.createElement('span');
			inputControl.className = 'input-date-control';
			this.popup = document.createElement('span');
			this.popup.className = 'input-date-popup';
			this.input = build.form.input.Text.create();
			//this.input.mask = '99/99/9999';
			this.button = build.form.input.Button.create('{i:[calendar]}');
			this.calendar = build.widget.calendar.Calendar.create();
			this.popup.appendChild(this.calendar.element);
			inputControl.appendChild(this.input.element);
			inputControl.appendChild(this.button.element);
			this.element.appendChild(inputControl);
			this.element.appendChild(this.popup);
			this.popup.style.display = 'none';
			this.watchClass('inline', 'input-date-inline', false);

			this.watchValue('open', false, undefined, function(value, cancel) {
				if (value) {
					this.popup.style.display = 'block';
				} else {
					this.popup.style.display = 'none';
				}
				return !!value;
			}.bind(this));

			this.button.addEvent('click', function() {
				this.open = !this.open;
			}.bind(this));
			build.binding.ValueBinding.create(this.input, this.calendar, 'selectedDayText');
		},
		$prototype : {
			type : 'span'
		}
	});
	function getDateFormatted(date) {
		var dd = date.getDate();
		var mm = date.getMonth() + 1; //January is 0!

		var yyyy = date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm
		}
		return mm + '/' + dd + '/' + yyyy;
	}

});