'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Researcher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Peneliti.init({
    namaPeneliti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamatPeneliti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenisKelamin: {
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
    modelName: 'Researcher',
  });
  return Researcher;
};