/**
 * @class build.ui.Text
 * @extends build.Module
 */
Build('build.ui.Text', [ 'build::build.Module' ], function(define, $super) {
	define({
		$extends : 'build.Module',
		/**
		 * @constructor
		 */
		$constructor : function Text(data) {
			$super(this)();
			Object.defineProperty(this, 'element', {
				value : document.createTextNode(data),
				configurable : true,
				writable : true,
				enumerable : false
			});
			this.watchProperty('data');
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
			watchProperty : function(property, name, get, set) {
				name = name || property;
				Object.defineProperty(this, property, {
					configurable : true,
					enumerable : true,
					get : typeof get === 'function' ? function() {
						return get(this.element[name], this);
					} : function() {
						return this.element[name];
					},
					set : typeof set === 'function' ? function(value) {
						//if (value !== this.element[name]) {
						value = set(value, cancel);
						if (value !== cancel) {
							this.element[name] = value || '';
							this.publish(property);
						}
						//}
					} : function(value) {
						//if (value !== this.element[name]) {
						this.element[name] = value || '';
						this.publish(property);
						//}
					}
				});
			}
		},
		$static : {
			/**
			 * @method create
			 * @static
			 */
			create : function() {
				var result = Object.create(this.prototype);
				result = this.apply(result, arguments) || result;
				result.init.apply(result, arguments);
				return result;
			}
		}
	});
});