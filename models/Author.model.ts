import { model, Schema } from "mongoose";
import { IAuthor } from "../interface/Author.interface.";

// Create a Schema corresponding to the document interface.
const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
});

const AuthorModel = model<IAuthor>("Author", authorSchema);

export default AuthorModel;
