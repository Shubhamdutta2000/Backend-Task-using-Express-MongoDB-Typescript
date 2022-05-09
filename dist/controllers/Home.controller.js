"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
const HomeController = (req, res) => {
    res.json({
        route: "/",
        purpose: "Backend Task submmitted for ",
        deployedTime: time,
        dbName: process.env.DB_NAME,
    });
};
exports.default = HomeController;
