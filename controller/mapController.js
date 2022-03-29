const model = require('../models/index');
const { validationResult } = require('express-validator');

// Get Data Map all
exports.getAll = async (req, res, next) => {
  const map = await model.map_marker.findAll();

  if (map == '') {
    res.status(404).json({
      message: 'Not Found Maps data',
    });
  } else {
    res.status(200).json({
      data: map,
    });
  }
};

// Get Data Map by ID
exports.getByID = async (req, res, next) => {
  const { id } = req.params;

  const exitID = await model.map_marker.findOne({
    where: { id: id },
  });

  if (!exitID) {
    res.status(404).json({
      message: 'Not Found this Map',
    });
  } else {
    const map = await model.map_marker.findOne({ where: { id: id } });

    res.status(200).json({
      data: map,
    });
  }
};

// Insert Pin Map
exports.insertPin = async (req, res, next) => {
  const { map_title, latitude, longitude } = req.body;

  try {
    //Validation Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Information not correct');
      error.statusCode = 422; //message type not collect
      error.validation = errors.array();
      throw error;
    }

    //Check map title has exit ?
    const exitMapTitle = await model.map_marker.findOne({
      where: { map_title: map_title },
    });
    if (exitMapTitle) {
      res.status(400).json({
        message: 'This Map Title has exit',
      });
    } else {
      await model.map_marker.create({
        map_title: map_title,
        latitude: latitude,
        longitude: longitude,
      });

      res.status(200).json({
        message: 'Insert Map Data successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

//Update Map Data by ID
exports.updateMap = async (req, res, next) => {
  const { id } = req.params;
  const { map_title, latitude, longitude } = req.body;

  try {
    //Validation Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Information not correct');
      error.statusCode = 422; //message type not collect
      error.validation = errors.array();
      throw error;
    }

    const exitID = await model.map_marker.findOne({
      where: { id: id },
    });

    //Check map title has exit ?
    const exitMapTitle = await model.map_marker.findOne({
      where: { map_title: map_title },
    });

    if (!exitID) {
      res.status(404).json({
        message: 'Not Found this Map',
      });
    } else if (exitMapTitle) {
      res.status(400).json({
        message: 'This Map Title has exit',
      });
    } else {
      await model.map_marker.update(
        {
          map_title: map_title,
          latitude: latitude,
          longitude: longitude,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json({
        message: 'Update this Map Successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

//Delete Map Data by ID
exports.deleteMap = async (req, res, next) => {
  const { id } = req.params;

  const exitID = await model.map_marker.findOne({
    where: { id: id },
  });

  if (!exitID) {
    res.status(404).json({
      message: 'Not Found this Map',
    });
  } else {
    await model.map_marker.destroy({
      where: { id: id },
    });

    res.status(200).json({
      message: 'Delete this Map Successfully',
    });
  }
};
