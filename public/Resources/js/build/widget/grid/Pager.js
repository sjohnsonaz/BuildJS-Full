/**
 * @class build.widget.grid.Pager
 * @extends build.ui.Widget
 */
// TODO: Use regular a tag instead of Link object.
Build('build.widget.grid.Pager', [ 'build::build.ui.Container', 'build::build.ui.element.Link' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Pager() {
			$super(this)();
			this.iteratorType = 'li';
			this.watchValue('items', 1);
			this.watchValue('itemsVisible', 10);
			this.watchValue('currentItem', 0);

			this.startLink = build.ui.element.Link.create('{i:[fast-backward]}');
			this.backLink = build.ui.element.Link.create('{i:[step-backward]}');
			this.forwardLink = build.ui.element.Link.create('{i:[step-forward]}');
			this.endLink = build.ui.element.Link.create('{i:[fast-forward]}');

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
			type : 'ul',
			init : function() {
				$super().init(this)();
				var refreshChildren = this.refreshChildren.bind(this);
				this.subscribe('items', refreshChildren);
				this.subscribe('itemsVisible', refreshChildren);
				this.subscribe('currentItem', refreshChildren);
			},
			refreshChildren : function() {
				var element = this.element;
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				this.element.appendChild(this.startElement);
				this.element.appendChild(this.backElement);
				var first = Math.max(0, this.currentItem - Math.floor(this.itemsVisible / 2));
				var last = Math.min(first + this.itemsVisible, first + this.items);
				for (var index = first; index < last; index++) {
					var iterator = document.createElement('li');
					iterator.className = 'panel-iterator';
					var link = build.ui.element.Link.create(index + 1);
					iterator.appendChild(link.element);
					this.element.appendChild(iterator);
				}
				this.element.appendChild(this.forwardElement);
				this.element.appendChild(this.endElement);
			}
		}
	});
});