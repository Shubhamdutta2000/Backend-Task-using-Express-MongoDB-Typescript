"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create a Schema corresponding to the document interface.
const bookSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    publicationYear: { type: String, required: true },
    type: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "Author" },
});
const BookModel = (0, mongoose_1.model)("Book", bookSchema);
exports.default = BookModel;
