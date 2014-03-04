var cluster = require('cluster');
var os = require('os');
var processors = os.cpus().length;
if ( cluster.isMaster ) {
	for ( var i = 0; i < processors; i++) {
		cluster.fork();
	}
} else {
	require('./server');
}