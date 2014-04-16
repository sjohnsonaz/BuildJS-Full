/**
 * @class build.utility.Navigation
 * @extemds build.ui.Module
 * 
 * Monitor navigation locks 
 */
Build('build.utility.Navigation', [ 'build::build.ui.Module' ], function(define, $super, helper) {
	define({
		$extends : 'build.ui.Module',
		/**
		 * @constructor
		 */
		/**
		 * @property message
		 * @property locks
		 * @property lock
		 */
		$constructor : function() {
			var lockCallback = function(event) {
				return this.message;
			}.bind(this);
			this.message = 'Are you sure you want to navigate away from this page?';
			this.locks = [];
			/**
			 * @method lock
			 * @param locker
			 */
			this.lock = function(locker) {
				if (this.locks.indexOf(locker) == -1) {
					this.locks.push(locker);
					window.addEventListener('beforeunload', lockCallback, false);
					this.publish('locked');
				}
			};
			/**
			 * @method unlock
			 * @param locker
			 */
			this.unlock = function(locker) {
				var index = this.locks.indexOf(locker);
				if (index != -1) {
					this.locks.splice(index, 1);
					if (!this.locks.length) {
						window.removeEventListener('beforeunload', lockCallback);
					}
					this.publish('locked');
				}
			};
			/**
			 * @method clear
			 */
			this.clear = function() {
				this.locks.length = 0;
			};
			/**
			 * @property locked
			 */
			Object.defineProperty(this, 'locked', {
				get : function() {
					return !!this.locks.length;
				}
			});
		},
		$singleton : true
	});
});