'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  report.init({
    UserId: {type: DataTypes.STRING, primaryKey: true},
    MarketId: {type: DataTypes.STRING, primaryKey: true},
    CmdtyId: {type: DataTypes.STRING, primaryKey: true},
    date: {type: DataTypes.DATE, primaryKey: true},
    price: {type: DataTypes.INTEGER},
    priceUnit: {type: DataTypes.STRING, defaultValue: "Kg"},
    reportID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'report',
  });
  return report;
};