/**
 * @class build.widget.collapsible.Collapsible
 * @extends build.ui.Container
 */
Build('build.widget.collapsible.Collapsible', [ 'build::build.ui.Container', 'build::build.ui.Content' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Collapsible(header, open) {
			$super(this)();
			this.header = build.ui.Content.createType('a', header || '');
			this.header.className = 'collapsible-header';
			this.body = document.createElement('div');
			this.body.className = 'collapsible-body';
			this.innerElement = document.createElement('div');
			this.innerElement.className = 'collapsible-content';
			this.element.appendChild(this.header.element);
			this.body.appendChild(this.innerElement);
			this.element.appendChild(this.body);
			this.body.style.height = '0px';
			var finished = true;
			this.watchValue('open', open || false, undefined, function(value, current, cancel) {
				var self = this;
				// We can animate
				if (finished) {
					finished = false;
					if (value) {
						this.body.style.height = '0px';
						window.setTimeout(function() {
							if (!finished) {
								self.body.style.height = self.innerElement.scrollHeight + 'px';
								self.element.classList.add('collapsible-open');
								window.setTimeout(function() {
									if (!finished) {
										self.body.style.height = 'auto';
										finished = true;
									}
								}, 500);
							}
						}, 100);
					} else {
						self.body.style.height = self.innerElement.scrollHeight + 'px';
						window.setTimeout(function() {
							if (!finished) {
								self.body.style.height = '0px';
								window.setTimeout(function() {
									if (!finished) {
										self.element.classList.remove('collapsible-open');
										finished = true;
									}
								}, 500);
							}
						}, 100);
					}
				} else {
					finished = true;
					// Do not animate.  All animations will be ignored.
					if (value) {
						self.body.style.height = 'auto';
						self.element.classList.add('collapsible-open');
					} else {
						this.body.style.height = '0px';
						self.element.classList.remove('collapsible-open');
					}
				}
				return value;
			}.bind(this));
			this.header.addEvent('click', function(event) {
				this.open = !this.open;
			}.bind(this));
		}
	});
});