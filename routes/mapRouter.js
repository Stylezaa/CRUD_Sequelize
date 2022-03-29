const mapController = require('../controller/mapController');
const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

router.get('/', mapController.getAll);
router.get('/:id', mapController.getByID);
router.post(
  '/insertPin',
  [
    body('map_title')
      .not()
      .isEmpty()
      .withMessage('Please check field Map Title'),
    body('latitude').not().isEmpty().withMessage('Please check field Latitude'),
    body('longitude')
      .not()
      .isEmpty()
      .withMessage('Please check field Longitude'),
  ],
  mapController.insertPin
);
router.post(
  '/updateMap/:id',
  [
    body('map_title')
      .not()
      .isEmpty()
      .withMessage('Please check field Map Title'),
    body('latitude').not().isEmpty().withMessage('Please check field Latitude'),
    body('longitude')
      .not()
      .isEmpty()
      .withMessage('Please check field Longitude'),
  ],
  mapController.updateMap
);
router.delete('/deleteMap/:id', mapController.deleteMap);

module.exports = router;
