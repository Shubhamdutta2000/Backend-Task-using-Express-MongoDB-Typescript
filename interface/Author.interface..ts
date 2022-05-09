import { ObjectId, Types } from "mongoose";

// Create an interface representing Author
export interface IAuthor {
  _id: ObjectId;
  name: string;
  bookList?: Array<Types.ObjectId>;
}
