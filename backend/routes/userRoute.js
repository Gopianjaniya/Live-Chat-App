import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/", isAuthenticated, getOtherUsers);

export default router;
