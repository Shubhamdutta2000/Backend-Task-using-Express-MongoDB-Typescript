import { model, Schema, Types } from "mongoose";
import { IAuthor } from "../interface/Author.interface.";

// Create a Schema corresponding to the document interface.
const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  bookList: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const AuthorModel = model<IAuthor>("Author", authorSchema);

export default AuthorModel;
