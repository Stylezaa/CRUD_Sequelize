'use strict';
module.exports = (sequelize, DataTypes) => {
  const tb_section = sequelize.define(
    'tb_section',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  tb_section.associate = function (models) {
    tb_section.hasMany(models.tb_user, {
      as: 'tb_users',
      foreignKey: 'section_id',
    });
  };
  return tb_section;
};
