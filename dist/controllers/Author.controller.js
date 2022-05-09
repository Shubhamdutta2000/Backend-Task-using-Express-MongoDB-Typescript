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
const Author_service_1 = require("../services/Author.service");
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
    // get list of authors with all their books
    const allAuthorWithBooks = yield (0, Author_service_1.getAllAuthorWithAllBooksService)(pg, lmt);
    res.json({
        message: "Get List of authors with all their books",
        body: allAuthorWithBooks,
    });
}));
exports.getAllAuthorWithAllBooks = getAllAuthorWithAllBooks;
/**
 *
 * @param {IGetUserAuthInfoRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Get an author with all it’s books (books sorted by publication year)
 * @route /author/single
 * @protected
 */
const getSingleAuthorWithAllBooks = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // get an author details and list of books of particular author
    const { authorDetails, booksByParticularAuthor } = yield (0, Author_service_1.getSingleAuthorWithAllBooksService)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
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
    // add author service
    const author = yield (0, Author_service_1.AddAuthorService)(next, name);
    res.json({
        message: "Author added Successfully",
        body: author,
        token: (0, tokenGeneration_1.default)(author._id),
    });
}));
exports.AddAuthorController = AddAuthorController;
/**
 *
 * @param {IGetUserAuthInfoRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Update an author
 * @route /author/update
 * @protected
 */
const UpdateAuthorController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { name } = req.body;
    // update author service
    const author = yield (0, Author_service_1.UpdateAuthorService)(name, next, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
    res.json({
        message: "Author updated Successfully",
        body: author,
    });
}));
exports.UpdateAuthorController = UpdateAuthorController;
