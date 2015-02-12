/**
 * @class build.mvvm.ViewModel
 * @extends build.Module
 */
Build('build.mvvm.ViewModel', [ 'build::build.Module', 'build::build.utility.ObservableArray' ], function($define, $super) {
	function getValue(type, value, defaultValue) {
		if (type === 'array') {
			return build.utility.ObservableArray(typeof value !== 'undefined' ? value : (defaultValue || []));
		} else {
			return typeof value !== 'undefined' ? value : defaultValue;
		}
	}
	$define({
		$extends : 'build.Module',
		/**
		 * @constructor
		 */
		$constructor : function ViewModel(definition, data) {
			$super(this)();
			this.definition = definition || {};
			data = data || {};
			if (definition) {
				for ( var name in definition) {
					var propertyDefinition = definition[name];
					this.watchValue(name, getValue(propertyDefinition.type, data[name], propertyDefinition.value), propertyDefinition.get, propertyDefinition.set);
				}
			}
		},
		$prototype : {
			/**
			 * 
			 */
			populate : function(data) {
				data = data || {};
				for ( var name in this.definition) {
					var propertyDefinition = this.definition[name];
					if (propertyDefinition.type === 'array') {
						this[name].removeAll();
						if (data[name]) {
							this[name].push.apply(this[name], data[name]);
						}
					} else {
						this[name] = data[name];
					}
				}
			},
			/**
			 * 
			 */
			clear : function() {
				for ( var name in this.definition) {
					var propertyDefinition = this.definition[name];
					if (propertyDefinition.type == 'array') {
						this[name].removeAll();
					} else {
						this[name] = '';
					}
				}
			},
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