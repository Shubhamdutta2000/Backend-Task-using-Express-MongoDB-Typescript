"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
/**
 * automic function applied instead of trycatch
 * @param {Function} fn
 * @returns
 */
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log(err.message);
        next(err);
    });
};
exports.catchAsync = catchAsync;
