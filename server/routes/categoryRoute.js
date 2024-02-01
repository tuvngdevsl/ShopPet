import express from "express";
import categoryController from "../controllers/categoryController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, categoryController.createCategory);
router.put("/:id", authMiddleware, isAdmin, categoryController.updateCategory);
router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.delete("/:id", authMiddleware, isAdmin, categoryController.deleteCategory);

export default router;
