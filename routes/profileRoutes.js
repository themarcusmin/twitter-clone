const router = require("express").Router();
const profileController = require("../controllers/profileController");

// Profile View
router.get('/api/profile/:username', profileController.profile_get)
router.get('/api/profile/:username/fullname', profileController.fullname_get)
router.get('/api/profile/:username/likes', profileController.profile_likes_get)
// Follow or Unfollow Action
router.post('/api/profile/:username/follow', profileController.post_follow_someone)
router.post('/api/profile/:username/unfollow', profileController.post_unfollow_someone)
// Following or Followers View
router.get('/api/profile/:username/followers', profileController.get_followers)
router.get('/api/profile/:username/following', profileController.get_following)

module.exports = router;