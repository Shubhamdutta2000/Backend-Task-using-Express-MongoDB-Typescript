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
exports.AddBookController = void 0;
const Book_model_1 = __importDefault(require("../models/Book.model"));
const catchAsync_1 = require("../utils/catchAsync");
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @route /book/add
 * @protected
 */
const AddBookController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, publication_year, type } = req.body;
    const book = yield Book_model_1.default.create({
        name: name,
        publicationYear: publication_year,
        type,
        author: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
    });
    res.json({
        message: "Author added Successfully",
        body: book,
    });
}));
exports.AddBookController = AddBookController;
