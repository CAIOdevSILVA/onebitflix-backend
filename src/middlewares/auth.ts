import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null
}
//Criamos essa interface para resolvar o problema na lina 27, onde a req do tipo Request não possui a prop user
//Então criamos essa interface onde ela extende Request e adiciona a prop user do tipo UserInstance por que
//se referi a instancia no banco e seus métodos.

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if(!authorizationHeader) return res.status(401).json(
    { message: "Não autorizado: Nenhum token foi encontrado." }
  );

  const token = authorizationHeader.replace(/Bearer /, ''); //No header o token vem assim: Bearer fsd5fsd5f4s5fs56fs64fs, com a regex retiramos o Bearer e permace apenas o token.

  jwtService.virifyToken(token, async(error, decoded) => {
    if(error || typeof decoded === "undefined") {
      return res.status(401).json(
        { message: "Não autorizado: Token inválido."}
      );
    };

    const user = await userService.findByEmail((decoded as JwtPayload).email)
    req.user = user;
    next();
  });
};

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { token } = req.query;

  if(!token) return res.status(401).json(
    { message: "Não autorizado: Nenhum token foi encontrado." }
  );

  if(typeof token !== "string"){
    return res.status(401).json(
      { message: "O parâmetro Token deve ser do tipo string" }
    );
  };

  jwtService.virifyToken(token, async(error, decoded) => {
    if(error || typeof decoded === "undefined") {
      return res.status(401).json(
        { message: "Não autorizado: Token inválido."}
      );
    };

    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  });
};