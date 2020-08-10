import { verify } from "jsonwebtoken";
import { Request, RequestHandler } from "express";

export type AuthToken = {
  userId: string;
  email: string;
};

export interface IsAuthRequest extends Request {
  isAuth: boolean;
  userId: string;
}

const isAuth: RequestHandler = (request, res, next) => {
  const req = request as IsAuthRequest;

  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken: object | string;
  try {
    decodedToken = verify(token, "passwordToken");
  } catch (e) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken || typeof decodedToken !== "object") {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = (decodedToken as AuthToken).userId;
  return next();
};

export default isAuth;
