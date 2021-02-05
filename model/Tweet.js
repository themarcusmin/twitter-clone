const redis = require('redis');
const client = redis.createClient();
const { v4: uuidv4 } = require('uuid')
const { incrTweet, decrTweet, getFollowers } = require('./Profile')

/**
 * Use Case: user posts a tweet
 * - save tweet data
 * - increment user's tweetcount
 * - add tweetID to global timeline
 * - add tweetID to user's profile timeline
 * - query all followers' userID
 * - add tweetID to followers' + user's home timeline
 */
function postTweet(userID, body, username, fullname) {
    const tweetID = uuidv4();
    const currentTime = Date.now();
    console.log("tweetID is ", tweetID)
    return Promise.all([
        saveTweet(tweetID, body, username, fullname),
        incrTweet(userID),
        addToGlobalTimeline(currentTime, tweetID),
        addToProfileTimeline(userID, currentTime, tweetID),
        getFollowers(userID).then(followers => {
            addToHomeTimeline([...followers, userID], currentTime, tweetID)
        })
    ])
}

function saveTweet(tweetID, body, username, fullname) {
    return client.hmset('tweet:' + tweetID,
        'body', body,
        'createdAt', Date.now(),
        'username', username,
        'fullname', fullname,
        'likesCount', 0,
    );
}

function addToGlobalTimeline(currentTime, tweetID) {
    return client.zadd('globalTimeline', currentTime, tweetID);
}

function addToProfileTimeline(userID, currentTime, tweetID) {
    return client.zadd('user:' + userID + ':profileTimeline', currentTime, tweetID);
}

function addToHomeTimeline(userID_array, currentTime, tweetID) {
    return userID_array.forEach(userID => {
        client.zadd('user:' + userID + ':homeTimeline', currentTime, tweetID)
    })
}

/**
 * Use Case: user deletes a tweet
 * - delete tweet data
 * - decrement user's tweetcount
 * - delete tweetID from global timeline
 * - delete tweetID from user's profile timeline
 * - query all followers' userID
 * - delete tweetID from followers' + user's home timeline
 * Note:
 * - users who unfollowed will have the deleted tweetID or users who have the deleted tweets liked
 *   will have tweetID but querying tweet data will result in null
 */
function postDeleteTweet(tweetID, userID) {
    return Promise.all([
        deleteTweet(tweetID),
        decrTweet(userID),
        removeFromGlobalTimeline(tweetID),
        removeFromProfileTimeline(userID, tweetID),
        getFollowers(userID).then(followers => {
            removeFromHomeTimeline([...followers, userID], tweetID)
        })
    ])
}

function deleteTweet(tweetID) {
    return client.del('tweet:' + tweetID);
}

function removeFromGlobalTimeline(tweetID) {
    return client.zrem('globalTimeline', tweetID);
}

function removeFromProfileTimeline(userID, tweetID) {
    return client.zrem('user:' + userID + ':profileTimeline', tweetID);
}

function removeFromHomeTimeline(userID_array, tweetID) {
    return userID_array.forEach(userID => {
        client.zrem('user:' + userID + ':homeTimeline', tweetID)
    })
}

/**
 * Use Case: user likes a tweet
 * - increment tweet's likeCount
 * - add tweetid to user's likeTimeline
 * Note:
 * - To be implemented: realtime publish new likes to subscribing timeline
 */
function postLikeTweet(tweetID, userID) {
    const currentTime = Date.now();
    return Promise.all([
        incrTweetLikeCount(tweetID),
        addToLikeTimeline(userID, currentTime, tweetID)
    ])
}

function incrTweetLikeCount(tweetID) {
    return client.hincrby('tweet:' + tweetID, 'likesCount', 1);
}

function addToLikeTimeline(userID, currentTime, tweetID) {
    return client.zadd('user:' + userID + ':likeTimeline', currentTime, tweetID);
}

/**
 * Use Case: user unlikes a tweet
 * - decrement tweet's likeCount
 * - delete tweetid from user's likeTimeline
 */
function postUnlikeTweet(tweetID, userID) {
    return Promise.all([
        decrTweetLikeCount(tweetID),
        removeFromLikeTimeline(userID, tweetID)
    ])
}

function decrTweetLikeCount(tweetID) {
    return client.hincrby('tweet:' + tweetID, 'likesCount', -1);
}

function removeFromLikeTimeline(userID, tweetID) {
    return client.zrem('user:' + userID + ':likeTimeline', tweetID);
}

module.exports = { postTweet, postDeleteTweet, postLikeTweet, postUnlikeTweet };