import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./episode";
import { User } from "./User";

Category.hasMany(Course, { as: 'courses' });
Course.belongsTo(Category); 

Course.hasMany(Episode)//na association o sequelize por padrão fara: 'Episodes"
Episode.belongsTo(Course)

export {
  Category,
  Course,
  Episode,
  User
};