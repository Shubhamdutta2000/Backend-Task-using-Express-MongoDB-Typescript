import { Response } from "express";
import { IBook } from "../interface/Book.interface";
import { IGetUserAuthInfoRequest } from "../interface/IGetUserAuthInfoRequest.interface";
import BookModel from "../models/Book.model";
import { catchAsync } from "../utils/catchAsync";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @route /book/add
 * @protected
 */
const AddBookController = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { name, publication_year, type } = req.body;

    const book: IBook = await BookModel.create({
      name: name,
      publicationYear: publication_year,
      type,
      author: req.user?.id,
    });

    res.json({
      message: "Author added Successfully",
      body: book,
    });
  }
);

export { AddBookController };
