import { Optional, Model, DataTypes } from "sequelize"
import { sequelize } from "../database"

export interface CourseAttributes {
  id: number,
  name: string,
  synopsis: string,
  thumbnailUrl: string,
  featured: boolean,
  categoryId: number
}

export interface CourseCreationAttributes 
                  extends Optional<CourseAttributes, 'id' | 'thumbnailUrl' | 'featured' > {}

export interface CourseInstance
                  extends Model<CourseAttributes, CourseCreationAttributes>, CourseAttributes{}

export const Course = sequelize.define<CourseInstance, CourseAttributes>('Course', {
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'categories', key: 'id' },
    onDelete: 'RESTRICT',
    onUpdate: "CASCADE"
  }
})