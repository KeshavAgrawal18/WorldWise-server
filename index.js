import express from "express";
import cityRoutes from "./Routes/cityRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

const router = express.Router();

router.use("/api", cityRoutes);
router.use("/api", userRoutes);

export default router;
