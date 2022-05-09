import { Router } from "express";
import {
  AddAuthorController,
  getSingleAuthorWithAllBooks,
  UpdateAuthorController,
  getAllAuthorWithAllBooks,
} from "../controllers/Author.controller";
import { authorRouteProtection } from "../middleware/authMiddleware";

const router: Router = Router();

// Get an author with all it’s books
router.get("/single", authorRouteProtection, getSingleAuthorWithAllBooks);

// Get list of all author with their all books
router.get("/list", getAllAuthorWithAllBooks);

// Add an author
router.post("/add", AddAuthorController);

// Update an author
router.put("/update", authorRouteProtection, UpdateAuthorController);

export default router;
