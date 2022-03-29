'use strict';
module.exports = (sequelize, DataTypes) => {
  const tb_plublication = sequelize.define('tb_plublication', {
    no: DataTypes.INTEGER,
    lao_topic: DataTypes.STRING,
    eng_topic: DataTypes.STRING,
    lao_Content: DataTypes.STRING,
    eng_Content: DataTypes.STRING
  }, { tableName: 'tb_plublications'});
  tb_plublication.associate = function(models) {
    // associations can be defined here
  };
  return tb_plublication;
};