const router = require('express').Router();

const {
  homePage,
  signupUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,  
} = require('../../controllers/user-controller');

const {authMiddleware} = require('../../utils/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/').get(homePage);
router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/user').put(authMiddleware, updateUser);
router.route('/user').delete(authMiddleware, deleteUser);



module.exports = router;
