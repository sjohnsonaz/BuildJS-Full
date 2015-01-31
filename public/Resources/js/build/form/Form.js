/**
 * @class build.form.Form
 * @extends build.ui.Container
 */
Build('build.form.Form', [ 'build::build.ui.Container', 'build::build.binding.ValueBinding', 'build::build.binding.ForEachBinding' ], function(define, $super) {
	// TODO: Create navigation prevention on form change.
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 * @property method
		 * @property action
		 * @property model
		 */
		$constructor : function Form(valueMap) {
			$super(this)();
			this.valueMap = valueMap;
			this.watchProperty('method', 'method', 'GET');
			this.watchProperty('action', 'action', '');
			var modelHidden = null;
			Object.defineProperty(this, 'model', {
				get : function() {
					if (modelHidden) {
						this.unwrap(modelHidden || {});
					}
					return modelHidden;
				},
				set : function(value) {
					if (value) {
						this.wrap(value);
					} else {
						this.clear();
					}
					modelHidden = value;
					this.publish('model');
				}
			});
			this.watchValue('viewModel', undefined, undefined, function(value, cancel) {
				// TODO: Destroy bindings if changed.
				this.mapViewModel(value);
			}.bind(this));
		},
		$prototype : {
			type : 'form',
			/**
			 * @method preventSubmit
			 */
			preventSubmit : function() {
				this.element.addEventListener('submit', function(event) {
					event.preventDefault();
					return false;
				});
			},
			/**
			 * @method wrap
			 * @param model
			 */
			wrap : function(model) {
			},
			/**
			 * @method unwrap
			 * @param model
			 */
			unwrap : function(model) {
			},
			/**
			 * @method clear
			 */
			clear : function() {
			},
			mapViewModel : function(viewModel) {
				if (this.valueMap && viewModel) {
					for ( var name in this.valueMap) {
						var mapDefinition = this.valueMap[name];
						var sourceName = mapDefinition.name || name;
						var viewModelDefinition = viewModel.definition[sourceName];
						if (viewModelDefinition) {
							if (viewModelDefinition.type === 'array') {
								if (this[name]) {
									build.binding.ForEachBinding.create(this[name], viewModel, mapDefinition.name || name);
								}
							} else {
								build.binding.ValueBinding.create(this[name], viewModel, mapDefinition.name || name);
							}
						}
					}
				}
			}
		}
	});
});