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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/').get(homePage);
router.route('/signup').get(signupUser);
router.route('/login').get(loginUser);
router.route('/logout').get(logoutUser);




module.exports = router;
