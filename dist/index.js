"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
// routers
const Home_router_1 = __importDefault(require("./routes/Home.router"));
const Author_router_1 = __importDefault(require("./routes/Author.router"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// mongodb connection
(0, db_1.default)();
app.use("/", Home_router_1.default);
app.use("/author", Author_router_1.default);
// app.use("/book", BookRouter);
// custom middleware
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
