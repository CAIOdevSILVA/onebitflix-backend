import { Request, Response } from "express";
import { episodeService } from "../services/episodeServices";


export const episodesController = {
  //GET /episodes/stream?videoUrl=
  stream: async(req: Request, res: Response) => {
    const { videoUrl } = req.query;
    try {
      if(typeof videoUrl !== "string") throw new Error('videoUrl param must be type of string');
      const range = req.headers.range  //determina a parte do video que sera carregada
      episodeService.streamEpisodeToResponse(res, videoUrl, range);

    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ message: error.message });
      }
    }
  },
}