/**
 * @class build.storage.BrowserStorage
 * @extends build.Module
 */
Build('build.storage.BrowserStorage', [ 'build::build.Module' ], function($define, $super) {
	$define({
		$extends : 'build::build.Module',
		/**
		 * @constructor
		 */
		$constructor : function BrowserStorage() {
			$super(this)();
		},
		$singleton : true,
		$prototype : {
			/**
			 * @method watchLocalStorage
			 * @param name
			 * @param value
			 * @param get
			 * @param set
			 */
			// TODO: Apply value change detection on setter methods.
			watchLocalStorage : function(name, value, get, set, thisArg, definition) {
				this.watchValueFunction(name, name, value, get, set, thisArg, definition, function(name) {
					return JSON.parse(localStorage.getItem(name));
				}, function(name, value) {
					localStorage.setItem(name, JSON.stringify(value));
				});
			},
			/**
			 * @method watchSessionStorage
			 * @param name
			 * @param value
			 * @param get
			 * @param set
			 */
			// TODO: Apply value change detection on setter methods.
			watchSessionStorage : function(name, value, get, set, thisArg, definition) {
				this.watchValueFunction(name, name, value, get, set, thisArg, definition, function(name) {
					return JSON.parse(sessionStorage.getItem(name));
				}, function(name, value) {
					sessionStorage.setItem(name, JSON.stringify(value));
				});
			}
		}
	});
});