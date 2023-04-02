const router = require('express').Router();

const {
  homePage,
  signupUser,
  loginUser,
  logoutUser,
  donation,
  // updateUser,
  // deleteUser,  
} = require('../../controllers/user-controller');

const {authMiddleware} = require('../../utils/auth');

router.route('/').get(authMiddleware, homePage);
router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/create-payment-intent').post(donation);




module.exports = router;
