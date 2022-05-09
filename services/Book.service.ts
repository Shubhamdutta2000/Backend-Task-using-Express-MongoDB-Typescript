import { NextFunction } from "express";
import { ObjectId } from "mongoose";
import { IBook } from "../interface/Book.interface";
import BookModel from "../models/Book.model";

/**
 *
 * @param {NextFunction} next
 * @param {string} name
 * @returns book details after creating a new book
 */
export const AddBookService = async (
  name: string,
  publication_year: string,
  type: string,
  authorId: ObjectId | undefined
) => {
  const bookDetails: IBook = await BookModel.create({
    name: name,
    publicationYear: publication_year,
    type,
    author: authorId,
  });

  return bookDetails;
};

//----------------------------------------------------------------------------------------------------//

/**
 *
 * @param {NextFunction} next
 * @param {ObjectId | undefined} authorId
 * @returns author details after updating a new author
 */
export const UpdateBookService = async (
  name: string,
  publication_year: string,
  type: string,
  bookId: string
) => {
  // find by book id and update the book details
  const bookDetails: IBook | null = await BookModel.findByIdAndUpdate(
    bookId,
    {
      name: name,
      publicationYear: publication_year,
      type,
    },
    { new: true }
  );

  return bookDetails;
};
