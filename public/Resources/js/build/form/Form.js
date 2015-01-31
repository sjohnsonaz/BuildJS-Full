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
		$constructor : function Form(valueMap, viewModel) {
			$super(this)();
			this.watchProperty('method', 'method', 'GET');
			this.watchProperty('action', 'action', '');
			// valueMap and viewModel cannot be changed.
			Object.defineProperty(this, 'valueMap', {
				value : valueMap,
				configurable : true,
				enumerable : true
			});
			Object.defineProperty(this, 'viewModel', {
				value : viewModel,
				configurable : true,
				enumerable : true
			});
		},
		$prototype : {
			type : 'form',
			init : function() {
				this.mapViewModel(this.valueMap, this.viewModel);
			},
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
			mapViewModel : function(valueMap, viewModel) {
				if (valueMap && viewModel) {
					for ( var name in valueMap) {
						var mapDefinition = valueMap[name];
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