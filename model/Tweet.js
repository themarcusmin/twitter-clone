const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
    tweeter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 280,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})

const Tweet = mongoose.model("tweet", tweetSchema)

module.exports = Tweet