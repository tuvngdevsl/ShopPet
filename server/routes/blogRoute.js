import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import blogController from "../controllers/blogController.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, blogController.createBlog);
router.put("/likes", authMiddleware, blogController.likeBlog);
router.put("/dislikes", authMiddleware, blogController.dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, blogController.updateBlog);
router.get("/:id", blogController.getBlogById);
router.get("/", blogController.getAllBlog);
router.delete("/:id", authMiddleware, isAdmin, blogController.deleteBlog);
export default router;
