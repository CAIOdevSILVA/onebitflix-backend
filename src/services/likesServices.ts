import { Like } from "../models"

export const likesServices = {
  create: async(userId: number, courseId: number) => {
    const like = await Like.create({ userId, courseId });

    return like;
  }
}