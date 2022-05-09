import { Request, Response } from "express";
import { IAuthor } from "../interface/Author.interface.";
import AuthorModel from "../models/Author.model";
import { catchAsync } from "../utils/catchAsync";
import generateAuthToken from "../utils/tokenGeneration";

const AddAuthorController = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);

  const { name } = req.body;

  const author: IAuthor = await AuthorModel.create({ name: name });

  res.json({
    message: "Author added Successfully",
    body: author,
    token: generateAuthToken(author._id),
  });
});

export { AddAuthorController };
