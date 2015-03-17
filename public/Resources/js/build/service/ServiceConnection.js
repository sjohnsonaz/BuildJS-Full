/**
 * @class build.service.ServiceConnection
 */
var build = build || {};
build.service = build.service || {};
/**
 * @constructor
 */
/**
 * @property base
 */
build.service.ServiceConnection = (function() {
	function ServiceConnection(base) {
		this.base = base;
	}

	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	function getParameterNames(functionHandle) {
		var definition = functionHandle.toString().replace(STRIP_COMMENTS, '');
		return definition.slice(definition.indexOf('(') + 1, definition.indexOf(')')).match(/([^\s,]+)/g) || [];
	}

	/**
	 * @method call
	 * @param verb
	 * @param url
	 * @param sync
	 * @param user
	 * @param password
	 * @param data
	 * @param unsent
	 * @param opened
	 * @param headersReceived
	 * @param loading
	 * @param done
	 * @param upProgress
	 * @param upLoad
	 * @param upError
	 * @param upAbort
	 * @param downProgress
	 * @param downLoad
	 * @param downError
	 * @param downAbort
	 */
	function call(verb, url, sync, user, password, data, loadstart, upLoadStart, upProgress, upAbort, upError, upLoad, upTimeout, upLoadend, headersReceived, progress, abort, error, load, timeout, loadend) {
		/*
		 * TODO: Fix parameters for XMLHttpRequest.
		 * Remove unsent, it is never called.
		 * loadstart - all - loadstart or OPENED
		 * upLoadstart
		 * upProgress
		 * upAbort
		 * upError
		 * upLoad
		 * upTimout
		 * upLoadend
		 * headersReceived - all - HEADERS_RECEIVED
		 * progress - all - progress or LOADING
		 * abort
		 * error - all - error or DONE
		 * load - all - load or DONE
		 * timeout - all - timeout or DONE
		 * loadend - all - loadend or DONE (after other callbacks)
		 */
		var request = new XMLHttpRequest();
		if (sync) {
			request.open(verb, url, !sync, user, password);
			switch (verb) {
			case 'POST':
			case 'PUT':
				request.setRequestHeader('Content-Type', 'application/json');
				break;
			}
			request.send(JSON.stringify(data));
			done(request);
		} else {
			// If we have access to the modern XMLHttpRequest features
			if ('onprogress' in request) {
				request.onreadystatechange = function(event) {
					switch (request.readyState) {
					case XMLHttpRequest.UNSENT: // Never called
						break;
					case XMLHttpRequest.OPENED: // Synonymous with loadstart
						break;
					case XMLHttpRequest.HEADERS_RECEIVED:
						typeof headersReceived === 'function' ? headersReceived(event) : true;
						break;
					case XMLHttpRequest.LOADING: // Synonymous with progress
						break;
					case XMLHttpRequest.DONE: // Synonymous with [ abort, error, load, timeout ]
						break;
					}
				};
				typeof loadstart === 'function' ? request.onloadstart = loadstart : true;
				typeof upLoadStart === 'function' ? request.upload.onloadstart = upLoadStart : true;
				typeof upProgress === 'function' ? request.upload.onprogress = upProgress : true;
				typeof upAbort === 'function' ? request.upload.onabort = upAbort : true;
				typeof upError === 'function' ? request.upload.onerror = upError : true;
				typeof upLoad === 'function' ? request.upload.onload = upLoad : true;
				typeof upTimeout === 'function' ? request.upload.ontimeout = upTimeout : true;
				typeof upLoadend === 'function' ? request.upload.onloadend = upLoadend : true;
				typeof progress === 'function' ? request.onprogress = progress : true;
				typeof abort === 'function' ? request.onabort = abort : true;
				typeof error === 'function' ? request.onerror = error : true;
				typeof load === 'function' ? request.onload = load : true;
				typeof timeout === 'function' ? request.ontimeout = timeout : true;
				typeof loadend === 'function' ? request.onloadend = loadend : true;
			} else {
				request.onreadystatechange = function(event) {
					switch (request.readyState) {
					case XMLHttpRequest.UNSENT: // Never called
						break;
					case XMLHttpRequest.OPENED:
						typeof loadstart == 'function' ? loadstart(event) : true;
						break;
					case XMLHttpRequest.HEADERS_RECEIVED:
						typeof headersReceived == 'function' ? headersReceived(event) : true;
						break;
					case XMLHttpRequest.LOADING:
						typeof progress == 'function' ? progress(event) : true;
						break;
					case XMLHttpRequest.DONE:
						switch (Math.floor(request.status / 100)) {
						case 2:
							typeof load == 'function' ? load(event) : true;
							break;
						case 4:
							if (request.status == 408) {
								typeof timeout == 'function' ? timeout(event) : true;
							} else {
								typeof error == 'function' ? error(event) : true;
							}
							break;
						default:
							typeof error == 'function' ? error(event) : true;
							break;
						}
						typeof loadend == 'function' ? loadend(event) : true;
						break;
					}
				};
			}
			request.open(verb, url, !sync, user, password);
			switch (verb) {
			case 'POST':
			case 'PUT':
				request.setRequestHeader('Content-Type', 'application/json');
				break;
			}
			if (data instanceof File) {
				readFile(data, request);
			} else if (data instanceof FormData) {
				request.send(data);
			} else {
				request.send(JSON.stringify(data));
			}
		}
		return request;
	}

	function processRequest(request, dataType, success, error) {
		switch (Math.floor(request.status / 100)) {
		case 2:
			var data = request.responseText;
			if (dataType == 'detect') {
				dataType = request.responseType || 'json';
			}
			switch (dataType) {
			case 'json':
				data = data ? JSON.parse(data) : data;
				break;
			case 'text':
			default:
				break;
			}
			typeof success == 'function' ? success(data, request) : true;
			break;
		default:
			typeof error == 'function' ? error(request) : true;
			break;
		}
	}

	function merge(a, b) {
		if (b) {
			for ( var member in b) {
				if (b.hasOwnProperty(member)) {
					a[member] = b[member];
				}
			}
		}
		return a;
	}

	function readFile(file, request) {
		var reader = new FileReader();
		request.overrideMimeType('text/plain; charset=x-user-defined-binary');
		reader.onload = function(event) {
			request.send(event.target.result);
		};
		reader.readAsBinaryString(file);
		return reader;
	}

	/**
	 * @method run
	 * @param parameters
	 */
	function run(parameters) {
		// TODO: Add support for upload and download types.
		parameters = merge({
			verb : 'GET',
			url : '',
			sync : false,
			user : undefined,
			password : undefined,
			data : undefined,
			loadstart : undefined,
			upLoadStart : undefined,
			upProgress : undefined,
			upAbort : undefined,
			upError : undefined,
			upLoad : undefined,
			upTimeout : undefined,
			upLoadend : undefined,
			headersReceived : undefined,
			progress : undefined,
			abort : undefined,
			error : undefined,
			load : undefined,
			timeout : undefined,
			loadend : undefined,
			dataType : 'detect',
			done : function(request) {
				parameters.processRequest(request, parameters.dataType, parameters.success, parameters.error);
			},
			success : undefined,
			error : undefined,
			query : undefined,
			params : undefined,
			regex : undefined,
			buildUrl : function() {
				return formatUrl(parameters.url, parameters.params, parameters.query, parameters.regex);
			},
			processRequest : processRequest
		}, parameters);
		return call(parameters.verb.toUpperCase(), parameters.buildUrl(), parameters.sync, parameters.user, parameters.password, parameters.data, parameters.loadstart, parameters.upLoadStart, parameters.upProgress, parameters.upAbort,
				parameters.upError, parameters.upLoad, parameters.upTimeout, parameters.upLoadend, parameters.headersReceived, parameters.progress, parameters.abort, parameters.error, parameters.load, parameters.timeout, parameters.loadend);
	}

	/**
	 * @method Get
	 * @param parameters
	 */
	function Get(parameters) {
		parameters = parameters || {};
		parameters.verb = parameters.verb || 'GET';
		return run(parameters);
	}

	/**
	 * @method Post
	 * @param parameters
	 */
	function Post(parameters) {
		parameters = parameters || {};
		parameters.verb = parameters.verb || 'POST';
		return run(parameters);
	}

	/**
	 * @method Put
	 * @param parameters
	 */
	function Put(parameters) {
		parameters = parameters || {};
		parameters.verb = parameters.verb || 'PUT';
		return run(parameters);
	}

	/**
	 * @method Delete
	 * @param parameters
	 */
	function Delete(parameters) {
		parameters = parameters || {};
		parameters.verb = parameters.verb || 'DELETE';
		return run(parameters);
	}

	/**
	 * @method formatUrl
	 * @param url
	 * @param params
	 * @param query
	 * @param regex
	 * @returns {String}
	 */
	function formatUrl(url, params, query, regex) {
		var output;
		if (url) {
			output = url;
			if (params) {
				for ( var index in params) {
					if (params.hasOwnProperty(index)) {
						if (!regex) {
							regex = RegExp(':' + index + '(?=[/?#&]|$)', 'g');
						} else if (typeof regex === 'function') {
							regex = regex(index);
						} else {
							regex = RegExp('\\{' + index + '\\}', 'g');
						}
						output = output.replace(regex, params[index]);
					}
				}
			}
		} else {
			output = '';
		}
		if (query) {
			var request = '';
			for ( var index in query) {
				if (query.hasOwnProperty(index)) {
					if (query[index]) {
						request += (request ? '&' : '?') + index + '=' + query[index];
					}
				}
			}
			output += request;
		}
		return output;
	}

	/**
	 * @method addRoute
	 * @param parameters
	 */
	function addRoute(parameters) {
		parameters = merge({
			name : '',
			queryNames : undefined,
			paramNames : undefined,
			action : undefined
		}, parameters);
		var runner = undefined;
		if (parameters.action) {
			var names = getParameterNames(parameters.action);
			runner = function() {
				var override = parameters.action.apply(this, arguments) || {};
				override = merge(override, parameters);
				if (this.base) {
					var url = override.url;
					if (url) {
						if (!/^(f|ht)tps?:\/\//i.test(url)) {
							override.url = this.base + url;
						}
					} else {
						override.url = this.base;
					}
				}

				var values = {};
				for (var index = 0, length = names.length; index < length; index++) {
					values[names[index]] = arguments[index];
				}

				if (override.queryNames) {
					var query = override.query;
					override.query = {};
					for ( var index in query) {
						if (query.hasOwnProperty(index)) {
							override.query[index] = query[index];
						}
					}
					for (var index = 0, length = override.queryNames.length; index < length; index++) {
						var name = override.queryNames[index];
						override.query[name] = values[name];
					}
				}

				if (override.paramNames) {
					var params = override.params;
					override.params = {};
					for ( var index in params) {
						if (params.hasOwnProperty(index)) {
							override.params[index] = params[index];
						}
					}
					for (var index = 0, length = override.paramNames.length; index < length; index++) {
						var name = override.paramNames[index];
						override.params[name] = values[name];
					}
				}

				override.success = override.success || values['success'];
				override.success = typeof override.success === 'function' ? override.success.bind(this) : override.success;
				override.error = override.error || values['error'];
				override.error = typeof override.error === 'function' ? override.error.bind(this) : override.error;
				return this.run(override);
			}.bind(this);
			if (parameters.name) {
				this[parameters.name] = runner;
			}
		}
		return runner;
	}

	ServiceConnection.prototype.call = call;
	ServiceConnection.prototype.run = run;
	ServiceConnection.prototype.Get = Get;
	ServiceConnection.prototype.Post = Post;
	ServiceConnection.prototype.Put = Put;
	ServiceConnection.prototype.Delete = Delete;
	ServiceConnection.prototype.formatUrl = formatUrl;
	ServiceConnection.prototype.addRoute = addRoute;
	return ServiceConnection;
})();

if (typeof Build !== 'undefined') {
	Build.register('build.service.ServiceConnection', build.service.ServiceConnection);
}