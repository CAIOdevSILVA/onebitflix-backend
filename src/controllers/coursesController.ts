import { Request, Response } from "express"
import { coursesServices } from "../services/coursesServices";
import { getPaginationParams } from '../helpers/getPaginationParams';

export const coursesController = {
  //GET /courses/featured
  featured: async(req: Request, res: Response) => {

    try {
      const featuredCourses = await coursesServices.getRandomFeaturedCourses();
      return res.json(featuredCourses);
    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //GET /courses/newest
  newest: async(req: Request, res: Response) => {
    try {
      const newestCourses = await coursesServices.getTopTenNewest();
      return res.json(newestCourses);
    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ message: error.message });
      }
    }
  },
  //GET /courses/search
  search: async(req: Request, res: Response) => {
    const { name } = req.query;

    try {
      const [pageNumber, perPageNumber] =  getPaginationParams(req.query)
      if(typeof name !== 'string') throw new Error('name param must be of type string');

      const courses = await coursesServices.findByName(name, pageNumber, perPageNumber);
      return res.json(courses);
    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //GET /coures/:id
  show: async(req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const course = await coursesServices.findIdWithEpisodes(id);

      return res.json(course);
    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ message: error.message });
      }
    }
  },
}