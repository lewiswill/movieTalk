var express = require('express');
var router = express.Router();

var moviesController = require('../controllers/movies.controllers.js');
var discussionsController = require('../controllers/discussions.controllers.js');

router
    .route('/movies')
	.get(moviesController.moviesGetRandom)
	.post(moviesController.moviesAddOne);

router
    .route('/movies/title/:movieTitle')
    .get(moviesController.moviesFindByTitle);

router
	.route('/movies/:movieID')
	.get(moviesController.moviesGetOne)
	.put(moviesController.moviesUpdateOne)
	.delete(moviesController.moviesDeleteOne);

router
    .route('/movies/:movieID/discussions')
    .get(discussionsController.discussionsGetAll)
    .post(discussionsController.discussionsAddOne);

router
    .route('/movies/:movieID/discussions/:reviewID')
    .get(discussionsController.discussionsGetOne)
    .put(discussionsController.discussionsUpdateOne)
    .delete(discussionsController.discussionsDeleteOne);

/*
router
	.route('/fixDB')
	.get(moviesController.fixDB);

router
	.route('/addDiscussionIDs')
	.get(moviesController.addDiscussionIDs);

router
    .route('/checkReviews')
    .get(moviesController.checkReviews);

router
    .route('/fixReviews')
    .get(moviesController.fixReviews);
*/

module.exports = router;