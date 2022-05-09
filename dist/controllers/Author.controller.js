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
exports.AddAuthorController = void 0;
const Author_model_1 = __importDefault(require("../models/Author.model"));
const catchAsync_1 = require("../utils/catchAsync");
const tokenGeneration_1 = __importDefault(require("../utils/tokenGeneration"));
const AddAuthorController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const author = yield Author_model_1.default.create({ name: name });
    res.json({
        message: "Author added Successfully",
        body: author,
        token: (0, tokenGeneration_1.default)(author._id),
    });
}));
exports.AddAuthorController = AddAuthorController;
