Build('build.ui.element.Table', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Table() {
			this.type = 'table';
			this.headers = ko.observableArray();
			this.rows = ko.observableArray();
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				var thead = document.createElement('thead');

				var trHead = document.createElement('tr');
				trHead.dataset.bind = 'foreach: headers';
				thead.appendChild(trHead);

				var th = document.createElement('th');
				th.dataset.bind = 'text: $data';
				trHead.appendChild(th);

				var tbody = document.createElement('tbody');
				tbody.dataset.bind = 'foreach: rows';

				var tr = document.createElement('tr');
				tr.dataset.bind = 'foreach: $data';
				tbody.appendChild(tr);

				var td = document.createElement('td');
				td.dataset.bind = 'element: $data';
				tr.appendChild(td);

				this.element.appendChild(thead);
				this.element.appendChild(tbody);
				ko.applyBindingsToNode(this.element, {
					'with' : this
				});
			},
			addRow : function() {

			}
		}
	});
});