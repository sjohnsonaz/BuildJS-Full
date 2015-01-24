/**
 * @class build.viewmodel.ViewModel
 * @extends build.Module
 */
Build('build.viewmodel.ViewModel', [ 'build::build.Module' ], function(define, $super) {
	define({
		$extends : 'build.Module',
		/**
		 * @constructor
		 */
		$constructor : function ViewModel(data) {
			$super(this)();
			if (data) {

			}
		},
		$prototype : {
			property : function(name, value, type, validation) {
				switch (typeof type) {
				case 'string':
					switch (type) {
					case "undefined":
					case "boolean":
					case "number":
					case "string":
					case "symbol":
					case "function":
					case "object":
						// pass through for now
						break;
					default:
						type = Build.definitions[type];
						if (type) {
							value = new type(value);
						}
						break;
					}
					break;
				case 'function':
					value = new type(value);
					break;
				}
				this.watchValue(name, value, null, validation);
			}
		},
		$static : {
			wrap : function(data) {
				var result = Object.create(this.prototype, Build.debug ? {
					constructor : {
						value : this
					}
				} : undefined);
				result = this.apply(result, arguments) || result;
				result.createElement();
				result.init.apply(result, arguments);
				return result;
			},
		}
	});
});