import { Router } from "express";
import { createUser, login, getAllUsers, getUserById } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.post('/register', createUser);
router.post('/login', login);
router.get('/users', authenticate, getAllUsers);
router.get('/users/:userId', authenticate, getUserById);

export default router;