var bld = bld || {};
var Build = bld.Build = (function() {
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
			$child.prototype = Object.create($parent.prototype, $prototype);
			$child.prototype.constructor = $child;

			copyNoReplace($child, $parent);

			$child.$parent = $parent;

			$child.prototype.$super = $child.prototype.$super || function() {
				arguments.callee.caller.apply(this, Array.prototype.slice.call(arguments));
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
		for ( var index = 0, length = requiredRemaining.length; index < length; index++) {
			var name = requiredRemaining[index];
			loading[name] = true;
		}
		if (requiredRemaining.length) {
			load(requiredRemaining, function() {
				for ( var index = 0, length = requiredRemaining.length; index < length; index++) {
					var name = requiredRemaining[index];
					delete loading[name];
				}
				if (!Object.keys(loading).length) {
					compile();
				}
			});
		} else {
			compile();
		}
	}
	function compile(callback) {
		function define($definition) {
			assemble(name, $definition.$constructor, $definition.$prototype, $definition.$static, $definition.$parent, $definition.$singleton);
		}
		for ( var name in defHandles) {
			defHandles[name](define);
		}
		defHandles = {};
		compiled = true;
		loadPhaseComplete();
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
	function load(names, callback) {
		if (names instanceof Array) {
			var waiting = names.length;
			for ( var index = 0, length = names.length; index < length; index++) {
				var $name = names[index];
				loadSingle($name, function() {
					waiting--;
					if (!waiting) {
						callback();
					}
				});
			}
		} else {
			loadSingle(names, callback);
		}
	}
	function loadSingle($name, callback) {
		var path;
		var pathParts = $name.split('::');
		if (pathParts.length > 1) {
			path = paths[pathParts[0]] || paths.main;
			$name = pathParts[1];
		} else {
			path = paths.main;
		}
		var fileName = nameToFileName($name, path);
		var id = nameToCss($name);
		loadScript(id, fileName, callback);
	}
	function loadScript(id, fileName, callback) {
		var script = document.createElement('script');
		script.id = id;
		script.src = fileName;
		script.addEventListener('load', callback, false);
		document.getElementsByTagName("head")[0].appendChild(script);
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
				for ( var index = 0, length = this.queue.length; index < length; index++) {
					this.queue[index]();
				}
				this.done = true;
			}
		}
	};
	function loadPhaseComplete() {
		if (loaded) {
			onload.queue.call();
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
					if (compiled) {
						onload.queue.call();
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