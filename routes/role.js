const controller = require('../controller/role.controller');
const express = require('express');
const router = express.Router();

router.get('/',controller.index);
router.post('/',controller.insert);
router.post('/log',controller.log);

module.exports = router;

