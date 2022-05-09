import express, { Express } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db";

import cors from "cors";
import morgan from "morgan";

// routers
import HomeRouter from "./routes/Home.router";
import AuthorRouter from "./routes/Author.router";
import BookRouter from "./routes/Book.router";

import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// mongodb connection
dbConnect();

// Middleware
app.use(morgan("dev"));

// Routes
app.use("/", HomeRouter);
app.use("/author", AuthorRouter);
app.use("/book", BookRouter);

// custom middleware
app.use(notFound);
app.use(errorHandler);

const port: string = process.env.PORT!;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
