import { Category } from "../models";

export const categoryService = {
  findAllPaginated: async(page: number, perPage: number) => {
    const offset = (page - 1) * perPage;//Serve para pular alguns registros no banco

    const { count, rows } = await Category.findAndCountAll({
      attributes: ['id', 'name', 'position'],
      order: [['position', 'ASC']],
      limit: perPage,
      offset: offset
    });

    return {
      categories: rows,
      page,
      perPage,
      totalCategories: count
    }
  },
  findByIdWithCourse: async(id: string) => {
    const categoriesWithCourses = await Category.findByPk(id, {
      attributes: ['id', 'name'],
      include: {
        association: "courses",
        attributes: [
          'id', 
          'name', 
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']//remonear atributo
        ]
      }
    });

    return categoriesWithCourses;
  }
}