import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface IGetUserAuthInfoRequest extends Request {
  user?: { id: ObjectId }; // or any other type
}
