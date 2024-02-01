import { deleteImage, uploadImage } from "../controllers/uploadController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { productImgResize, uploadPhoto } from "../middlewares/uploadImages.js";
import express from "express";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImage
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImage);

export default router;
