import { Router } from "express";
import {
  AddBookController,
  UpdateBookController,
} from "../controllers/Book.controller";
import { authorRouteProtection } from "../middleware/authMiddleware";

const router: Router = Router();

// Add a book
router.post("/add", authorRouteProtection, AddBookController);

// Update a book
router.put("/update/:id", authorRouteProtection, UpdateBookController);

export default router;
