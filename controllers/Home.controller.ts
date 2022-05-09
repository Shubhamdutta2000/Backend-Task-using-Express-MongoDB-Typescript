import { Request, Response } from "express";
const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

const HomeController = (req: Request, res: Response) => {
  res.json({
    route: "/",
    purpose: "Backend Task submmitted for ",
    deployedTime: time,
    dbName: process.env.DB_NAME,
  });
};

export default HomeController;
