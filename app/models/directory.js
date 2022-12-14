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
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judulJurnal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahunTerbit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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