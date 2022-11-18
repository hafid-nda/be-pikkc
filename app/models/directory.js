'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Directory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Directory.init({
    nama: DataTypes.STRING,
    judulJurnal: DataTypes.STRING,
    tahunTerbit: DataTypes.INTEGER,
    file: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    updatedBy: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    deletedBy: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  }, {
    sequelize,
    modelName: 'Directory',
  });
  return Directory;
};