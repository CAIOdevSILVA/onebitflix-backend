import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'onebitflix_development',
  username: 'onebitflix',
  password: 'onebitflix',
  define: {
    underscored: true //avisar ao sequilize que estaremos trabalhando com snake_case no backend e com isso ele irá fazer a refatoração para camelCase 
  }
})