"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create a Schema corresponding to the document interface.
const authorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    bookList: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Book" }],
});
const AuthorModel = (0, mongoose_1.model)("Author", authorSchema);
exports.default = AuthorModel;
