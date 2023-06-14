import { Request, Response } from 'express' 

export const episodesController = {
  //GET /episodes/stream?videoUrl=
  stream: async(req: Request, res: Response) => {
    const { videoUrl } = req.query;
    try {
      
    } catch (error) {
      
    }
  }
}