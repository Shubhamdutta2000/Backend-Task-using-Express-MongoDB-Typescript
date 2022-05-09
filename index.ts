import express, { Express, Router } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db";

// routers
import HomeRouter from "./routes/Home.router";
import AuthorRouter from "./routes/Author.router";
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT!;

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// mongodb connection
dbConnect();

app.use("/", HomeRouter);
app.use("/author", AuthorRouter);
// app.use("/book", BookRouter);

// custom middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
