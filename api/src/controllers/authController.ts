import admin from "../services/firebaseService";
import { RequestHandler } from "express";

export const createUser: RequestHandler = async (req, res) => {
  const {
    email,
    phoneNumber,
    password,
    firstName,
    lastName,
    photoUrl,
  } = req.body;

  const user = await admin.auth().createUser({
    email,
    phoneNumber,
    password,
    displayName: `${firstName} ${lastName}`,
    photoURL: photoUrl,
  });

  return res.send(user);
};

const getAuthToken: RequestHandler = (req, _, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

export const checkIfAuthenticated: RequestHandler = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      if (authToken) {
        const userInfo = await admin.auth().verifyIdToken(authToken);
        req.authId = userInfo?.uid;
        return next();
      } else {
        throw new Error();
      }
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};
