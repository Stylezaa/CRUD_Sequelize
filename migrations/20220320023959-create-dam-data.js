'use strict';

const sequelize = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dam_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_of_project: {
        type: Sequelize.STRING,
      },
      operator: {
        type: sequelize.STRING,
      },
      type_of_dam: {
        type: sequelize.STRING,
      },
      impounds: {
        type: sequelize.STRING,
      },
      district: {
        type: sequelize.STRING,
      },
      province: {
        type: sequelize.STRING,
      },
      hight: {
        type: sequelize.STRING,
      },
      storage_capacity: {
        type: Sequelize.STRING,
      },
      reservoir_area: {
        type: sequelize.STRING,
      },
      installed_power_capacity: {
        type: sequelize.STRING,
      },
      year_completed: {
        type: Sequelize.STRING,
      },
      noted: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dam_data');
  },
};
