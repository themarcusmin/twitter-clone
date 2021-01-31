const User = require("../model/User");
const { getProfileJSON, checkFollowing, follow, unfollow, getFollowers, getFollowing, getGeneralDetails } = require('../model/Profile')

// based on username, send json of profile data and tweets
module.exports.profile_get = async (req, res) => {
    const requesterID = req.session.userID;
    // retrieve userID by filtering params.username
    const user = await User.findOne({ username: req.params.username });
    // username does not exist
    if (user === null || user === undefined) {
        res.status(400).json({ error: 'User Not Found' });
    } else {
        const { _id } = user;
        // get json from redis
        const profileJSON = await getProfileJSON(_id);
        // 2 types of response: own profile || other profile
        if (requesterID === _id) {
            res.status(200).json(profileJSON);
        }
        // add following status for viewing other profile
        else {
            const requesterIsFollowing = await checkFollowing(requesterID, _id);
            res.status(200).json({ ...profileJSON, requesterIsFollowing });
        }
    }
}

// send json of profile likes
module.exports.profile_likes_get = async (req, res) => {

}

// based on username, send fullname
module.exports.fullname_get = async (req, res) => {
    // retrieve fullname and username from params.username
    const { _id, fullname, username } = await User.findOne({ username: req.params.username });
    res.status(200).json({ _id, fullname, username });
}

module.exports.post_follow_someone = async (req, res) => {
    const requesterID = req.session.userID;
    const username = req.params.username;
    const { followeeID } = req.body;
    console.log('followeeID is: ', followeeID);
    console.log('requesterID is: ', requesterID);
    // execute follow function & send json
    follow(requesterID, followeeID)
        .then(() => res.status(200).json({ success: `Following ${username}` }))
}

module.exports.post_unfollow_someone = async (req, res) => {
    const requesterID = req.session.userID;
    const username = req.params.username;
    const { followeeID } = req.body;
    // execute unfollow function & send json
    unfollow(requesterID, followeeID)
        .then(() => res.status(200).json({ success: `Unfollowing ${username}` }))
}

module.exports.get_followers = async (req, res) => {
    const requesterID = req.session.userID;
    // retrieve id from params.username
    const { _id } = await User.findOne({ username: req.params.username });
    // fetch a array of followers' id
    const allFollowers = await getFollowers(_id);
    Promise.all(allFollowers.map(id => getGeneralDetails(requesterID, id)))
        .then(result => {
            res.status(200).json({ followers: result })
        })
}

module.exports.get_following = async (req, res) => {
    const requesterID = req.session.userID;
    // retrieve id from params.username
    const { _id } = await User.findOne({ username: req.params.username });
    // fetch a array of following' id
    const allFollowing = await getFollowing(_id);
    Promise.all(allFollowing.map(id => getGeneralDetails(requesterID, id)))
        .then(result => {
            res.status(200).json({ following: result })
        })
}