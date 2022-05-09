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
exports.authorRouteProtection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
// User Auth middleware for restrictions
const authorRouteProtection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            // decode _id from token
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res
                        .sendStatus(403)
                        .json({ success: false, error: "Token is invalid" });
                }
                req.user = user;
                next();
            });
        }
        catch (error) {
            res.status(404);
            next(error);
        }
    }
    else {
        res.status(401);
        const error = new Error("Not Authorized, No token is present");
        next(error);
    }
});
exports.authorRouteProtection = authorRouteProtection;
