'use strict';
module.exports = (sequelize, DataTypes) => {
  const tb_user = sequelize.define(
    'tb_user',
    {
      l_name: DataTypes.STRING,
      f_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      section_id: DataTypes.INTEGER,
    },
    {}
  );
  tb_user.associate = function (models) {
    tb_user.belongsTo(models.tb_role, { as: 'tb_role', foreignKey: 'role_id' });
    tb_user.belongsTo(models.tb_section, {
      as: 'tb_sections',
      foreignKey: 'section_id',
    });
  };
  return tb_user;
};
