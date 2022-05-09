import { NextFunction, Request, Response } from "express";
import { IAuthor } from "../interface/Author.interface.";
import AuthorModel from "../models/Author.model";
import { catchAsync } from "../utils/catchAsync";
import generateAuthToken from "../utils/tokenGeneration";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @route /author/add
 * @public
 */
const AddAuthorController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const authorExist = await AuthorModel.findOne({ name: name });
    if (authorExist) {
      const err = new Error("Author already exists");
      next(err);
    }

    // If Author does not exist
    const author: IAuthor = await AuthorModel.create({ name: name });

    res.json({
      message: "Author added Successfully",
      body: author,
      token: generateAuthToken(author._id),
    });
  }
);

export { AddAuthorController };
