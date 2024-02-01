import express from "express";
import colorController from "../controllers/colorController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, colorController.createcolor);
router.put("/:id", authMiddleware, isAdmin, colorController.updatecolor);
router.get("/", colorController.getAllcolor);
router.get("/:id", colorController.getcolorById);
router.delete("/:id", authMiddleware, isAdmin, colorController.deletecolor);

export default router;
