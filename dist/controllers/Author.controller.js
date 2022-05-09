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
exports.getAllAuthorWithAllBooks = exports.getSingleAuthorWithAllBooks = exports.UpdateAuthorController = exports.AddAuthorController = void 0;
const Author_model_1 = __importDefault(require("../models/Author.model"));
const Book_model_1 = __importDefault(require("../models/Book.model"));
const catchAsync_1 = require("../utils/catchAsync");
const tokenGeneration_1 = __importDefault(require("../utils/tokenGeneration"));
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @query {For paging} page, limit
 * @purpose Get list of authors with all their books, implement paging as well
 * @route /author/list
 * @public
 */
const getAllAuthorWithAllBooks = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pg = req.query.page;
    const lmt = req.query.limit;
    // For paging
    var page = parseInt(pg) || 0; //for next page pass 1 here
    var limit = (lmt && parseInt(lmt)) || 3;
    // list of authors with all their books (with aggregation)
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
    res.json({
        message: "Get List of authors with all their books",
        body: authorWithBooks,
    });
}));
exports.getAllAuthorWithAllBooks = getAllAuthorWithAllBooks;
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Get an author with all it’s books (books sorted by publication year)
 * @route /author/single
 * @protected
 */
const getSingleAuthorWithAllBooks = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // GET all books by particular author (sorted by publication_year)
    const booksByParticularAuthor = yield Book_model_1.default.find({
        author: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
    }).sort({
        publication_year: 1,
    });
    // GET author details
    const authorDetails = yield Author_model_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
    res.json({
        message: "Author details fetched Successfully with all books",
        body: {
            authorName: authorDetails === null || authorDetails === void 0 ? void 0 : authorDetails.name,
            books: booksByParticularAuthor,
        },
    });
}));
exports.getSingleAuthorWithAllBooks = getSingleAuthorWithAllBooks;
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Add an author (name)
 * @route /author/add
 * @public
 */
const AddAuthorController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const authorExist = yield Author_model_1.default.findOne({
        name: name,
    });
    if (authorExist) {
        const err = new Error("Author already exists");
        next(err);
    }
    // If Author does not exist
    const author = yield Author_model_1.default.create({ name: name });
    res.json({
        message: "Author added Successfully",
        body: author,
        token: (0, tokenGeneration_1.default)(author._id),
    });
}));
exports.AddAuthorController = AddAuthorController;
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Update an author
 * @route /author/update
 * @protected
 */
const UpdateAuthorController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { name } = req.body;
    const authorExist = yield Author_model_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c.id);
    if (!authorExist) {
        const err = new Error("Author does not exists");
        next(err);
    }
    // If author exist
    const author = yield Author_model_1.default.findByIdAndUpdate((_d = req.user) === null || _d === void 0 ? void 0 : _d.id, { name: name }, { new: true });
    res.json({
        message: "Author updated Successfully",
        body: author,
    });
}));
exports.UpdateAuthorController = UpdateAuthorController;
