/**
 * @class build.storage.BrowserStorage
 */
Build('build.storage.BrowserStorage', [ 'build::build.Module' ], function(define, $super) {
	define({
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
			watchLocalStorage : function(name, value, get, set) {
				Object.defineProperty(this, name, {
					configurable : true,
					get : typeof get === 'function' ? function() {
						return get(localStorage.getItem(name), this);
					} : function() {
						return localStorage.getItem(name);
					},
					set : typeof set == 'function' ? function(value) {
						value = set(value, cancel);
						if (value !== cancel) {
							localStorage.setItem(name, value);
							this.publish(name);
						}
					} : function(value) {
						localStorage.setItem(name, value);
						this.publish(name);
					}
				});
			},
			/**
			 * @method watchSessionStorage
			 * @param name
			 * @param value
			 * @param get
			 * @param set
			 */
			watchSessionStorage : function(name, value, get, set) {
				Object.defineProperty(this, name, {
					configurable : true,
					get : typeof get === 'function' ? function() {
						return get(sessionStorage.getItem(name), this);
					} : function() {
						return sessionStorage.getItem(name);
					},
					set : typeof set == 'function' ? function(value) {
						value = set(value, cancel);
						if (value !== cancel) {
							sessionStorage.setItem(name, value);
							this.publish(name);
						}
					} : function(value) {
						sessionStorage.setItem(name, value);
						this.publish(name);
					}
				});
			}
		}
	});
});