const model = require('../models/index');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
// const { sequelize } = require('../models/index');
const { QueryTypes } = require('@sequelize/core');

exports.index = async (req, res, next) => {
  const user = await model.tb_user.findAll({
    include: ['tb_sections'],
  });

  res.status(200).json({
    data: user,
  });
};

// Register
exports.Register = async (req, res, next) => {
  try {
    const { f_name, l_name, email, password, role_id, section_id } = req.body;

    //Validation Email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Information not correct');
      error.statusCode = 422; //message type not collect
      error.validation = errors.array();
      throw error;
    }

    // chaeck email
    const exitMail = await model.tb_user.findOne({ where: { email: email } });
    if (exitMail) {
      res.status(400).json({
        message: 'This Email has exit',
      });
    } else {
      //hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await model.tb_user.create({
        f_name: f_name,
        l_name: l_name,
        email: email,
        password: passwordHash,
        role_id: role_id,
        section_id: section_id,
      });

      res.status(201).json({
        message: 'Register Successfully',
      });
    }
  } catch (error) {
    // res.send(error.message);
    next(error);
  }
};

//Login
exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Check email in systems
    const user = await model.tb_user.findOne({
      where: { email: email },
      include: ['tb_sections'],
    });

    //Check email in systems
    const QueryData = await model.sequelize.query(
      `SELECT tb_users.id, tb_roles.name FROM tb_users JOIN tb_roles ON tb_users.role_id = tb_roles.id WHERE tb_users.email = '${email}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    // console.log(user);

    // const role = await model.tb_role.findOne({
    //   where: { email: email },
    // });

    if (!user) {
      res.status(404).send({ message: 'Not Found User in systems' });
    }

    //Check password matching
    //   const inValid = await model.tb_user.checkPassword(password);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).send({ message: 'Password is not correct' });
    }

    const token = await jwt.sign(
      {
        id: QueryData[0].id,
        role: QueryData[0].name,
      },
      config.JWT_SECRET,
      { expiresIn: '7 days' }
    ); //Expire token time);

    // console.log(token);

    //decode ວັນໝົດອາຍຸ (type data is timestamp)
    const expires_in = jwt.decode(token);

    console.log(token);

    return res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: 'Bearer',
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  // res.cookie('jwt', '', { maxAge: 1 });
  // res.redirect('/');

  const authHeader = req.headers['authorization'];
  jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({
        msg: 'You have been logged Out',
      });
    } else {
      res.send({
        msg: 'Error',
      });
    }
  });
};

//Get Profile One
exports.ProfileByID = async (req, res, next) => {
  const { id } = req.params;

  const profile = await model.tb_user.findOne({
    where: { id: id },
  });

  res.status(200).json({ profile });
};

// find by name
exports.search = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      message: 'Not found id',
    });
  } else {
    const findName = await model.tb_user.findOne({
      where: { id: id },
      include: ['tb_role', 'tb_sections'],
    });

    res.status(200).json({
      data: findName,
    });
  }
};

// delete data
exports.delete = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: 'Not found id',
    });
  } else {
    const findID = await model.tb_user.destroy({ where: { id: id } });
    res.status(200).json({
      data: {
        message: 'deleted',
        data: user.id,
        name: user.name,
      },
    });
  }
};

// UPDATE
exports.update = async (req, res, next) => {
  const { f_name, l_name, email, password, role_id, section_id } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: 'Not found id',
    });
  } else {
    //hash password
    const salt = await bcrep.genSalt(10);
    const passwordHash = await bcrep.hash(password, salt);

    const user = await model.tb_user.update(
      {
        f_name: f_name,
        l_name: l_name,
        email: email,
        password: passwordHash,
        role_id: role_id,
        section_id: section_id,
      },
      {
        where: { id: id },
      }
    );

    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        section_id: user.section_id,
      },
    });
  }
};

//Get Profile by token
exports.ProfileMe = async (req, res, next) => {
  // console.log(req.user);
  const { id, f_name, l_name, email, role } = req.user;

  return res.status(200).json({
    user: {
      id: id,
      f_name: f_name,
      l_name: l_name,
      email: email,
      role: role,
    },
  });
};

// app.put('/api/logout', authToken, function (req, res) {
//   const authHeader = req.headers['authorization'];
//   jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
//     if (logout) {
//       res.send({ msg: 'You have been Logged Out' });
//     } else {
//       res.send({ msg: 'Error' });
//     }
//   });
// });
