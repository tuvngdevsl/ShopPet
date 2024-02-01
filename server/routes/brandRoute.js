import express from "express";
import brandController from "../controllers/brandController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, brandController.createBrand);
router.put("/:id", authMiddleware, isAdmin, brandController.updateBrand);
router.get("/", brandController.getAllBrand);
router.get("/:id", brandController.getBrandById);
router.delete("/:id", authMiddleware, isAdmin, brandController.deleteBrand);

export default router;
