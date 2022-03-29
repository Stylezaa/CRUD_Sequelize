'use strict';
module.exports = (sequelize, DataTypes) => {
  const map_marker = sequelize.define('map_marker', {
    map_title: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {});
  map_marker.associate = function(models) {
    // associations can be defined here
  };
  return map_marker;
};