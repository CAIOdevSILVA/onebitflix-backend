import { Request, Response } from "express";
import { categoryService } from "../services/categoryServices";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const categoriesController = { 
  //GET /categories
  index: async(req: Request, res: Response) => {
    const [pageNumber, perPageNumber] = getPaginationParams(req.query)

    try {
      const paginatedCategories = await categoryService.findAllPaginated(pageNumber, perPageNumber)
      return res.json(paginatedCategories);

    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ message: error.message });
      }
    }
  },
  //GET /categories/:id
  show: async(req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const category = await categoryService.findByIdWithCourse(id)
      return res.json(category)

    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ message: error.message });
      }
    }
  }
}