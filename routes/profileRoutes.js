const router = require("express").Router();
const profileController = require("../controllers/profileController");

router.get('/api/profile/:username', profileController.profile_get)
router.get('/api/profile/:username/fullname', profileController.fullname_get)
router.get('/api/profile/likes', profileController.profile_likes_get)

router.post('/api/profile/:username/follow', profileController.post_follow_someone)
router.post('/api/profile/:username/unfollow', profileController.post_unfollow_someone)

module.exports = router;