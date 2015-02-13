/**
 * @class build.widget.calendar.Calendar
 * @extends build.ui.Widget
 */
Build('build.widget.calendar.Calendar', [ 'build::build.ui.Widget', 'build::build.binding.ComputedBinding' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Calendar(date) {
			$super(this)();
			date = date || new Date();

			this.title = document.createElement('div');
			this.monthTitle = document.createElement('div');
			this.yearTitle = document.createElement('div');
			this.monthDown = document.createElement('button');
			this.monthName = document.createElement('span');
			this.monthUp = document.createElement('button');
			this.yearDown = document.createElement('button');
			this.yearName = document.createElement('span');
			this.yearUp = document.createElement('button');
			this.monthTitle.appendChild(this.monthDown);
			this.monthTitle.appendChild(this.monthName);
			this.monthTitle.appendChild(this.monthUp);
			this.yearTitle.appendChild(this.yearDown);
			this.yearTitle.appendChild(this.yearName);
			this.yearTitle.appendChild(this.yearUp);
			this.title.appendChild(this.monthTitle);
			this.title.appendChild(this.yearTitle);

			this.table = document.createElement('table');
			this.table.appendChild(this.renderHeader());
			this.tableBody = document.createElement('tbody');
			this.table.appendChild(this.tableBody);

			this.watchValue('month', date.getMonth());
			this.watchValue('year', date.getFullYear());
			this.watchValue('days');
			build.binding.ComputedBinding.create(this, {
				sources : [ {
					source : this,
					property : 'year'
				}, {
					source : this,
					property : 'month'
				} ],
				output : function(year, month) {
					return this.renderMonth(year, month);
					// TODO: Select a day
				}.bind(this),
				destination : 'days'
			});
			this.watchValue('selectedDay');

			this.monthUp.addEventListener('click', function(event) {
				this.month = (this.month + 1) % 12;
			}.bind(this));
			this.monthDown.addEventListener('click', function(event) {
				this.month = (this.month + 11) % 12;
			}.bind(this));
			this.yearUp.addEventListener('click', function(event) {
				this.year++;
			}.bind(this));
			this.yearDown.addEventListener('click', function(event) {
				this.year--;
			}.bind(this));

			this.element.appendChild(this.title);
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
				var self = this;
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
					(function() {
						var dayCell = document.createElement('td');
						var dayInstance = day;
						dayCell.addEventListener('click', function(event) {
							self.selectedDay = dayInstance;
						});
						dayCell.innerText = dayInstance.getDate();
						tr.appendChild(dayCell);
					})();
				}
				this.monthName.innerText = days[0].toLocaleString('en-US', {
					month : 'long'
				});
				this.yearName.innerText = days[0].toLocaleString('en-US', {
					year : 'numeric'
				});
				return days;
			}
		}
	});
});