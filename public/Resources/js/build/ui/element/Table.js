/**
 * @class build.ui.element.Table
 * @extends build.ui.Container
 */
Build('build.ui.element.Table', [ 'build::build.ui.Container', 'build::build.utility.ObservableArray' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 * @property headers
		 */
		$constructor : function Table() {
			$super(this)();
			var self = this;
			this.headers = build.utility.ObservableArray();
			this.head = document.createElement('thead');
			this.body = document.createElement('tbody');
			this.element.appendChild(this.head);
			this.element.appendChild(this.body);
			this.innerElement = this.body;
			this.headers.subscribe(function() {
				if (self.head) {
					while (self.head.firstChild) {
						self.head.removeChild(self.head.firstChild);
					}
					if (self.headers) {
						var tr = document.createElement('tr');
						for (var index = 0, length = self.headers.length; index < length; index++) {
							var td = document.createElement('th');
							var data = self.headers[index];
							data = data.element || data;
							if (typeof data == 'object') {
								td.appendChild(data);
							} else {
								td.innerHTML = data;
							}
							tr.appendChild(td);
						}
						self.head.appendChild(tr);
					}
				}
				// var trHead = document.createElement('tr');
				// trHead.dataset.bind = 'foreach: headers';
				// thead.appendChild(trHead);

				// var th = document.createElement('th');
				// th.dataset.bind = 'text: $data';
				// trHead.appendChild(th);
			});
		},
		$prototype : {
			type : 'table',
			/**
			 * @method createChild
			 * @param child
			 */
			createChild : function(child) {
				var tr = document.createElement('tr');
				if (child instanceof Array) {
					for (var index = 0, length = child.length; index < length; index++) {
						var td = document.createElement('td');
						var data = child[index];
						data = data.element || data;
						if (typeof data == 'object') {
							td.appendChild(data);
						} else {
							td.innerHTML = data;
						}
						tr.appendChild(td);
					}
				}
				return tr;
			},
			/**
			 * @method addRow
			 */
			addRow : function() {

			}
		}
	});
});