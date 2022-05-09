import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../interface/IGetUserAuthInfoRequest.interface";
import {
  AddAuthorService,
  getAllAuthorWithAllBooksService,
  getSingleAuthorWithAllBooksService,
  UpdateAuthorService,
} from "../services/Author.service";
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
  async (req: Request, res: Response, next: NextFunction) => {
    const pg: any = req.query.page;
    const lmt: any = req.query.limit;

    // get list of authors with all their books
    const allAuthorWithBooks = getAllAuthorWithAllBooksService(pg, lmt);

    res.json({
      message: "Get List of authors with all their books",
      body: allAuthorWithBooks,
    });
  }
);

/**
 *
 * @param {IGetUserAuthInfoRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Get an author with all it’s books (books sorted by publication year)
 * @route /author/single
 * @protected
 */
const getSingleAuthorWithAllBooks = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    // get an author details and list of books of particular author
    const { authorDetails, booksByParticularAuthor } =
      await getSingleAuthorWithAllBooksService(req.user?.id);

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

    // add author service
    const author = await AddAuthorService(next, name);

    res.json({
      message: "Author added Successfully",
      body: author,
      token: generateAuthToken(author._id),
    });
  }
);

/**
 *
 * @param {IGetUserAuthInfoRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 * @purpose Update an author
 * @route /author/update
 * @protected
 */
const UpdateAuthorController = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;

    // update author service
    const author = UpdateAuthorService(next, req.user?.id);

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
