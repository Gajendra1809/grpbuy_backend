import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.post('/categories', authenticate, createCategory);
router.get('/categories', authenticate, getAllCategories);

export default router;