const damController = require('../controller/damController');
const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

router.get('/', damController.getAll);
router.get('/:id', damController.getByID);
router.post(
  '/insertDam',
  [
    body('name_of_project')
      .not()
      .isEmpty()
      .withMessage('Please check field Name of Project'),
    // body('operator').not().isEmpty().withMessage('Please check field Operator'),
    // body('type_of_dam')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Type of dam'),
    // body('impounds').not().isEmpty().withMessage('Please check field Impounds'),
    // body('district').not().isEmpty().withMessage('Please check field District'),
    // body('province').not().isEmpty().withMessage('Please check field Province'),
    // body('hight').not().isEmpty().withMessage('Please check field Hight'),
    // body('storage_capacity')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Storage Capacity'),
    // body('reservoir_area')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Reservoir Area'),
    // body('installed_power_capacity')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Installed Power Capacity'),
    // body('year_completed')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Year Completed'),
    // body('noted').not().isEmpty().withMessage('Please check field Noted'),
  ],
  damController.insertDam
);
router.post(
  '/updateDam/:id',
  [
    body('name_of_project')
      .not()
      .isEmpty()
      .withMessage('Please check field Name of Project'),
    // body('operator').not().isEmpty().withMessage('Please check field Operator'),
    // body('type_of_dam')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Type of dam'),
    // body('impounds').not().isEmpty().withMessage('Please check field Impounds'),
    // body('district').not().isEmpty().withMessage('Please check field District'),
    // body('province').not().isEmpty().withMessage('Please check field Province'),
    // body('hight').not().isEmpty().withMessage('Please check field Hight'),
    // body('storage_capacity')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Storage Capacity'),
    // body('reservoir_area')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Reservoir Area'),
    // body('installed_power_capacity')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Installed Power Capacity'),
    // body('year_completed')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Please check field Year Completed'),
    // body('noted').not().isEmpty().withMessage('Please check field Noted'),
  ],
  damController.updateDam
);
router.delete('/deleteDam/:id', damController.deleteDam);

module.exports = router;
