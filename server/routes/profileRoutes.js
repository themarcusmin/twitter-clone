const router = require("express").Router();
const profileController = require("../controllers/profileController");

router.get('/api/profile/:username', profileController.profile_get)
router.get('/api/profile/likes', profileController.profile_likes_get)

module.exports = router;