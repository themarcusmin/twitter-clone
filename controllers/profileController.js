const User = require("../model/User");
const { getProfileJSON } = require('../model/Profile')

// based on username, send json of profile data and tweets
module.exports.profile_get = async (req, res) => {
    // retrieve userID by filtering params.username
    const user = await User.findOne({ username: req.params.username });
    // username does not exist
    if (user === null || user === undefined) {
        res.status(400).json({ error: 'User Not Found' });
    } else {
        const { _id } = user;
        // get json from redis
        const profileJSON = await getProfileJSON(_id);
        res.status(200).json(profileJSON);
    }
}

// send json of profile likes
module.exports.profile_likes_get = async (req, res) => {

}

// based on username, send fullname
module.exports.fullname_get = async (req, res) => {
    // retrieve fullname and username by filtering params.username
    const { _id, fullname, username } = await User.findOne({ username: req.params.username });
    res.status(200).json({ _id, fullname, username });
}

module.exports.post_follow_someone = async (req, res) => {

}

module.exports.post_unfollow_someone = async (req, res) => {

}