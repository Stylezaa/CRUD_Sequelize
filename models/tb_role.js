'use strict';
module.exports = (sequelize, DataTypes) => {
  const tb_role = sequelize.define(
    'tb_role',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  tb_role.associate = function (models) {
    tb_role.hasMany(models.tb_user, {
      as: 'tb_users',
      foreignKey: 'section_id',
    });
  };
  return tb_role;
};
