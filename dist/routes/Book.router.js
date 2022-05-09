"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Book_controller_1 = require("../controllers/Book.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post("/add", authMiddleware_1.authorRouteProtection, Book_controller_1.AddBookController);
exports.default = router;
