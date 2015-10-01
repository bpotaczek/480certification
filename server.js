var WebSocket = require('ws').Server
	, express = require('express')
	, app = express()
	, path = require('path');

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 0}));

 app.get('/xml', function(req, res) {
 	res.sendfile('public/test.xml');
 });

 var server = app.listen(8080, function() {
 	console.log('listening on port 8080;')
 });

var ws = new WebSocket({server:server});

ws.on('connection', function connection(w){
	console.log('Connected');
	w.send('Sample');
	w.on('message', function incoming(message) {
		console.log(message);
	});
});

