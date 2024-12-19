'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    id: {
      type: DataTypes.INTEGER, // Define como inteiro
      primaryKey: true,        // Define como chave primária
      autoIncrement: true      // Faz com que o valor seja gerado automaticamente
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};