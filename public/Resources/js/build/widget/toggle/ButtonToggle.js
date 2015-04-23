/**
 * @class build.widget.toggle.ButtonToggle
 * @extends build.ui.Widget
 */
Build('build.widget.toggle.ButtonToggle', [ 'build::build.ui.Widget', ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function BuildToggle(name, value, text) {
			$super(this)();
			var self = this;
			this.checkbox = document.createElement('input');
			this.checkbox.type = 'checkbox';
			this.checkbox.id = this.uniqueId('toggle-checkbox');
			this.checkbox.tabIndex = -1;
			this.label = document.createElement('label');
			this.label.htmlFor = this.checkbox.id;
			this.button = document.createElement('span');
			this.button.tabIndex = 0;
			this.label.appendChild(this.button);

			this.watchValue('name', name, function(value) {
				return self.checkbox.name;
			}, function(value) {
				self.checkbox.name = value;
				return value;
			});
			this.watchValue('value', value, function(value) {
				value = self.checkbox.checked;
				return self.checkbox.indeterminate ? -1 : value;
			}, function(value, current, cancel) {
				if (value == -1) {
					self.checkbox.indeterminate = true;
					self.checkbox.checked = false;
					return false;
				} else {
					self.checkbox.indeterminate = false;
					self.checkbox.checked = value;
					return value;
				}
			});
			this.checkbox.addEventListener('change', function() {
				self.value = self.checkbox.checked;
			});
			this.watchValue('text', text, function() {
				return self.button.innerHTML;
			}, function(value) {
				self.button.innerHTML = text;
				return value;
			});

			this.element.appendChild(this.checkbox);
			this.element.appendChild(this.label);
		},
		$prototype : {
			type : 'span'
		}
	});
});