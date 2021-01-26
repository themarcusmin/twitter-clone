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
    return Promise.all([
        client.hincrby('user:' + followerID, 'following', 1),
        client.hincrby('user:' + followeeID, 'followers', 1),
    ])
}

function unfollow(followerID, followeeID) {
    return Promise.all([
        client.hincrby('user:' + followerID, 'following', -1),
        client.hincrby('user:' + followeeID, 'followers', -1),
    ])
}

// Getter
function getProfileJSON(id) {
    return client.hgetall('user:' + id, (err, value) => {
        if (err) throw err;
        console.log(value);
    })
}

module.exports = { createProfile, incrTweet, decrTweet, follow, unfollow, getProfileJSON };