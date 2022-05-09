import { Router } from "express";
import HomeController from "../controllers/Home.controller";

const router: Router = Router();

router.get("/", HomeController);

export default router;
