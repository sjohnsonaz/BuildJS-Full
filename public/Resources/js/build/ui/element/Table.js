/**
 * @class build.ui.element.Table
 * @extends build.ui.Container
 */
Build('build.ui.element.Table', [ 'build::build.ui.Container', 'build::build.utility.ObservableArray' ], function(define, $super) {
	define({
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
			this.headers = build.utility.ObservableArray();
		},
		$prototype : {
			type : 'table',
			/**
			 * @method init
			 */
			init : function() {
				$super().init(this)();
				this.head = document.createElement('thead');
				this.body = document.createElement('tbody');
				this.element.appendChild(this.head);
				this.element.appendChild(this.body);
				this.headers.subscribe(function() {
					if (this.head) {
						while (this.head.firstChild) {
							this.head.removeChild(this.head.firstChild);
						}
						if (this.headers) {
							var tr = document.createElement('tr');
							for (var index = 0, length = this.headers.length; index < length; index++) {
								var td = document.createElement('th');
								var data = this.headers[index];
								data = data.element || data;
								if (typeof data == 'object') {
									td.appendChild(data);
								} else {
									td.innerHTML = data;
								}
								tr.appendChild(td);
							}
							this.head.appendChild(tr);
						}
					}
					// var trHead = document.createElement('tr');
					// trHead.dataset.bind = 'foreach: headers';
					// thead.appendChild(trHead);

					// var th = document.createElement('th');
					// th.dataset.bind = 'text: $data';
					// trHead.appendChild(th);
				}.bind(this));
			},
			/**
			 * @method childIterator
			 * @param child
			 * @param index
			 * @param array
			 */
			childIterator : function(child, index, array) {
				if (child) {
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
					this.body.appendChild(tr);
				}
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function() {
				if (this.body) {
					while (this.body.firstChild) {
						this.body.removeChild(this.body.firstChild);
					}
					if (this.children) {
						this.children.forEach(this.childIterator.bind(this));
					}
				}
			},
			/**
			 * @method addRow
			 */
			addRow : function() {

			}
		}
	});
});