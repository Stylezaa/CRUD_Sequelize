const controller = require('../controller/tb_publication.controller');
const express = require('express');
const router = express.Router();

router.post('/', controller.insert);
router.put('/:id', controller.update);

module.exports = router;
