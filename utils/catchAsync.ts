import { NextFunction, Request, Response } from "express";

/**
 * automic function applied instead of trycatch
 * @param {Function} fn
 * @returns
 */
export const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
