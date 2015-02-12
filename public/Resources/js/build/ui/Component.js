/**
 * @class build.ui.Component
 */
Build('build.ui.Component', [], function($define, $super) {
	$define({
		$extends : HTMLElement,
		/**
		 * @constructor
		 */
		$constructor : function Component() {
		},
		$prototype : {
			base : HTMLElement,
			type : 'build-component',
			extends : undefined,
			createdCallback : function() {
			},
			attachedCallback : function() {
			},
			detachedCallback : function() {
			},
			attributeChangedCallback : function() {
			}
		},
		$post : function() {
			var $constructor = this;
			var createdCallback = this.prototype.createdCallback;
			return document.registerElement(this.prototype.type || Build.nameToCss(this).toLower(), {
				prototype : {
					createdCallback : typeof createdCallback === 'function' ? function() {
						createdCallback.apply(this, arguments)
						$constructor.apply(this, arguments);
					} : $constructor,
					attachedCallback : this.prototype.attachedCallback,
					detachedCallback : this.prototype.detachedCallback,
					attributeChangedCallback : this.prototype.attributeChangedCallback
				},
				extends : this.prototype.tagName
			});
		}
	});
});