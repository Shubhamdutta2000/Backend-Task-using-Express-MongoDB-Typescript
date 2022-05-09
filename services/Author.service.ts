import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import { IAuthor } from "../interface/Author.interface.";
import { IBook } from "../interface/Book.interface";
import AuthorModel from "../models/Author.model";
import BookModel from "../models/Book.model";

/**
 *
 * @param {string} pg -- page (for paging)
 * @param {string} lmt -- limit
 * @returns list of authors with all their books
 */
export const getAllAuthorWithAllBooksService = async (
  pg: string,
  lmt: string
) => {
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

  return authorWithBooks;
};

//---------------------------------------------------------------------------------------------------------//

/**
 *
 * @param {string} authorId
 * @returns:- all books by particular author (sorted by publication_year) && author details
 */
export const getSingleAuthorWithAllBooksService = async (
  authorId: ObjectId | undefined
) => {
  // GET all books by particular author (sorted by publication_year)
  const booksByParticularAuthor: IBook[] = await BookModel.find({
    author: authorId,
  }).sort({
    publication_year: 1,
  });

  // GET author details
  const authorDetails: IAuthor | null = await AuthorModel.findById(authorId);

  return { authorDetails, booksByParticularAuthor };
};

//--------------------------------------------------------------------------------------------------------//

/**
 *
 * @param {NextFunction} next
 * @param {string} name
 * @returns author details after creating a new author
 */
export const AddAuthorService = async (next: NextFunction, name: string) => {
  // check if author exist or not
  const authorExist: IAuthor | null = await AuthorModel.findOne({
    name: name,
  });
  if (authorExist) {
    const err = new Error("Author already exists");
    next(err);
  }

  // If Author does not exist
  const authorDetails: IAuthor = await AuthorModel.create({ name: name });

  return authorDetails;
};

//----------------------------------------------------------------------------------------------------//

/**
 *
 * @param {NextFunction} next
 * @param {ObjectId | undefined} authorId
 * @returns author details after updating a new author
 */
export const UpdateAuthorService = async (
  name: string,
  next: NextFunction,
  authorId: ObjectId | undefined
) => {
  const authorExist = await AuthorModel.findById(authorId);
  if (!authorExist) {
    const err = new Error("Author does not exists");
    next(err);
  }

  // If author exist
  const authorDetails: IAuthor | null = await AuthorModel.findByIdAndUpdate(
    authorId,
    { name: name },
    { new: true }
  );

  return authorDetails;
};
