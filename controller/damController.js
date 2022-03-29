const model = require('../models/index');
const { validationResult } = require('express-validator');
// Get Data Dams all
exports.getAll = async (req, res, next) => {
  const dam = await model.dam_data.findAll();

  if (dam == '') {
    res.status(404).json({
      message: 'Not Found Dams data',
    });
  } else {
    res.status(200).json({
      data: dam,
    });
  }
};

// Get Data Dam by ID
exports.getByID = async (req, res, next) => {
  const { id } = req.params;

  const existID = await model.dam_data.findOne({
    where: { id: id },
  });

  if (!existID) {
    res.status(404).json({
      message: 'Not Found this Dam',
    });
  } else {
    const dam = await model.dam_data.findOne({ where: { id: id } });

    res.status(200).json({
      data: dam,
    });
  }
};

// Insert Dam
exports.insertDam = async (req, res, next) => {
  const {
    name_of_project,
    operator,
    type_of_dam,
    impounds,
    district,
    province,
    hight,
    storage_capacity,
    reservoir_area,
    installed_power_capacity,
    year_completed,
    noted,
  } = req.body;

  try {
    //Validation Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Information not correct');
      error.statusCode = 422; //message type not collect
      error.validation = errors.array();
      throw error;
    }

    //Check Name of Project has exist ?
    const existNameofProject = await model.dam_data.findOne({
      where: { name_of_project: name_of_project },
    });

    if (existNameofProject) {
      res.status(400).json({
        message: 'This Name of Project has exist',
      });
    } else {
      await model.dam_data.create({
        name_of_project: name_of_project,
        operator: operator,
        type_of_dam: type_of_dam,
        impounds: impounds,
        district: district,
        province: province,
        hight: hight,
        storage_capacity: storage_capacity,
        reservoir_area: reservoir_area,
        installed_power_capacity: installed_power_capacity,
        year_completed: year_completed,
        noted: noted,
      });

      res.status(200).json({
        message: 'Insert Dam Data successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

//Update Dam Data by ID
exports.updateDam = async (req, res, next) => {
  const { id } = req.params;
  const {
    name_of_project,
    operator,
    type_of_dam,
    impounds,
    district,
    province,
    hight,
    storage_capacity,
    reservoir_area,
    installed_power_capacity,
    year_completed,
    noted,
  } = req.body;

  try {
    //Validation Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Information not correct');
      error.statusCode = 422; //message type not collect
      error.validation = errors.array();
      throw error;
    }

    const existID = await model.dam_data.findOne({
      where: { id: id },
    });

    //Check Name of Project has exist ?
    const existNameofProject = await model.dam_data.findOne({
      where: { name_of_project: name_of_project },
    });

    if (!existID) {
      res.status(404).json({
        message: 'Not Found this Dam',
      });
    } else if (existNameofProject) {
      res.status(400).json({
        message: 'This Name of Project has exist',
      });
    } else {
      await model.dam_data.update(
        {
          name_of_project: name_of_project,
          operator: operator,
          type_of_dam: type_of_dam,
          impounds: impounds,
          district: district,
          province: province,
          hight: hight,
          storage_capacity: storage_capacity,
          reservoir_area: reservoir_area,
          installed_power_capacity: installed_power_capacity,
          year_completed: year_completed,
          noted: noted,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json({
        message: 'Update this Dam Successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

//Delete Dam Data by ID
exports.deleteDam = async (req, res, next) => {
  const { id } = req.params;

  const existID = await model.dam_data.findOne({
    where: { id: id },
  });

  if (!existID) {
    res.status(404).json({
      message: 'Not Found this Dam',
    });
  } else {
    await model.dam_data.destroy({
      where: { id: id },
    });

    res.status(200).json({
      message: 'Delete this Dam Successfully',
    });
  }
};
