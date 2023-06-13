import { Request, Response } from "express"
import { coursesServices } from "../services/coursesServices";

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