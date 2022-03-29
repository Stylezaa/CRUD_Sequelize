const { body } = require('express-validator');
const express = require('express');
const router = express.Router();

const controller = require('../controller/tb_role_controller');

router.get('/', controller.index);
router.post(
  '/',
  [body('name').not().isEmpty().withMessage('Please check field Name')],
  controller.insert
);
router.get('/search', controller.find);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

module.exports = router;
