/**
 * @class build.widget.collapsible.Collapsible
 * @extends build.ui.Container
 */
Build('build.widget.collapsible.Collapsible', [ 'build::build.ui.Container', 'build::build.ui.Content', 'build::build.utility.Animation' ], function($define, $super) {
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
				if (value) {
					build.utility.Animation.animate(this.body, {
						height : 'auto'
					}, 500, function() {
						self.element.classList.add('collapsible-open');
					});
				} else {
					build.utility.Animation.animate(this.body, {
						height : '0px'
					}, 500, function() {
						self.element.classList.remove('collapsible-open');
					});
				}
				return value;
			}.bind(this));
			this.header.addEvent('click', function(event) {
				this.open = !this.open;
			}.bind(this));
		}
	});
});