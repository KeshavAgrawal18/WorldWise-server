import express from "express";
import { createNewUser, getUserLogin } from "../Controllers/userController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddlewares.js";
const router = express.Router();

router.post("/signup", authenticationMiddleware, createNewUser);

router.post("/login", authenticationMiddleware, getUserLogin);

export default router;
