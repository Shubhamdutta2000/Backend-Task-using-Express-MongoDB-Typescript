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
exports.UpdateAuthorService = exports.AddAuthorService = exports.getSingleAuthorWithAllBooksService = exports.getAllAuthorWithAllBooksService = void 0;
const Author_model_1 = __importDefault(require("../models/Author.model"));
const Book_model_1 = __importDefault(require("../models/Book.model"));
/**
 *
 * @param {string} pg -- page (for paging)
 * @param {string} lmt -- limit
 * @returns list of authors with all their books
 */
const getAllAuthorWithAllBooksService = (pg, lmt) => __awaiter(void 0, void 0, void 0, function* () {
    // For paging
    var page = parseInt(pg) || 0; //for next page pass 1 here
    var limit = (lmt && parseInt(lmt)) || 3;
    // list of authors with all their books (with inner join aggregation)
    const authorWithBooks = yield Author_model_1.default.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "author",
                as: "books",
            },
        },
    ])
        .skip(page * limit)
        .limit(limit);
    return authorWithBooks;
});
exports.getAllAuthorWithAllBooksService = getAllAuthorWithAllBooksService;
//---------------------------------------------------------------------------------------------------------//
/**
 *
 * @param {string} authorId
 * @returns:- all books by particular author (sorted by publication_year) && author details
 */
const getSingleAuthorWithAllBooksService = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    // GET all books by particular author (sorted by publication_year)
    const booksByParticularAuthor = yield Book_model_1.default.find({
        author: authorId,
    }).sort({
        publication_year: 1,
    });
    // GET author details
    const authorDetails = yield Author_model_1.default.findById(authorId);
    return { authorDetails, booksByParticularAuthor };
});
exports.getSingleAuthorWithAllBooksService = getSingleAuthorWithAllBooksService;
//--------------------------------------------------------------------------------------------------------//
/**
 *
 * @param {NextFunction} next
 * @param {string} name
 * @returns author details after creating a new author
 */
const AddAuthorService = (next, name) => __awaiter(void 0, void 0, void 0, function* () {
    // check if author exist or not
    const authorExist = yield Author_model_1.default.findOne({
        name: name,
    });
    if (authorExist) {
        const err = new Error("Author already exists");
        next(err);
    }
    // If Author does not exist
    const authorDetails = yield Author_model_1.default.create({ name: name });
    return authorDetails;
});
exports.AddAuthorService = AddAuthorService;
//----------------------------------------------------------------------------------------------------//
/**
 *
 * @param {NextFunction} next
 * @param {ObjectId | undefined} authorId
 * @returns author details after updating a new author
 */
const UpdateAuthorService = (name, next, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const authorExist = yield Author_model_1.default.findById(authorId);
    if (!authorExist) {
        const err = new Error("Author does not exists");
        next(err);
    }
    // If author exist
    const authorDetails = yield Author_model_1.default.findByIdAndUpdate(authorId, { name: name }, { new: true });
    return authorDetails;
});
exports.UpdateAuthorService = UpdateAuthorService;
