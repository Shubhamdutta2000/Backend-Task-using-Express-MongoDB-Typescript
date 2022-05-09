import { NextFunction, Response } from "express";
import { IBook } from "../interface/Book.interface";
import { IGetUserAuthInfoRequest } from "../interface/IGetUserAuthInfoRequest.interface";
import BookModel from "../models/Book.model";
import { catchAsync } from "../utils/catchAsync";

/**
 *
 * @param {IGetUserAuthInfoRequest} req
 * @param {Response} res
 * @purpose Add book under an author (name, publication year, type)
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

/**
 *
 * @param {IGetUserAuthInfoRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Update an book
 * @route /book/update/:id
 * @protected
 */
const UpdateBookController = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { name, publication_year, type } = req.body;
    const { id } = req.params;

    // find by book id and update the book details
    const book: IBook | null = await BookModel.findByIdAndUpdate(
      id,
      {
        name: name,
        publicationYear: publication_year,
        type,
      },
      { new: true }
    );

    res.json({
      message: "Author updated Successfully",
      body: book,
    });
  }
);

export { AddBookController, UpdateBookController };
