const User = require("../model/User");
const { getProfileJSON } = require('../model/Profile')

// based on username, return json of profile + its recent tweets
module.exports.profile_get = async (req, res) => {
    // retrieve userID by filtering params.username
    const { _id } = await User.findOne({ username: req.params.username });
    const profileJSON = await getProfileJSON(_id);
    res.status(200).json(profileJSON);
}

module.exports.profile_likes_get = async (req, res) => {

}