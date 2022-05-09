"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookService = exports.AddBookService = void 0;
const Book_model_1 = __importDefault(require("../models/Book.model"));
/**
 *
 * @param {NextFunction} next
 * @param {string} name
 * @returns book details after creating a new book
 */
const AddBookService = (name, publication_year, type, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookDetails = yield Book_model_1.default.create({
        name: name,
        publicationYear: publication_year,
        type,
        author: authorId,
    });
    return bookDetails;
});
exports.AddBookService = AddBookService;
//----------------------------------------------------------------------------------------------------//
/**
 *
 * @param {NextFunction} next
 * @param {ObjectId | undefined} authorId
 * @returns author details after updating a new author
 */
const UpdateBookService = (name, publication_year, type, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // find by book id and update the book details
    const bookDetails = yield Book_model_1.default.findByIdAndUpdate(bookId, {
        name: name,
        publicationYear: publication_year,
        type,
    }, { new: true });
    return bookDetails;
});
exports.UpdateBookService = UpdateBookService;
