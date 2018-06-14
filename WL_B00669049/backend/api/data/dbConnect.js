var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbURL = 'mongodb://localhost:27017/movieDB';

mongoose.connect(dbURL);

mongoose.connection.on('connected', function() {
	console.log("Mongoose connected to " + dbURL);
});

mongoose.connection.on('disconnected', function() {
	console.log("Mongoose disconnected" );
});

mongoose.connection.on('error', function(err) {
	console.log("Mongoose connection error " + err);
});

require('./movies.model.js');