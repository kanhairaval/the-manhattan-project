const router = require('express').Router();

const {
  homePage,
  signupUser,
  loginUser,
  logoutUser,
  donation,
  // saveScore,
  // profilePage,
  // updateUser,
  // deleteUser,  
} = require('../../controllers/user-controller');

const {authMiddleware} = require('../../utils/auth');

router.route('/').get(authMiddleware, homePage);
router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/create-payment-intent').post(donation);
router.route('/questions').post(authMiddleware, saveScore);
// router.route('/profile').get(authMiddleware, homePage);





module.exports = router;
