import jwt from "jsonwebtoken"

const secret = 'chave'

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  },
  virifyToken: (token: string, callbackFn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackFn);
  }
};