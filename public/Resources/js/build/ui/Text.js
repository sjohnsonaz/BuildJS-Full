/**
 * @class build.ui.Text
 * @extends build.Module
 */
Build('build.ui.Text', [ 'build::build.Module' ], function($define, $super) {
	$define({
		$extends : 'build.Module',
		/**
		 * @constructor
		 */
		$constructor : function Text(text) {
			$super(this)();
			var self = this;
			Object.defineProperty(this, 'element', {
				value : document.createTextNode(text ? this.formatString(text, this) : ''),
				configurable : true,
				writable : true,
				enumerable : false
			});
			this.watchProperty('text', 'data', undefined, null, function(value) {
				return self.formatString(value, this);
			});
			this.watchProperty('rawText', 'data', undefined, function(value, current, cancel) {
				return typeof value !== 'undefined' ? value : '';
			});
		},
		$prototype : {
			/**
			 * @method init
			 */
			init : function() {
			},
			/**
			 * @method watchProperty
			 */
			// TODO: Fix value change detection on setter methods.
			watchProperty : function(property, name, value, get, set, thisArg, definition) {
				var self = this;
				this.watchValueFunction(property, name, value, get, set, thisArg, definition, function(name) {
					return self.element[name];
				}, function(name, value) {
					self.element[name] = value || '';
				});
			}
		},
		$static : {
			/**
			 * @method create
			 * @static
			 */
			create : function() {
				var result = Object.create(this.prototype, Build.debug ? {
					constructor : {
						value : this
					}
				} : undefined);
				result = this.apply(result, arguments) || result;
				result.init.apply(result, arguments);
				return result;
			}
		}
	});
});