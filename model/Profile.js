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

// handle follow / unfollow
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

// Getter
async function getProfileJSON(id) {
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

module.exports = { createProfile, incrTweet, decrTweet, follow, unfollow, getProfileJSON };