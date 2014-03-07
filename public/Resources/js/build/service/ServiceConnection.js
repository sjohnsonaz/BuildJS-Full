var build = build || {};
build.service = build.service || {};
build.service.ServiceConnection = (function() {
	function ServiceConnection() {

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
				dataType = 'json';
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

	function run(params) {
		params = merge({
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
				params.processRequest(request, params.dataType, params.success, params.error);
			},
			success : undefined,
			error : undefined,
			buildUrl : function() {
				return params.url;
			},
			processRequest : processRequest
		}, params);
		call(params.verb.toUpperCase(), params.buildUrl(), params.sync, params.user, params.password, params.data, params.unsent, params.opened, params.headersReceived, params.loading, params.done);
	}

	function Get(params) {
		params = params || {};
		params.verb = params.verb || 'GET';
		run(params);
	}

	function Post(params) {
		params = params || {};
		params.verb = params.verb || 'POST';
		run(params);
	}

	function Put(params) {
		params = params || {};
		params.verb = params.verb || 'PUT';
		run(params);
	}

	function Delete(params) {
		params = params || {};
		params.verb = params.verb || 'DELETE';
		run(params);
	}

	function addRoute(params) {
		params = merge({
			route : ''
		}, params);

	}

	ServiceConnection.prototype.call = call;
	ServiceConnection.prototype.run = run;
	ServiceConnection.prototype.Get = Get;
	ServiceConnection.prototype.Post = Post;
	ServiceConnection.prototype.Put = Put;
	ServiceConnection.prototype.Delete = Delete;
	return ServiceConnection;
})();

if (Build) {
	Build.definitions['build.service.ServiceConnection'] = build.service.ServiceConnection;
}