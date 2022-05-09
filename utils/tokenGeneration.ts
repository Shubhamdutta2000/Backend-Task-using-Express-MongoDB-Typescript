import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const generateAuthToken = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

export default generateAuthToken;
