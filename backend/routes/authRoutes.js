const router = require("express").Router();
const authController = require("../controllers/authController");

router.post('/api/auth/signup', authController.signup_post)
router.post('/api/auth/login', authController.login_post)
router.get('/api/auth/logout', authController.logout_get)
router.get('/api/auth/currentUser', authController.currentUser_get)

module.exports = router;