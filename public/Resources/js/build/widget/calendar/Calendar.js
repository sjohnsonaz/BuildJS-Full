/**
 * @class build.widget.calendar.Calendar
 * @extends build.ui.Widget
 */
Build('build.widget.calendar.Calendar', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Calendar(date) {
			$super(this)();
			date = date || new Date();
			this.table = document.createElement('table');
			this.table.appendChild(this.renderHeader());
			this.tableBody = document.createElement('tbody');
			this.table.appendChild(this.tableBody);
			var firstRender = true;
			// TODO: Use BindingHandler.
			this.watchValue('month', date.getMonth(), undefined, function(value, cancel) {
				if (!firstRender) {
					this.renderMonth(this.year, this.month);
				}
				return value;
			}.bind(this));
			this.watchValue('year', date.getFullYear(), undefined, function(value, cancel) {
				if (!firstRender) {
					this.renderMonth(this.year, this.month);
				}
				return value;
			}.bind(this));
			this.renderMonth(this.year, this.month);
			firstRender = false;
			this.element.appendChild(this.table);
		},
		$prototype : {
			getMonth : function(year, month) {
				var firstDay = new Date(year, month, 1);
				var lastDay = new Date(year, month + 1, 0);
				var days = [ firstDay ];
				for (var index = 2, length = lastDay.getDate(); index < length; index++) {
					days.push(new Date(year, month, index));
				}
				days.push(lastDay);
				return days;
			},
			renderHeader : function() {
				var header = document.createElement('thead');
				var headerRow = document.createElement('tr');
				var days = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
				for (var index = 0, length = days.length; index < length; index++) {
					var day = document.createElement('th');
					day.innerText = days[index];
					headerRow.appendChild(day);
				}
				header.appendChild(headerRow);
				return header;
			},
			renderMonth : function(year, month) {
				var days = this.getMonth(year, month);
				while (this.tableBody.firstChild) {
					this.tableBody.removeChild(this.tableBody.firstChild);
				}
				var dayOfWeek = 0;
				var tr;
				var startDayOfWeek = days[0].getDay();
				if (startDayOfWeek != 0) {
					tr = document.createElement('tr');
					this.tableBody.appendChild(tr);
					for (var index = 0; index < startDayOfWeek; index++) {
						tr.appendChild(document.createElement('td'));
					}
				}
				for (var index = 0, length = days.length; index < length; index++) {
					var day = days[index];
					if (day.getDay() == 0) {
						tr = document.createElement('tr');
						this.tableBody.appendChild(tr);
					}
					var dayCell = document.createElement('td');
					dayCell.innerText = day.getDate();
					tr.appendChild(dayCell);
				}
			}
		}
	});
});