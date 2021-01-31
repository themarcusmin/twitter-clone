const redis = require('redis');
const client = redis.createClient();

function createProfile(id, username, fullname) {
    return client.hmset('user:' + id,
        'id', id,
        'username', username,
        'fullname', fullname,
        'signup', Date.now(),
        'followers', 0,
        'following', 0,
        'tweetCount', 0,
    )
}

// handle + / - tweetCount
function incrTweet(id) {
    return client.hincrby('user:' + id, 'tweetCount', 1);
}

function decrTweet(id) {
    return client.hincrby('user:' + id, 'tweetCount', -1);
}

// handle follow / unfollow: note returns [false, false, false, false]
function follow(followerID, followeeID) {
    let currentTime = Date.now();
    return Promise.all([
        client.zadd('user:' + followerID + ':following', currentTime, followeeID),
        client.zadd('user:' + followeeID + ':followers', currentTime, followerID),
        client.hincrby('user:' + followerID, 'following', 1),
        client.hincrby('user:' + followeeID, 'followers', 1),
    ])
}

function unfollow(followerID, followeeID) {
    return Promise.all([
        client.zrem('user:' + followerID + ':following', followeeID),
        client.zrem('user:' + followeeID + ':followers', followerID),
        client.hincrby('user:' + followerID, 'following', -1),
        client.hincrby('user:' + followeeID, 'followers', -1),
    ])
}

// getters
function getProfileJSON(id) {
    return new Promise((resolve, reject) => {
        client.hgetall('user:' + id, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        })
    })
}

function checkFollowing(followerID, followeeID) {
    return new Promise((resolve, reject) => {
        client.zscore('user:' + followerID + ':following', followeeID.toString(), (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        })
    })
}

// fetch data on each followers
async function getGeneralDetails(requesterID, id) {
    const { fullname, username } = await getProfileJSON(id)
    // follower is the requester
    if (requesterID === id) {
        return { username, fullname, isRequester: true }
    }
    const followingStatus = await checkFollowing(requesterID, id)
    if (followingStatus) {
        return { username, fullname, followingStatus: true }
    }
    return { username, fullname, followingStatus: false }
}

// return an array of follwers' id
function getFollowers(id) {
    return new Promise((resolve, reject) => {
        client.zrevrange('user:' + id + ':followers', 0, -1, (err, value) => {
            if (err) reject(err);
            else resolve(value);
        })
    })
}

function getFollowing(id) {
    return new Promise((resolve, reject) => {
        client.zrevrange('user:' + id + ':following', 0, -1, (err, value) => {
            if (err) reject(err);
            else resolve(value);
        })
    })
}

module.exports = { createProfile, incrTweet, decrTweet, follow, unfollow, getProfileJSON, checkFollowing, getGeneralDetails, getFollowers, getFollowing };