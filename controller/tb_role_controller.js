const model = require('../models/index');
const { validationResult } = require('express-validator');
// show all data tb role
exports.index = async (req, res, next) => {
  try {
    const role = await model.tb_role.findAll({
      include: 'tb_users',
    });

    res.status(200).json({
      data: role,
    });
  } catch (error) {
    res.status(400).json({
      data: {
        data: error,
      },
    });
  }
};
// insert data in tb role
exports.insert = async (req, res, next) => {
  try {
    const { name } = req.body;

    //Validation Email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Information not correct');
      error.statusCode = 422; //message type not collect
      error.validation = errors.array();
      throw error;
    }

    const exitName = await model.tb_role.findOne({ where: { name: name } });
    if (exitName) {
      res.status(400).json({
        data: {
          error: true,
          message: 'This name is exits!',
        },
      });
    } else {
      const role = await model.tb_role.create({ name: name });

      res.status(201).json({
        message: 'saved',
        data: {
          id: role.id,
          name: role.name,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'saved',
      data: {
        error: true,
        data: error,
      },
    });
  }
};

// find by name

exports.find = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      message: 'Please provide name!',
    });
  } else {
    const role = await model.tb_role.findOne({ name: name });
    if (!role) {
      res.status(400).json({
        message: 'Not found name!',
      });
    } else {
      res.status(200).json({
        data: role,
      });
    }
  }
};

// update
exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const role = await model.tb_role.update(
    {
      name: name,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.status(200).json({
    data: {
      message: 'Updated',
      data: role.id,
    },
  });
};

// delete

exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: 'Not found id!',
    });
  } else {
    const role = await model.tb_role.destroy({ id: id });
    res.json({
      data: {
        id: role.id,
      },
    });
  }
};
