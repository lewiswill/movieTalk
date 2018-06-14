var mongoose = require('mongoose');
var Movie = mongoose.model('Movies');

var addDiscussion = function(req, res, thisMovie) {
    thisMovie.discussions.push( {
        username : req.body.username,
        text : req.body.text,
    });

    thisMovie.save(function(err, updatedMovie) {
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            var newDiscussionPosition = updatedMovie.discussions.length - 1;
            var newDiscussion = updatedMovie.discussions[newDiscussionPosition];
            res
                .status(201)
                .json(newDiscussion);
        }
    });
};

module.exports.discussionsGetAll = function(req, res) {
    var movieID = req.params.movieID;
    console.log("GET the discussions for movie NOW " + movieID);

    Movie
        .findById(movieID)
        .select("discussions")
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : []
            };
            if (err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message" : "Movie ID not found" + movieID
                };
            } else {
                response.message = doc.discussions ?
                    doc.discussions : []
            }
            console.log("Found movie " + movieID);
            res
                .status(response.status)
                .json(response.message);
        });
};

module.exports.discussionsGetOne = function(req, res) {
	var movieID = req.params.movieID;
	var reviewID = req.params.reviewID;
	console.log("GET reviewID " + reviewID);
	
	Movie
		.findById(movieID)
		.select("discussions")
		.exec(function(err, doc) {
			var review = doc.discussions.id(reviewID);
			console.log("Found review " + reviewID);
			res
				.status(200)
				.json(review);
		});
};

module.exports.discussionsAddOne = function(req, res) {
    var movieID = req.params.movieID;
    console.log("GET the DISCUSSIONS for MOVIE with ID: " + movieID);

    Movie
        .findById(movieID)
        .select("discussions")
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : []
            };
            if (err) {
                console.log("Error finding MOVIE");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                addDiscussion(req, res, doc);
                response.status = 404;
                response.message = {
                    "message" : "Movie ID not found" +
                    movieID
                };
            }
            if (doc) {
                addDiscussion(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });
};

module.exports.discussionsUpdateOne = function(req, res) {
    var movieID = req.params.movieID;
    var reviewID = req.params.reviewID;

    Movie
        .findById(movieID)
        .select('discussions')
        .exec(function(err, thisMovie) {
            var thisDiscussion;
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            } else if(!thisMovie) {
                console.log("Movie ID not found", id);
                response.status = 404;
                response.message = {
                    "message" : "Movie ID not found " + id
                };
            } else {
                // get review and edit
                thisDiscussion = thisMovie.discussions.id(reviewID);
                if (!thisDiscussion) {
                    response.status = 404;
                    response.message = {
                        "message": "Discussion ID not found " + reviewId
                    };
                }
                // now check for an error and save
                if (response.status !== 200) {
                    res
                        .status(response.status)
                        .json(response.message);
                } else {
                    thisDiscussion.username = req.body.username;
                    thisDiscussion.text = req.body.text;
                    thisDiscussion.stars = parseInt(req.body.stars);
                    thisMovie.save(function (err, updatedMovie) {
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
            }
        });
};

module.exports.discussionsDeleteOne = function(req, res) {
    var movieID = req.params.movieID;
    var reviewID = req.params.reviewID;

    Movie
        .findById(movieID)
        .select('discussions')
        .exec(function(err, thisMovie) {
            var thisDiscussion;
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            } else if(!thisMovie) {
                console.log("Movie ID not found", id);
                response.status = 404;
                response.message = {
                    "message" : "Movie ID not found " + id
                };
            } else {
                // get review and edit
                thisDiscussion = thisMovie.discussions.id(reviewID);
                if (!thisDiscussion) {
                    response.status = 404;
                    response.message = {
                        "message": "Discussion ID not found " + reviewId
                    };
                }
                // now check for an error and save
                if (response.status !== 200) {
                    res
                        .status(response.status)
                        .json(response.message);
                } else {
                    thisMovie.discussions.id(reviewID).remove();
                    thisMovie.save(function (err, updatedMovie) {
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
            }
        });
};