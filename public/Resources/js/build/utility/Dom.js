/**
 * @class build.utility.Dom
 * Best Practices inspired by article at:
 * https://developers.google.com/speed/articles/javascript-dom
 */
Build('build.utility.Dom', [], function(define, $super) {
	define({
		/**
		 * @constructor
		 */
		$constructor : function Dom() {

		},
		$static : {
			/**
			 * Prevents multiple DOM reflows.
			 */
			modifyElement : function(element, callback) {
				var parentNode = element.parentNode;
				var nextSibling = element.nextSibling;
				parentNode.removeChild(element);
				callback(function() {
					if (nextSibling) {
						parentNode.insertBefore(element, nextSibling);
					} else {
						parentNode.appendChild(element);
					}
				});
			},
			/**
			 * Appends multiple children via a DocumentFragment.
			 */
			appendChildren : function(element, children) {
				if (!children instanceof Array) {
					element.appendChild(children);
				} else {
					var fragment = document.createDocumentFragment();
					for (var index = 0, length = children.length; index < length; index++) {
						fragment.appendChild(children[index]);
					}
					element.appendChild(fragment);
				}
			}
		}
	});
});