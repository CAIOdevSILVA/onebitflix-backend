import { Request, Response } from "express"
import { coursesServices } from "../services/coursesServices";
import { getPaginationParams } from '../helpers/getPaginationParams';
import { AuthenticatedRequest } from "../middlewares/auth";
import { likesServices } from "../services/likesServices";
import { favoriteService } from "../services/favoriteService";

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
  //GET /courses/popular
  popular: async(req: Request, res: Response) => {
    try {
      const courses = await coursesServices.getTopTenByLikes();
      return res.json(courses);
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
  show: async(req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const courseId = req.params.id;

    try {
      const course = await coursesServices.findIdWithEpisodes(courseId);
      if(!course) return res.status(404).json({ message: "Curso não encontrado!" });

      const liked = await likesServices.isLiked(userId, Number(courseId));
      const favorited = await favoriteService.isFavorited(userId, Number(courseId));
      return res.status(200).json({ ...course.get(), liked, favorited });

    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ message: error.message });
      }
    }
  },
}