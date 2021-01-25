const router = require("express").Router();
const tweetController = require("../controllers/tweetController");

router.post('/api/tweet/create', tweetController.tweet_post)
// router.post('/api/auth/login', authController.login_post)
// router.get('/api/auth/logout', authController.logout_get)
// router.get('/api/auth/currentUser', authController.currentUser_get)

module.exports = router;