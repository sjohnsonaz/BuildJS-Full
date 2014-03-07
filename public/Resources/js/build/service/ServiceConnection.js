var build = build || {};
build.service = build.service || {};
build.service.ServiceConnection = (function() {
	function ServiceConnection() {

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
				data = JSON.parse(data);
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
			buildUrl : function() {
				return parameters.url;
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

	function addRoute(parameters) {
		parameters = merge({
			name : '',
			route : '',
			query : undefined,
			params : undefined,
			action : undefined
		}, parameters);
		var runner = undefined;
		if (parameters.action) {
			var names = getParameterNames(parameters.action);
			runner = function() {
				parameters.action.apply(this, arguments);

				var values = {};
				for (var index = 0, length = names.length; index < length; index++) {
					values[names[index]] = arguments[index];
				}

				var query = {};
				if (parameters.query) {
					for (var index = 0, length = parameters.query.length; index < length; index++) {
						var name = parameters.query[index];
						query[name] = values[name];
					}
				}
				parameters.query = query;

				var params = {};
				if (parameters.params) {
					for (var index = 0, length = parameters.params.length; index < length; index++) {
						var name = parameters.params[index];
						params[name] = values[name];
					}
				}
				parameters.params = params;

				parameters.success = parameters.success || values['success'];
				parameters.error = parameters.error || values['error'];
				this.run(parameters);
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
	ServiceConnection.prototype.addRoute = addRoute;
	return ServiceConnection;
})();

if (Build) {
	Build.definitions['build.service.ServiceConnection'] = build.service.ServiceConnection;
}