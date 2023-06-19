import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./episode";
import { Favorite } from "./Favorite";
import { User } from "./User";

Category.hasMany(Course, { as: 'courses' });

Course.belongsTo(Category); 
Course.hasMany(Episode, { as: 'episodes' });//na association o sequelize por padrão fara: 'Episodes"
Course.belongsToMany(User, { through: Favorite });
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });

Episode.belongsTo(Course);

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });

export {
  Category,
  Course,
  Episode,
  User,
  Favorite
};