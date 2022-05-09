"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Author_controller_1 = require("../controllers/Author.controller");
const router = (0, express_1.Router)();
router.post("/add", Author_controller_1.AddAuthorController);
exports.default = router;
