require('./api/data/dbConnect.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

app.set('port', 3000);

app.use(function(req, res, next)
{
	console.log(req.method, req.url);
	next();
});

app.use (function (req, res, next) { 
	res.header('Access-Control-Allow-Origin', '*'); 
	res.header('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept');
	next(); 
});

app.use(express.static(path.join( __dirname, 'public')));
app.use(bodyParser.urlencoded( { 'extended' : false } ));
app.use('/api', routes);

var server = app.listen(app.get('port'), function() {
var port = server.address().port;
	console.log("Express listening on port " + port);
});
console.log("Starting the server");