/**
 * @class build.widget.calendar.Calendar
 * @extends build.ui.Widget
 */
Build('build.widget.calendar.Calendar', [ 'build::build.ui.Widget', 'build::build.binding.OneWayBinding', 'build::build.binding.TwoWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Calendar(date) {
			$super(this)();
			var self = this;
			var initialDate = date || new Date();

			this.monthName = document.createElement('span');
			this.monthName.className = 'calendar-month-name';
			this.yearName = document.createElement('span');
			this.yearName.className = 'calendar-year-name';
			var title = this.renderTitle(this.yearName, this.monthName);

			this.table = document.createElement('table');
			this.table.appendChild(this.renderHeader());
			this.tableBody = document.createElement('tbody');
			this.table.appendChild(this.tableBody);

			this.watchValue('month', initialDate.getMonth());
			this.watchValue('year', initialDate.getFullYear());
			this.dayHash = {};
			this.watchValue('days', undefined, undefined, function(value, current, cancel) {
				self.dayHash = {};
				if (value) {
					for (var index = 0, length = value.length; index < length; index++) {
						self.dayHash[getDateFormatted(value[index])] = value[index];
					}
				}
				return value;
			});
			this.daysComputed = build.binding.OneWayBinding.create({
				destination : this,
				property : 'days',
				sources : [ {
					source : this,
					property : 'year'
				}, {
					source : this,
					property : 'month'
				} ],
				output : function(year, month) {
					return self.renderMonth(year, month);
				},
			});
			this.watchValue('selectedDay', date);
			this.watchValue('selectedDayText');
			this.bind([ {
				handler : 'twoWay',
				source : this,
				sourceProperty : 'selectedDay',
				destinationProperty : 'selectedDayText',
				outputToSource : function(value) {
					if (value) {
						var tempDate = new Date(value);
						var formattedValue = getDateFormatted(tempDate);
						return self.dayHash[formattedValue] || new Date(formattedValue);
					}
				},
				outputToDestination : function(value) {
					if (value) {
						return getDateFormatted(value);
					}
				}
			} ]);

			var oldSelectedDay = undefined;
			this.subscribe('selectedDay', function(value) {
				if (value && (self.month != value.getMonth() || self.year != value.getFullYear())) {
					self.refresh();
				}
				if (oldSelectedDay && oldSelectedDay.dayCell) {
					oldSelectedDay.dayCell.className = '';
				}
				if (value && value.dayCell) {
					value.dayCell.className = 'calendar-day-selected';
				}
				oldSelectedDay = value;
			});

			this.element.appendChild(title);
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
			renderHeader : function(month) {
				var header = document.createElement('thead');
				var headerRow = document.createElement('tr');
				var days = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
				for (var index = 0, length = days.length; index < length; index++) {
					var day = document.createElement('th');
					day.textContent = days[index];
					headerRow.appendChild(day);
				}
				header.appendChild(headerRow);
				return header;
			},
			renderTitle : function(yearName, monthName) {
				var self = this;
				var title = document.createElement('div');
				title.className = 'calendar-title';

				var monthTitle = document.createElement('div');
				monthTitle.className = 'calendar-month-title';
				var yearTitle = document.createElement('div');
				yearTitle.className = 'calendar-year-title';
				var monthDown = document.createElement('button');
				monthDown.className = 'calendar-month-down';
				monthDown.innerHTML = this.formatString('{i:[caret-left]}')
				var monthUp = document.createElement('button');
				monthUp.className = 'calendar-month-up';
				monthUp.innerHTML = this.formatString('{i:[caret-right]}')
				var yearDown = document.createElement('button');
				yearDown.className = 'calendar-year-down';
				yearDown.innerHTML = this.formatString('{i:[caret-left]}')
				var yearUp = document.createElement('button');
				yearUp.className = 'calendar-year-up';
				yearUp.innerHTML = this.formatString('{i:[caret-right]}')

				monthUp.addEventListener('click', function(event) {
					self.month = (self.month + 1) % 12;
				});
				monthDown.addEventListener('click', function(event) {
					self.month = (self.month + 11) % 12;
				});
				yearUp.addEventListener('click', function(event) {
					self.year++;
				});
				yearDown.addEventListener('click', function(event) {
					self.year--;
				});

				monthTitle.appendChild(monthDown);
				monthTitle.appendChild(monthName);
				monthTitle.appendChild(monthUp);
				yearTitle.appendChild(yearDown);
				yearTitle.appendChild(yearName);
				yearTitle.appendChild(yearUp);
				title.appendChild(monthTitle);
				title.appendChild(yearTitle);
				return title;
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
				var selectedDay = this.selectedDay;
				for (var index = 0, length = days.length; index < length; index++) {
					var day = days[index];
					var selected = false;
					if (selectedDay && day.getTime() === selectedDay.getTime()) {
						day = selectedDay;
						selected = true;
					}
					if (day.getDay() == 0) {
						tr = document.createElement('tr');
						this.tableBody.appendChild(tr);
					}
					(function() {
						var dayCell = document.createElement('td');
						if (selected) {
							dayCell.className = 'calendar-day-selected';
						}
						var dayInstance = day;
						dayInstance.dayCell = dayCell;
						var dayLink = document.createElement('a');
						dayLink.addEventListener('click', function(event) {
							event.preventDefault();
							self.selectedDay = dayInstance;
						});
						dayLink.textContent = dayInstance.getDate();
						dayCell.appendChild(dayLink);
						tr.appendChild(dayCell);
					})();
				}
				// TODO: Not supported in older browsers.
				// days[0].toLocaleString('en-US', { month : 'long' });
				this.monthName.textContent = monthNames[days[0].getMonth()];
				this.yearName.textContent = days[0].getFullYear();
				return days;
			},
			refresh : function() {
				if (this.selectedDay) {
					this.daysComputed.locked = true;
					this.month = this.selectedDay.getMonth();
					this.daysComputed.locked = false;
					this.year = this.selectedDay.getFullYear();
				}
			}
		}
	});
	var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
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