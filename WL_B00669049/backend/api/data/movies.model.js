var mongoose = require('mongoose');

var discussionSchema = new mongoose.Schema({
    username: String,
    user_id: String,
    discussion_id: String,
    text: String,
    date : {
        type: Date,
        default : Date.now
    }
})

var movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true},
    tagline : String,
    overview : String,
    genres : [String],
    budget : Number,
    revenue : Number,
    status : String,
    runtime : Number,
    vote_average : Number,
    vote_count : Number,
    movieid : Number,
    img_url : String,
    discussions : [discussionSchema]
}, { usePushEach: true });

mongoose.model('Movies', movieSchema, 'movies');

