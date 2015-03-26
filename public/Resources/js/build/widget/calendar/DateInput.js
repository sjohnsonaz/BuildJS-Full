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
			var self = this;
			var inputControl = document.createElement('span');
			inputControl.className = 'input-date-control';
			this.popup = document.createElement('span');
			this.popup.className = 'input-date-popup';
			this.input = build.form.input.Text.create();
			this.input.mask = '99/99/9999';
			this.input.maskValidRequired = true;
			this.button = build.form.input.Button.create('{i:[calendar]}');
			this.calendar = build.widget.calendar.Calendar.create();
			this.popup.appendChild(this.calendar.element);
			inputControl.appendChild(this.input.element);
			inputControl.appendChild(this.button.element);
			this.element.appendChild(inputControl);
			this.element.appendChild(this.popup);
			this.popup.style.display = 'none';
			this.watchClass('inline', 'input-date-inline', false);

			this.watchValue('open', false, undefined, function(value, current, cancel) {
				if (value) {
					self.popup.style.display = 'block';
				} else {
					self.popup.style.display = 'none';
				}
				return !!value;
			});

			this.button.addEventListener('click', function() {
				self.open = !self.open;
			});
			this.bind({
				input : [ {
					handler : 'value',
					source : this.calendar,
					sourceProperty : 'selectedDayText'
				} ]
			});
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