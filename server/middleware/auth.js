import jwt from "jsonwebtoken";

import { config } from "../config.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json(AUTH_ERROR);
    }

    req.userId = decoded.id;
    req.token = token;
    next();
  });
};
