/**
 * @class build.widget.calendar.DateInput
 * @extends build.ui.Widget
 */
Build('build.widget.calendar.DateInput', [ 'build::build.ui.Widget', 'build::build.form.input.Text', 'build::build.form.input.Button', 'build::build.widget.calendar.Calendar' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function DateInput() {
			$super(this)();
			this.input = build.form.input.Text.create();
			this.input.mask = '99/99/9999';
			this.button = build.form.input.Button.create('{i:[calendar]}');
			this.popup = build.ui.Widget.create();
			this.calendar = build.widget.calendar.Calendar.create();
			this.popup.element.appendChild(this.calendar.element);
			this.element.appendChild(this.input.element);
			this.element.appendChild(this.button.element);
			this.element.appendChild(this.popup.element);
			this.popup.element.style.display = 'none';

			this.watchValue('open', false, undefined, function(value, cancel) {
				if (value) {
					this.popup.element.style.display = 'block';
				} else {
					this.popup.element.style.display = 'none';
				}
				return !!value;
			}.bind(this));

			this.button.addEvent('click', function() {
				this.open = !this.open;
			}.bind(this));
			this.calendar.subscribe('selectedDay', function(value) {
				if (value) {
					this.input.value = getDateFormatted(value);
				}
			}.bind(this));
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