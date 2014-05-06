Build('build.widget.grid.Pager', [ 'build.ui.Container', 'build.ui.element.Link' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		$constructor : function() {
			$super(this)();
			this.type = 'ul';
			this.iteratorType = 'li';
			this.startLink = build.ui.element.Link.create('{{i:fast-backward}}');
			this.startLink.textHelpers = true;
			this.backLink = build.ui.element.Link.create('{{i:step-backward}}');
			this.backLink.textHelpers = true;
			this.forwardLink = build.ui.element.Link.create('{{i:fast-forward}}');
			this.forwardLink.textHelpers = true;
			this.endLink = build.ui.element.Link.create('{{i:step-forward}}');
			this.endLink.textHelpers = true;

			this.startElement = document.createElement('li');
			this.startElement.className = 'panel-iterator';
			this.startElement.appendChild(this.startLink.element);

			this.backElement = document.createElement('li');
			this.backElement.className = 'panel-iterator';
			this.backElement.appendChild(this.backLink.element);

			this.forwardElement = document.createElement('li');
			this.forwardElement.className = 'panel-iterator';
			this.forwardElement.appendChild(this.forwardLink.element);

			this.endElement = document.createElement('li');
			this.endElement.className = 'panel-iterator';
			this.endElement.appendChild(this.endLink.element);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				document.createElement('li');
			},
			refreshChildren : function() {
				$super().refreshChildren(this)();
				this.element.insertBefore(this.backElement, this.element.firstChild);
				this.element.insertBefore(this.startElement, this.backElement);
				this.element.appendChild(this.forwardElement);
				this.element.appendChild(this.endElement);
			}
		}
	});
});