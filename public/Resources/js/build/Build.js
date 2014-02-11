var build = build || {};
var Build = build.Build = (function() {
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
	function namespace($name, $constructor) {
		var parts = $name.split('.');
		var parent = window;
		var grandParent = parent;
		var currentPart = '';

		for ( var index = 0, length = parts.length; index < length; index++) {
			currentPart = parts[index];
			parent[currentPart] = parent[currentPart] || {};
			grandParent = parent;
			parent = parent[currentPart];
		}

		return grandParent[currentPart] = $constructor;
	}
	function copyNoReplace(destination, source) {
		for ( var member in source) {
			if (source.hasOwnProperty(member)) {
				destination[member] = destination[member] || source[member];
			}
		}
		return destination;
	}
	function copyReplace(destination, source) {
		for ( var member in source) {
			if (source.hasOwnProperty(member)) {
				destination[member] = source[member];
			}
		}
		return destination;
	}
	function inherit($child, $parent, $prototype) {
		if ($parent) {
			$prototype = $prototype || {};
			if (Object.keys($child.prototype).length) {
				copyReplace($prototype, $child.prototype);
			}
			$child.prototype = Object.create($parent.prototype);
			copyReplace($child.prototype, $prototype);
			$child.prototype.constructor = $child;

			copyNoReplace($child, $parent);

			$child.$parent = $parent;

			$child.prototype.$super = $child.prototype.$super || function() {
				this.constructor.$parent.apply(this, Array.prototype.slice.call(arguments));
			};
		} else {
			copyNoReplace($child.prototype, $prototype);
		}
	}
	function singleton($constructor) {
		var result = undefined;
		return function() {
			if (!result) {
				var args = arguments;
				function F() {
					return $constructor.apply(this, args);
				}
				F.prototype = $constructor.prototype;
				result = new F();
			}
			return result;
		};
	}
	var definitions = {};
	function assemble($name, $constructor, $prototype, $static, $parent, $singleton) {
		$construtor = $singleton ? singletone($constructor) : $constructor;

		copyNoReplace($constructor, $static);

		inherit($constructor, $parent, $prototype);

		$constructor.$name = $name;

		definitions[$name] = $constructor;
		namespace($name, $constructor);
	}
	var compiled = true;
	var loaded = false;
	var loading = {};
	var defHandles = {};
	var paths = {
		main : '/'
	};
	function define($name, $required, $definition) {
		compiled = false;
		var requiredRemaining = [];
		for ( var index = 0, length = $required.length; index < length; index++) {
			var requiredName = $required[index];
			if (!definitions[requiredName] && !defHandles[requiredName] && !loading[requiredName]) {
				requiredRemaining.push(requiredName);
			}
		}
		defHandles[$name] = $definition;
		if (requiredRemaining.length) {
			load(requiredRemaining, function() {
			});
		}
	}
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
	function compileClass($name) {
		var defHandle = defHandles[$name];
		delete defHandles[$name];
		if (defHandle) {
			defHandle(function($definition) {
				var $parent;
				if (definitions[$definition.$extends]) {
					$parent = definitions[$definition.$extends];
				} else {
					compileClass($definition.$extends);
					$parent = definitions[$definition.$extends];
				}
				assemble($name, $definition.$constructor, $definition.$prototype, $definition.$static, $parent, $definition.$singleton);
			});
		}

	}
	function nameToCss($name) {
		return $name.replace(/\./g, '-');
	}
	function nameToFileName($name, path) {
		if ($name.endsWith('.js')) {
			return path + name;
		} else {
			return path + $name.replace(/\./g, '/') + '.js';
		}
	}
	function CallbackQueue() {
		this.done = false;
		this.queue = [];
	}
	CallbackQueue.prototype = {
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
	function load(names, callback) {
		load.queue.add(callback);
		function finishLoad() {
			if (!Object.keys(loading).length) {
				compile();
			}
			load.queue.call();
			load.queue.clear();
		}
		if (names instanceof Array) {
			waiting += names.length;
			for ( var index = 0, length = names.length; index < length; index++) {
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
	function loadSingle($name, callback) {
		var path;
		var pathParts = $name.split('::');
		if (pathParts.length > 1) {
			path = paths[pathParts[0]] || paths.main;
			$name = pathParts[1];
		} else {
			path = paths.main;
		}
		if (!definitions[$name]) {
			var fileName = nameToFileName($name, path);
			var id = nameToCss($name);
			loading[$name] = true;
			loadScript(id, fileName, function() {
				delete loading[$name];
				callback();
			});
		} else {
			callback();
		}
	}
	function loadScript(id, fileName, callback) {
		var script = document.createElement('script');
		script.id = id;
		script.src = fileName;
		script.addEventListener('load', callback, false);
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	function loadPhaseComplete() {
		if (loaded) {
			onload.queue.call();
			onload.queue.clear();
		}
	}
	function onload(callback) {
		if (typeof (jQuery) != 'undefined') {
			jQuery(callback);
		} else {
			if (onload.queue) {
				onload.queue.add(callback);
			} else {
				onload.queue = new CallbackQueue();
				onload.queue.add(callback);
				window.addEventListener('load', function() {
					loaded = true;
					if (!Object.keys(loading).length) {
						compile();
					}
					if (compiled) {
						onload.queue.call();
						onload.queue.clear();
					}
				}, false);
			}
		}
	}
	onload.queue = null;

	Build.namespace = namespace;
	Build.copyReplace = copyReplace;
	Build.copyNoReplace = copyNoReplace;
	Build.inherit = inherit;
	Build.singleton = singleton;
	Build.definitions = definitions;
	Build.assemble = assemble;
	Build.paths = paths;
	Build.define = define;
	Build.nameToCss = nameToCss;
	Build.nameToFileName = nameToFileName;
	Build.load = load;
	Build.loadScript = loadScript;
	Build.CallbackQueue = CallbackQueue;
	Build.onload = onload;
	return Build;
})();

// Polyfills
(function() {
	if (typeof String.prototype.endsWith !== 'function') {
		String.prototype.endsWith = function(suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}
})();