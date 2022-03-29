const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const passportJWT = require('../middleware/passportJWT');
const controller = require('../controller/tb_section_controller');

router.get('/', [passportJWT.isLogin], controller.index);
router.post(
  '/',
  [body('name').not().isEmpty().withMessage('Please check field Name')],
  controller.insert
);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

module.exports = router;
