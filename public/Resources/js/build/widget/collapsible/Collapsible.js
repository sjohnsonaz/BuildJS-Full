/**
 * @class build.widget.collapsible.Collapsible
 * @extends build.ui.Container
 */
Build('build.widget.collapsible.Collapsible', [ 'build::build.ui.Container', 'build::build.ui.Content' ], function(define, $super) {
	define({
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
			this.watchValue('open', open || false, undefined, function(value, cancel) {
				if (value) {
					this.element.classList.add('collapsible-open');
					this.body.style.height = this.innerElement.scrollHeight + 'px';
					window.setTimeout(function() {
						this.body.style.height = 'auto';
					}.bind(this), 500);
				} else {
					this.body.style.height = this.innerElement.scrollHeight + 'px';
					window.setTimeout(function() {
						this.body.style.height = '0px';
						window.setTimeout(function() {
							this.element.classList.remove('collapsible-open');
						}.bind(this), 500);
					}.bind(this), 1);
				}
				return value;
			}.bind(this));
			this.header.addEvent('click', function(event) {
				this.open = !this.open;
			}.bind(this));
		}
	});
});