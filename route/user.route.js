import express from "express";
import { login, signup } from "../controller/user.controller.js";
// import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
