"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Author_controller_1 = require("../controllers/Author.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Get an author with all it’s books
router.get("/single", authMiddleware_1.authorRouteProtection, Author_controller_1.getAuthorWithAllBooks);
// Get list of all author with their all books
router.get("/list", Author_controller_1.getAllAuthorWithAllBooks);
// Add an author
router.post("/add", Author_controller_1.AddAuthorController);
// Update an author
router.put("/update", authMiddleware_1.authorRouteProtection, Author_controller_1.UpdateAuthorController);
exports.default = router;
