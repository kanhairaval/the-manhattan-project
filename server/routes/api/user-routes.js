const router = require('express').Router();

const {
  homePage,
  signupUser,
  loginUser,
  logoutUser,
  // updateUser,
  // deleteUser,  
} = require('../../controllers/user-controller');

const {authMiddleware} = require('../../utils/auth');

router.route('/').get(authMiddleware, homePage);
router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);




module.exports = router;
