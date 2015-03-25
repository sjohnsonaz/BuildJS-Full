/**
 * @class build.Build
 * @alternateClassName Build
 * Browser Support: IE6+
 */
var build = build || {};
var Build = build.Build = (function() {
	/**
	 * @method Build
	 * @param value
	 * Switches to {@link Build#onload onload} or {@link Build#define define} methods.
	 */
	function Build(value) {
		switch (typeof value) {
		case 'function':
			Build.onload.apply(Build.onload, arguments);
			break;
		case 'string':
			Build.define.apply(Build.define, arguments);
			break;
		}
	}
	var compiled = true;
	var loaded = false;
	var loading = {};
	var defHandles = {};
	var paths = {
		main : '/',
		build : '/'
	};
	var preLoading = {};
	var root = {};
	var environment = (function() {
		if (typeof window !== 'undefined') {
			return {
				name : 'browser',
				root : window
			};
		} else if (typeof process !== 'undefined') {
			loaded = true;
			module.exports = Build;
			return {
				name : 'node',
				root : root,
				override : 'hidden',
				processOverride : function() {
					this.root = process;
					this.override = 'process';
					process.Build = Build;
				},
				globalOverride : function() {
					this.root = GLOBAL;
					this.override = 'global';
					GLOBAL.Build = Build;
				}
			};
		} else {
			return {
				name : null,
				root : null
			};
		}
	})();
	/**
	 * @method namespace
	 * @param {String} $name The dot delimited name of the constructor or object.
	 * @param {Function} $constructor The constructor or object to be namespaced.
	 */
	function namespace($name, $constructor) {
		var parts = $name.split('.');
		var parent = environment.root;
		var grandParent = parent;
		var currentPart = '';
		for (var index = 0, length = parts.length; index < length; index++) {
			currentPart = parts[index];
			parent[currentPart] = parent[currentPart] || {};
			grandParent = parent;
			parent = parent[currentPart];
		}

		root[parts[0]] = environment.root[parts[0]];
		return grandParent[currentPart] = $constructor;
	}
	/**
	 * @method copyNoReplace
	 * @param {Object} destination
	 * @param {Object} source
	 * @returns {Object} 
	 */
	function copyNoReplace(destination, source) {
		for ( var member in source) {
			if (source.hasOwnProperty(member)) {
				// TODO: Test if this can override with a false or null.
				destination[member] = destination[member] || source[member];
			}
		}
		return destination;
	}
	/**
	 * @method copyReplace
	 * @param {Object} destination
	 * @param {Object} source
	 * @returns
	 */
	function copyReplace(destination, source) {
		for ( var member in source) {
			if (source.hasOwnProperty(member)) {
				destination[member] = source[member];
			}
		}
		return destination;
	}
	function makeProtoLocked(member, method, superContainer) {
		var childScope = undefined;
		function child() {
			return method.apply(childScope, arguments);
		}
		superContainer[member] = function(scope) {
			childScope = scope;
			return child;
		};
	}
	function makeProto(member, proto, superContainer) {
		var childScope = undefined;
		function child() {
			return proto[member].apply(childScope, arguments);
		}
		superContainer[member] = function(scope) {
			childScope = scope;
			return child;
		};
	}
	/**
	 * @method inherit
	 * @param {Object} $child
	 * @param {Object} $parent
	 * @param {Object} $prototype
	 * @param {Boolean} $lockParent
	 */
	function inherit($child, $parent, $prototype, $lockParent) {
		if ($parent) {
			$prototype = $prototype || {};
			if (Object.keys($child.prototype).length) {
				copyReplace($prototype, $child.prototype);
			}
			$child.prototype = Object.create($parent.prototype, {
				constructor : {
					value : $child
				}
			});
			copyReplace($child.prototype, $prototype);

			copyNoReplace($child, $parent);

			$child.$parent = $parent;
			$child.$super = {};
			if ($lockParent) {
				for ( var member in $parent.prototype) {
					// We do not want to check hasOwnProperty
					makeProtoLocked(member, $parent.prototype[member], $child.$super);
				}
			} else {
				for ( var member in $parent.prototype) {
					// We do not want to check hasOwnProperty
					makeProto(member, $parent.prototype, $child.$super);
				}
			}

			/*
			 * $child.$super = function(scope) { return function() {
			 * $child.$parent.apply(scope,
			 * Array.prototype.slice.call(arguments)); }; };
			 */
		} else {
			copyNoReplace($child.prototype, $prototype);
		}
	}
	function base($constructor, $base) {
		return function() {
			var base = $base.apply(this, arguments);
			$constructor.apply(base, arguments);
			return base;
		};
	}
	/**
	 * @method singleton
	 * @param {Function} $constructor
	 * @returns {Function}
	 */
	function singleton($constructor) {
		var result = undefined;
		return function() {
			if (!result) {
				result = Object.create($constructor.prototype, Build.debug ? {
					constructor : {
						value : $constructor
					}
				} : undefined);
				$constructor.apply(result, arguments);
			}
			return result;
		};
	}
	var definitions = {};
	/**
	 * @method assemble
	 * @param {String} $name
	 * @param {Function} $constructor
	 * @param {Object} $prototype
	 * @param {Object} $static
	 * @param {Function} $parent
	 * @param {Boolean} $singleton
	 * @param {Object} $base
	 * @param {Boolean} $lockParent
	 * @returns {Function}
	 */
	function assemble($name, $constructor, $prototype, $static, $parent, $singleton, $base, $lockParent, $post) {
		$constructor = $base ? base($constructor, $base) : $constructor;

		copyNoReplace($constructor, $static);

		inherit($constructor, $parent, $prototype, $lockParent);

		$constructor.$name = $name;
		$constructor.$base = $base;

		$constructor = $singleton ? singleton($constructor) : $constructor;

		$constructor = typeof $post === 'function' ? ($post.apply($constructor, arguments) || $constructor) : $constructor

		definitions[$name] = $constructor;
		namespace($name, $constructor);
		return $constructor;
	}
	/**
	 * @method define
	 * @param $name
	 * @param $required
	 * @param $definition
	 */
	function define($name, $required, $definition) {
		compiled = false;
		if (!loaded) {
			delete preLoading[$name];
		}
		var requiredRemainingPaths = [];
		var requiredRemainingNames = [];
		for (var index = 0, length = $required.length; index < length; index++) {
			var requiredPath = $required[index];
			// required may be commented out with a #.
			// This may be used for lazy load classes when compiling.
			if (requiredPath[0] != '#') {
				var pathInformation = getPathInformation(requiredPath);
				var requiredName = pathInformation.name;
				if (!definitions[requiredName] && !defHandles[requiredName] && !loading[requiredName] && !preLoading[requiredName]) {
					requiredRemainingPaths.push(requiredPath);
					requiredRemainingNames.push(requiredName);
				}
			}
		}
		defHandles[$name] = $definition;
		if (requiredRemainingPaths.length) {
			if (loaded) {
				load(requiredRemainingPaths, function() {
				});
			} else {
				for (var index = 0, length = requiredRemainingPaths.length; index < length; index++) {
					preLoading[requiredRemainingNames[index]] = requiredRemainingPaths[index] || true;
				}
			}
		}
	}
	/**
	 * @method compile
	 */
	function compile() {
		var defHandlesNames = Object.keys(defHandles);
		while (defHandlesNames.length) {
			var $name = defHandlesNames.pop();
			compileClass($name);
		}
		defHandles = {};
		defHandlesNames = null;
		compiled = true;
		loadPhaseComplete();
	}
	/**
	 * 
	 */
	function merge(a, b, c) {
		if (b) {
			for ( var member in b) {
				if (b.hasOwnProperty(member)) {
					a[member] = b[member];
				}
			}
		}
		if (c) {
			for ( var member in c) {
				if (b.hasOwnProperty(member)) {
					a[member] = c[member];
				}
			}
		}
		return a;
	}
	/**
	 * 
	 */
	function safe(callback) {
		return typeof callback === 'function' ? callback : function() {
		};
	}
	function makeSuper(scope) {

	}
	/**
	 * @method compileClass
	 */
	function compileClass($name) {
		var defHandle = defHandles[$name];
		delete defHandles[$name];
		if (defHandle) {
			var $constructor;
			var superScope = undefined;
			var superConstructor;
			defHandle(function($definition) {
				var $parent;
				if ($definition.$extends) {
					if (typeof $definition.$extends === 'object') {
						$parent = $definition.$extends;
					} else if (definitions[$definition.$extends]) {
						$parent = definitions[$definition.$extends];
					} else {
						compileClass($definition.$extends);
						$parent = definitions[$definition.$extends];
					}
				}
				if ($parent && $parent.$base) {
					$definition.$base = $definition.$base || $parent.$base;
				}
				$constructor = assemble($name, $definition.$constructor, $definition.$prototype, $definition.$static, $parent, $definition.$singleton, $definition.$base, $definition.$lockParent, $definition.$post);
				superConstructor = function() {
					if ($constructor.$parent) {
						$constructor.$parent.apply(superScope, Array.prototype.slice.call(arguments));
					}
				}
			}, function(scope) {
				if (scope) {
					superScope = scope;
					return superConstructor;
				} else {
					return $constructor.$super;
				}
			});
		}
	}
	function register($name, $definition) {
		delete preLoading[$name];
		Build.definitions[$name] = $definition;
	}
	/**
	 * @method nameToCss
	 * @param $name
	 * @returns
	 */
	function nameToCss($name) {
		return $name.replace(/\./g, '-');
	}
	/**
	 * @method nameToFileName
	 * @param $name
	 * @param path
	 * @returns
	 */
	function nameToFileName($name, path) {
		if ($name.startsWith('http://' || 'https://')) {
			return $name;
		} else if ($name.endsWith('.js')) {
			return path + $name;
		} else {
			return path + $name.replace(/\./g, '/') + '.js';
		}
	}
	/**
	 * @class build.Build.CallbackQueue
	 */
	function CallbackQueue() {
		this.done = false;
		this.queue = [];
	}
	CallbackQueue.prototype = {
		/**
		 * @method add
		 * @member build.Build.CallbackQueue
		 */
		add : function(callback) {
			if (this.done) {
				callback();
			} else {
				this.queue.push(callback);
			}
		},
		call : function() {
			if (!this.done) {
				while (this.queue.length) {
					this.queue.pop()();
				}
				this.done = true;
			}
		},
		clear : function() {
			this.done = false;
			this.queue = [];
		}
	};
	var waiting = 0;
	/**
	 * @method load
	 * @member build.Build
	 * @param names
	 * @param callback
	 */
	function load(names, callback) {
		load.queue.add(callback);
		function finishLoad() {
			if (!Object.keys(loading).length) {
				compile();
				load.queue.call();
				load.queue.clear();
			}
		}
		if (names instanceof Array) {
			waiting += names.length;
			for (var index = 0, length = names.length; index < length; index++) {
				var $name = names[index];
				loadSingle($name, function() {
					waiting--;
					if (!waiting) {
						finishLoad();
					}
				});
			}
		} else {
			loadSingle(names, finishLoad);
		}
	}
	load.queue = new CallbackQueue();
	var definitionPaths = {};
	function getPathInformation($name) {
		var path;
		var pathParts = $name.split('::');
		if (pathParts.length > 1) {
			path = paths[pathParts[0]] || paths.main;
			$name = pathParts[1];
		} else {
			path = paths.main;
		}
		return {
			name : $name,
			path : path,
			fileName : nameToFileName($name, path)
		};
	}
	function getName($name) {
		var pathParts = $name.split('::');
		if (pathParts.length > 1) {
			$name = pathParts[1];
		}
		return $name;
	}
	function loadSingle($name, callback) {
		var pathInformation = getPathInformation($name);
		var path = pathInformation.path;
		$name = pathInformation.name;
		if (!definitions[$name]) {
			definitionPaths[$name] = path;
			var fileName = pathInformation.fileName;
			var id = nameToCss($name);
			loading[$name] = true;
			loadScript(id, fileName, function() {
				delete loading[$name];
				typeof callback === 'function' ? callback() : true;
			});
		} else {
			typeof callback === 'function' ? callback() : true;
		}
	}
	/**
	 * @method loadScript
	 * @member build.Build
	 * @param id
	 * @param fileName
	 * @param callback
	 */
	function loadScript(id, fileName, callback) {
		switch (environment.name) {
		case 'browser':
			var script = document.createElement('script');
			script.id = id;
			script.src = fileName;
			script.addEventListener('load', callback, false);
			document.getElementsByTagName("head")[0].appendChild(script);
			break;
		case 'node':
			var handle = require(fileName);
			if (!environment.override || typeof handle === 'function') {
				handle(Build);
			}
			typeof callback === 'function' ? callback() : true;
			break;
		}
	}
	function loadPhaseComplete() {
		if (loaded) {
			onload.queue.call();
			onload.queue.clear();
		}
	}
	/**
	 * @method onload
	 * @member build.Build
	 * @param {Function} callback
	 * Runs the callback function when the compilation process is complete.
	 */
	function onload(callback) {
		if (onload.queue) {
			onload.queue.add(callback);
		} else {
			onload.queue = new CallbackQueue();
			onload.queue.add(callback);
			switch (environment.name) {
			case 'browser':
				if (typeof (jQuery) != 'undefined') {
					jQuery(function() {
						loaded = true;
						var preLoadingPaths = Object.keys(preLoading).map(function(value, index) {
							return preLoading[value];
						});
						if (preLoadingPaths.length) {
							load(preLoadingPaths, function() {
								compile();
							});
						} else {
							compile();
						}
					});
				} else {
					window.addEventListener('load', function() {
						loaded = true;
						var preLoadingPaths = Object.keys(preLoading).map(function(value, index) {
							return preLoading[value];
						});
						if (preLoadingPaths.length) {
							load(preLoadingPaths, function() {
								compile();
							});
						} else {
							compile();
						}
					}, false);
				}
				break;
			case 'node':
				compile();
				break;
			}

		}
	}
	onload.queue = null;

	Build.root = root;
	Build.environment = environment;
	Build.namespace = namespace;
	Build.copyReplace = copyReplace;
	Build.copyNoReplace = copyNoReplace;
	Build.inherit = inherit;
	Build.singleton = singleton;
	Build.merge = merge;
	Build.safe = safe;
	Build.definitions = definitions;
	Build.definitionPaths = definitionPaths;
	Build.assemble = assemble;
	Build.paths = paths;
	Build.define = define;
	Build.register = register;
	Build.nameToCss = nameToCss;
	Build.nameToFileName = nameToFileName;
	Build.load = load;
	Build.loadScript = loadScript;
	Build.CallbackQueue = CallbackQueue;
	Build.onload = onload;
	Build.debug = false;
	return Build;
})();

// TODO: Remove polyfills
// These polyfills are either required for browser support, or Harmony features.
// They may be required by other portions of the library.
(function() {
	if (!String.prototype.endsWith) {
		Object.defineProperty(String.prototype, 'endsWith', {
			enumerable : false,
			configurable : false,
			writable : false,
			value : function(searchString, position) {
				position = (position || this.length) - searchString.length;
				var lastIndex = this.lastIndexOf(searchString);
				return lastIndex !== -1 && lastIndex === position;
			}
		});
	}
	if (!String.prototype.startsWith) {
		Object.defineProperty(String.prototype, 'startsWith', {
			enumerable : false,
			configurable : false,
			writable : false,
			value : function(searchString, position) {
				position = position || 0;
				return this.indexOf(searchString, position) === position;
			}
		});
	}
})();