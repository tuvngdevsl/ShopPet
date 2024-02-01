import express from "express";
import blogCategoryController from "../controllers/blogCategoryController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, blogCategoryController.createBlogCategory);
router.put("/:id", authMiddleware, isAdmin, blogCategoryController.updateBlogCategory);
router.get("/", blogCategoryController.getAllBlogCategory);
router.get("/:id", blogCategoryController.getBlogCategoryById);
router.delete("/:id", authMiddleware, isAdmin, blogCategoryController.deleteBlogCategory);

export default router;
