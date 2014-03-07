var build = build || {};
build.service = build.service || {};
build.service.ServiceConnection = (function() {
	function ServiceConnection(base) {
		this.base = base;
	}

	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	function getParameterNames(functionHandle) {
		var definition = functionHandle.toString().replace(STRIP_COMMENTS, '');
		return definition.slice(definition.indexOf('(') + 1, definition.indexOf(')')).match(/([^\s,]+)/g) || [];
	}

	function call(verb, url, sync, user, password, data, unsent, opened, headersReceived, loading, done) {
		var request = new XMLHttpRequest();
		if (sync) {
			request.open(verb, url, sync, user, password);
			request.send(data);
			done(request);
		} else {
			request.onreadystatechange = function() {
				switch (request.readyState) {
				case XMLHttpRequest.UNSENT:
					typeof unsent == 'function' ? unsent(request) : true;
					break;
				case XMLHttpRequest.OPENED:
					typeof opened == 'function' ? opened(request) : true;
					break;
				case XMLHttpRequest.HEADERS_RECEIVED:
					typeof headersReceived == 'function' ? headersReceived(request) : true;
					break;
				case XMLHttpRequest.LOADING:
					typeof loading == 'function' ? loading(request) : true;
					break;
				case XMLHttpRequest.DONE:
					typeof done == 'function' ? done(request) : true;
					break;
				}
			};
			request.open(verb, url, sync, user, password);
			request.send(data);
		}
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

	function run(parameters) {
		parameters = merge({
			verb : 'GET',
			url : '',
			sync : false,
			user : undefined,
			password : undefined,
			data : undefined,
			unsent : undefined,
			opened : undefined,
			headersReceived : undefined,
			loading : undefined,
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
		call(parameters.verb.toUpperCase(), parameters.buildUrl(), parameters.sync, parameters.user, parameters.password, parameters.data, parameters.unsent, parameters.opened, parameters.headersReceived, parameters.loading, parameters.done);
	}

	function Get(parameters) {
		parameters = parameters || {};
		parameters.verb = parameters.verb || 'GET';
		run(parameters);
	}

	function Post(parameters) {
		parameters = parameters || {};
		parameters.verb = parameters.verb || 'POST';
		run(parameters);
	}

	function Put(parameters) {
		parameters = parameters || {};
		parameters.verb = parameters.verb || 'PUT';
		run(parameters);
	}

	function Delete(parameters) {
		parameters = parameters || {};
		parameters.verb = parameters.verb || 'DELETE';
		run(parameters);
	}

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
					request += (request ? '&' : '?') + index + '=' + query[index];
				}
			}
			output += request;
		}
		return output;
	}

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
				override.error = override.error || values['error'];
				this.run(override);
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

if (Build) {
	Build.definitions['build.service.ServiceConnection'] = build.service.ServiceConnection;
}