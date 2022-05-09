import { NextFunction, Request, Response } from "express";
import { IAuthor } from "../interface/Author.interface.";
import { IBook } from "../interface/Book.interface";
import { IGetUserAuthInfoRequest } from "../interface/IGetUserAuthInfoRequest.interface";
import AuthorModel from "../models/Author.model";
import BookModel from "../models/Book.model";
import { catchAsync } from "../utils/catchAsync";
import generateAuthToken from "../utils/tokenGeneration";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @query {For paging} page, limit
 * @purpose Get list of authors with all their books, implement paging as well
 * @route /author/list
 * @public
 */
const getAllAuthorWithAllBooks = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const pg: any = req.query.page;
    const lmt: any = req.query.limit;

    // For paging
    var page = parseInt(pg) || 0; //for next page pass 1 here
    var limit = (lmt && parseInt(lmt)) || 3;

    // list of authors with all their books (with inner join aggregation)
    const authorWithBooks = await AuthorModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "author",
          as: "books",
        },
      },
    ])
      .skip(page * limit)
      .limit(limit);

    res.json({
      message: "Get List of authors with all their books",
      body: authorWithBooks,
    });
  }
);

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Get an author with all it’s books (books sorted by publication year)
 * @route /author/single
 * @protected
 */
const getSingleAuthorWithAllBooks = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    // GET all books by particular author (sorted by publication_year)
    const booksByParticularAuthor: IBook[] = await BookModel.find({
      author: req.user?.id,
    }).sort({
      publication_year: 1,
    });

    // GET author details
    const authorDetails: IAuthor | null = await AuthorModel.findById(
      req.user?.id
    );

    res.json({
      message: "Author details fetched Successfully with all books",
      body: {
        authorName: authorDetails?.name,
        books: booksByParticularAuthor,
      },
    });
  }
);

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Add an author (name)
 * @route /author/add
 * @public
 */
const AddAuthorController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const authorExist: IAuthor | null = await AuthorModel.findOne({
      name: name,
    });
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

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Update an author
 * @route /author/update
 * @protected
 */
const UpdateAuthorController = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const authorExist = await AuthorModel.findById(req.user?.id);
    if (!authorExist) {
      const err = new Error("Author does not exists");
      next(err);
    }

    // If author exist
    const author: IAuthor | null = await AuthorModel.findByIdAndUpdate(
      req.user?.id,
      { name: name },
      { new: true }
    );

    res.json({
      message: "Author updated Successfully",
      body: author,
    });
  }
);

export {
  AddAuthorController,
  UpdateAuthorController,
  getSingleAuthorWithAllBooks,
  getAllAuthorWithAllBooks,
};
