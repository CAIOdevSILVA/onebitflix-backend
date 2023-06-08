import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface Category {
  id: number,
  name: string,
  position: number
};

export interface CategoryCraetionAttributes extends Optional<Category, 'id'> {};

//esse Optinal é umas propriedade do sequelize que serve para definir atributos opcionais
//nesse caso o id, ja o usuario não vai cria-lo e sim o banco dde dados.

export interface CategoryInstace extends Model<Category, CategoryCraetionAttributes>, Category {};

export const Category = sequelize.define<CategoryInstace, Category>('Category', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  position: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
});