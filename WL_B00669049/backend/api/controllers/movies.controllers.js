var mongoose = require('mongoose');
var Movie = mongoose.model('Movies');

var splitArray = function(input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};
module.exports.moviesGetRandom = function(req, res) {
	var start =  Math.floor((Math.random() * 100) + 1);
	var number = 4;
	if (req.query && req.query.start) {
		start = parseInt(req.query.start);
	}
	if (req.query && req.query.number) {
		number = parseInt(req.query.number);
	}
	Movie
		.find()
		.skip(start)
		.limit(number)
		.exec(function(err, docs) {
			if (err) {
			console.log("Error finding movies");
				res
				.status(500)
				.json(err)
			} else {
					console.log("Retrieved data for " +
					docs.length + " movies");
				res
					.status(200)
					.json(docs);
			}
		});
};

module.exports.moviesFindByTitle = function(req, res) {
	var movieTitle = req.params.movieTitle;
	console.log("GET THE movie title " + movieTitle);
	var start = 0;
	var number = 6;
	if (req.query && req.query.start) {
		start = parseInt(req.query.start);
	}
	if (req.query && req.query.number) {
		number = parseInt(req.query.number);
	}
	Movie
		.find({'title' : { '$regex': movieTitle, $options: '(?i)' } }) // (?i) removes case sensitivity
		.skip(start)
		.limit(number)
		.exec(function(err, docs) {
			if (err) {
			console.log("Error finding movies");
				res
				.status(500)
				.json(err)
			} else {
					console.log("Retrieved data for " +
					docs.length + " movies");
				res
					.status(200)
					.json(docs);
			}
		});
};

module.exports.moviesGetOne = function(req, res) {
	var movieID = req.params.movieID;
	console.log("GET movie " + movieID);

	Movie
	.findById(movieID)
	.exec(function(err, doc) {
		var response = {
			status : 200,
			message : doc
		};
		if (err) {
			response.status = 500;
			response.message = err
		} else if (!doc) {
			response.status = 404;
			response.message = { "message": "Movie ID not found" };
		}
		res
			.status(response.status)
			.json(response.message);
	});
};

module.exports.moviesAddOne = function(req, res) {
    Movie
        .create({
            name : req.body.name,
            discussion_count : 0,
            categories : splitArray(req.body.categories),
            discussions : [],
        	}, function(err, newMovie) {
				if (err) {
					console.log("Error creating movie");
					res
						.status(400)
						.json(err);
				} else {
					res
						.status(201)
						.json(newMovie);
				}
			});
};

module.exports.moviesUpdateOne = function(req, res) {
    var movieID = req.params.movieID;
    console.log("GET Movie " + movieID);

    Movie
        .findById(movieID)
        .select("-discussions")
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message" : "Movie ID not found"
                };
            }
            console.log("Found movie " + movieID);
            if (response.status != 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.city = req.body.city;

                doc.save(function(err, updatedMovie) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
			}
        });
};

module.exports.moviesDeleteOne = function(req, res) {
    var movieID = req.params.movieID;
    Movie
        .findByIdAndRemove(movieID)
        .exec(function(err, thisMovie) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Movie " + movieID
                    + " deleted");
                res
                    .status(204)
                    .json();
            }
        })
};

module.exports.fixDatabase = function(req, res) {
	var db = dbConnect.get();
	var collection = db.collection('movies')

	collection
	.find()
	.toArray(function(err, docs) {
		for (var i = 0; i< docs.length; i++) {
			movies = docs[i];
			_id = business._id;

			collection.moviesUpdateOne
		}
	})

}
/*
module.exports.fixDB = function(req, res) {
    Movie
        .find()
        .exec(function(err, docs) {
            if (err) {
                console.log("Error finding Movies");
                res
                    .status(500)
                    .json(err)
            } else {
                console.log("Retrieved data for " + docs.length + " Movies");
                for(var i = 0; i < docs.length; i ++) {
                    var thisMovie = docs[i];
		    this.Movie.XXXXX = "this is how you change shit";
                    thisMovie.save();
                }
                res
                    .status(200)
                    .json(docs);
            }
        });
};

module.exports.addDiscussionIDs = function(req, res) {
	var db = dbConnect.get();
	var collection = db.collection('movies');

	collection
		.find()
		.toArray(function(err, docs) {
			for (var i = 0; i < docs.length; i++) {
				movieID = docs[i]._id;
				if (docs[i].discussions) {
					discussions = docs[i].discussions;
					for (var thisDiscussion = 0; thisDiscussion < discussions.length; thisDiscussion++) {
						discussionID = discussions[thisDiscussion].discussion_id;
						collection.update (
							{ "_id" : movieID, "discussions.discussion_id" : discussionID },
							{ $set : {
								"discussions.$._id" : ObjectId() }
							}
						);
					}
				}
			}
			res
				.status(200)
				.json( { "Message" : "Discussion IDs added"});
		})
};

module.exports.checkDiscussions = function (req, res) {
	var db = dbConnect.get();
	var collection = db.collection('movies');

	collection
		.find()
		.toArray(function (err, docs) {
			response = [];
			for (var i = 0; i < docs.length; i++) {
				if (docs[i].discussion_count != docs[i].discussions.length) {
					response.push( {
						'id' : docs[i]._id,
						'discussion_count' : docs[i].discussion_count,
						'actual_discussions' : docs[i].discussions.length
					})
				}
			}
			res
				.status(200)
				.json( response );
		})
};

module.exports.fixDiscussions = function (req, res) {
    var db = dbConnect.get();
    var collection = db.collection('movies');

    collection
        .find()
        .toArray(function (err, docs) {
            response = [];
            for (var i = 0; i < docs.length; i++) {
                if (docs[i].discussion_count != docs[i].discussions.length) {
                    collection.update (
                    	{ '_id' : docs[i]._id },
                        { $set: {
                                	"discussion_count" : docs[i].discussions.length
								}
                        });
                }
            }
            res
                .status(200)
                .json( { "Message" : "Database updated" } );
        })
};
*/