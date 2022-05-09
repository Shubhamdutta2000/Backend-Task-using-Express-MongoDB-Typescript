import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AddAuthorController } from "../controllers/Author.controller";
import { IGetUserAuthInfoRequest } from "../interface/IGetUserAuthInfoRequest.interface";

dotenv.config();

// User Auth middleware for restrictions
export const authorRouteProtection = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      // decode _id from token
      jwt.verify(token, process.env.JWT_SECRET!, (err, user: any) => {
        if (err) {
          return res
            .sendStatus(403)
            .json({ success: false, error: "Token is invalid" });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      res.status(404);
      next(error);
    }
  } else {
    res.status(401);
    const error = new Error("Not Authorized, No token is present");
    next(error);
  }
};
