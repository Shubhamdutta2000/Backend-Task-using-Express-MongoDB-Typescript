import { Router } from "express";
import { AddBookController } from "../controllers/Book.controller";
import { authorRouteProtection } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/add", authorRouteProtection, AddBookController);

export default router;
