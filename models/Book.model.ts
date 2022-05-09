import { model, Schema } from "mongoose";
import { IBook } from "../interface/Book.interface";

// Create a Schema corresponding to the document interface.
const bookSchema = new Schema<IBook>({
  name: { type: String, required: true },
  publicationYear: { type: String, required: true },
  type: { type: String, required: true },
});

const BookModel = model<IBook>("Book", bookSchema);

export default BookModel;
