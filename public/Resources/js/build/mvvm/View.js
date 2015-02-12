/**
 * @class build.mvvm.View
 * @extends build.ui.Container
 */
Build('build.mvvm.View', [ 'build::build.ui.Container', 'build::build.binding.ValueBinding', 'build::build.binding.ForEachBinding' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function View(valueMap, viewModel) {
			$super(this)();
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
			init : function() {
				this.mapViewModel(this.valueMap, this.viewModel);
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