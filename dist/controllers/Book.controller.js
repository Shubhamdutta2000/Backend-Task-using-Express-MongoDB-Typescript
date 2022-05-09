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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookController = exports.AddBookController = void 0;
const Book_service_1 = require("../services/Book.service");
const catchAsync_1 = require("../utils/catchAsync");
/**
 *
 * @param {IGetUserAuthInfoRequest} req
 * @param {Response} res
 * @purpose Add book under an author (name, publication year, type)
 * @route /book/add
 * @protected
 */
const AddBookController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, publication_year, type } = req.body;
    // add book service
    const book = yield (0, Book_service_1.AddBookService)(name, publication_year, type, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    res.json({
        message: "Author added Successfully",
        body: book,
    });
}));
exports.AddBookController = AddBookController;
/**
 *
 * @param {IGetUserAuthInfoRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Update an book
 * @route /book/update/:id
 * @protected
 */
const UpdateBookController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, publication_year, type } = req.body;
    const { id: bookId } = req.params;
    // update book service
    const book = yield (0, Book_service_1.UpdateBookService)(name, publication_year, type, bookId);
    res.json({
        message: "Author updated Successfully",
        body: book,
    });
}));
exports.UpdateBookController = UpdateBookController;
