const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

//Protect route by passport
const passportJWT = require('../middleware/passportJWT');

//for check rold === "admin" module
const checkAdmin = require('../middleware/checkAdmin');

const userController = require('../controller/tb_user_controller');

router.get('/', userController.index);
router.post(
  '/register',
  [
    body('f_name').not().isEmpty().withMessage('Please check field First Name'),
    body('l_name').not().isEmpty().withMessage('Please check field Last Name'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Please check field Email')
      .isEmail()
      .withMessage('Please check Type of Email'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Please check field Password')
      .isLength({ min: 8 })
      .withMessage('Please set Password than 8'),
    body('role_id').not().isEmpty().withMessage('Please check field Role'),
  ],
  userController.Register
);
//Login
router.post(
  '/login',
  [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Please check field Email')
      .isEmail()
      .withMessage('Please check Type of Email'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Please check field Password')
      .isLength({ min: 8 })
      .withMessage('Please set Password than 8'),
    body('role_id').not().isEmpty().withMessage('Please check field Role'),
  ],
  userController.Login
);
//Get Profile by ID
router.get('/profile/:id', userController.ProfileByID);
//Get Profile by Token
router.get('/me', [passportJWT.isLogin], userController.ProfileMe);
// router.get('/me', [passportJWT.isLogin], userController.me);
router.get('/search', userController.search);
router.delete('/:id', userController.delete);
router.put('/:id', userController.update);
router.get('/logout', userController.logout);

module.exports = router;
