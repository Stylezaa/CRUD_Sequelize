'use strict';
module.exports = (sequelize, DataTypes) => {
  const dam_data = sequelize.define(
    'dam_data',
    {
      name_of_project: DataTypes.STRING,
      operator: DataTypes.STRING,
      type_of_dam: DataTypes.STRING,
      impounds: DataTypes.STRING,
      district: DataTypes.STRING,
      province: DataTypes.STRING,
      hight: DataTypes.STRING,
      storage_capacity: DataTypes.STRING,
      reservoir_area: DataTypes.STRING,
      installed_power_capacity: DataTypes.STRING,
      year_completed: DataTypes.STRING,
      noted: DataTypes.STRING,
    },
    {}
  );
  dam_data.associate = function (models) {
    // associations can be defined here
  };
  return dam_data;
};
