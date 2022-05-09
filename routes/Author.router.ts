import { Router } from "express";
import { AddAuthorController } from "../controllers/Author.controller";

const router: Router = Router();

router.post("/add", AddAuthorController);

export default router;
