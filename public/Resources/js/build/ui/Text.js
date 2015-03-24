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
			Object.defineProperty(this, 'element', {
				value : document.createTextNode(text ? this.formatString(text, this) : ''),
				configurable : true,
				writable : true,
				enumerable : false
			});
			this.watchProperty('text', 'data', undefined, null, function(value) {
				return this.formatString(value, this);
			}.bind(this));
			this.watchProperty('rawText', 'data');
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
				name = name || property;
				// TODO: Decide action on undefined
				var firstValue = this.runSet(value, set, thisArg);
				if (typeof firstValue !== 'undefined') {
					this.element[name] = firstValue;
				}
				var hidden;
				Object.defineProperty(this, property, Build.merge({
					configurable : true,
					enumerable : true,
					get : typeof get === 'function' ? function() {
						return thisArg ? get.call(thisArg, this.element[name], this) : get(this.element[name], this);
					} : function() {
						return this.element[name];
					},
					set : typeof set === 'function' ? function(value) {
						//if (value !== this.element[name]) {
						value = thisArg ? set.call(thisArg, value, hidden, cancel) : set(value, hidden, cancel);
						if (value !== cancel) {
							hidden = value;
							this.element[name] = hidden || '';
							this.publish(property);
						}
						//}
					} : function(value) {
						//if (value !== this.element[name]) {
						this.element[name] = value || '';
						this.publish(property);
						//}
					}
				}, definition));
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