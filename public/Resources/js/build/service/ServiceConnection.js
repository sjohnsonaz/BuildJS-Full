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

	function processRequest(request, success, error) {
		switch (Math.floor(request.status / 100)) {
		case 2:
			typeof success == 'function' ? success(request) : true;
			break;
		default:
			typeof error == 'function' ? error(request) : true;
			break;
		}
	}

	function Get(params) {
		params = params || {};
		call(verb, url, sync, user, password, unsent, opened, headersReceived, loading, function(request) {
			processRequest(request, success, error);
		});
	}

	ServiceConnection.prototype.call = call;
	return ServiceConnection;
});