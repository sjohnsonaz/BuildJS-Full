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
				var firstValue = this.runSet(value, set, thisArg);
				if (typeof firstValue !== 'undefined') {
					localStorage.setItem(name, JSON.stringify(firstValue));
				}
				var hidden = firstValue;
				Object.defineProperty(this, name, Build.merge({
					configurable : true,
					enumerable : true,
					get : typeof get === 'function' ? function() {
						return thisArg ? get.call(thisArg, JSON.parse(localStorage.getItem(name)), this) : get(JSON.parse(localStorage.getItem(name)), this);
					} : function() {
						return JSON.parse(localStorage.getItem(name));
					},
					set : typeof set == 'function' ? function(value) {
						value = thisArg ? set.call(thisArg, value, hidden, cancel) : set(value, hidden, cancel);
						if (value !== cancel) {
							hidden = value;
							localStorage.setItem(name, JSON.stringify(hidden));
							this.publish(name);
						}
					} : function(value) {
						localStorage.setItem(name, JSON.stringify(value));
						this.publish(name);
					}
				}, definition));
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
				var firstValue = this.runSet(value, set, thisArg);
				if (typeof firstValue !== 'undefined') {
					sessionStorage.setItem(name, JSON.stringify(firstValue));
				}
				var hidden = firstValue;
				Object.defineProperty(this, name, Build.merge({
					configurable : true,
					enumerable : true,
					get : typeof get === 'function' ? function() {
						return thisArg ? get.call(thisArg, JSON.parse(sessionStorage.getItem(name)), this) : get(JSON.parse(sessionStorage.getItem(name)), this);
					} : function() {
						return JSON.parse(sessionStorage.getItem(name));
					},
					set : typeof set == 'function' ? function(value) {
						value = thisArg ? set.call(thisArg, value, hidden, cancel) : set(value, hidden, cancel);
						if (value !== cancel) {
							hidden = value;
							sessionStorage.setItem(name, JSON.stringify(hidden));
							this.publish(name);
						}
					} : function(value) {
						sessionStorage.setItem(name, JSON.stringify(value));
						this.publish(name);
					}
				}, definition));
			}
		}
	});
});