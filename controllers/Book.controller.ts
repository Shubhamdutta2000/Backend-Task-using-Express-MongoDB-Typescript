import { NextFunction, Response } from "express";
import { IBook } from "../interface/Book.interface";
import { IGetUserAuthInfoRequest } from "../interface/IGetUserAuthInfoRequest.interface";
import BookModel from "../models/Book.model";
import { AddBookService, UpdateBookService } from "../services/Book.service";
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

    // add book service
    const book = await AddBookService(
      name,
      publication_year,
      type,
      req.user?.id
    );

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
    const { id: bookId } = req.params;

    // update book service
    const book = await UpdateBookService(name, publication_year, type, bookId);

    res.json({
      message: "Author updated Successfully",
      body: book,
    });
  }
);

export { AddBookController, UpdateBookController };
