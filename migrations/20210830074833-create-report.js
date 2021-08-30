'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      UserId: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      MarketId: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      CmdtyId: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      date: {
        type: Sequelize.DATE,
        primaryKey: true
      },
      price: {
        type: Sequelize.INTEGER
      },
      priceUnit: {
        type: Sequelize.STRING,
        default: "Kg"
      },
      reportID: {
        allowNull: false,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reports');
  }
};