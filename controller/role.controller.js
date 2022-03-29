const bcryptjs = require('bcryptjs');
const model = require('../models/index');

exports.index = async (req, res) => {
  const role = await model.Role.findAll();

  res.status(200).json({
    data: role,
  });
};

exports.insert = async (req, res) => {
  const { name, code } = req.body;

  //cheack name
  const exitName = await model.Role.findOne({ where: { name: name } });
  if (exitName) {
    res.status(201).json({
      message: 'This name is exits!',
    });
  } else {
    //create salt
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(code, salt);

    //insert
    const role = await model.Role.create({
      name: name,
      code: passwordHash,
    });

    res.status(201).json({
      message: 'saved',
      data: {
        id: role.id,
      },
    });
  }
};

// cheack

exports.log = async (req, res) => {
  const { name, code } = req.body;
  const chackName = await model.Role.findOne({
    where: { name: name },
    attributes: ['code'],
  });
  //const a = JSON.stringify(chackName);

  // const chackCode = await bcryptjs.compare(code,chackName.row[0]);

  console.log(chackName.row[0]);
  res.json({
    data: chackName.row[0],
  });
};
