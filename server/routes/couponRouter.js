import express from "express";
import couponController from "../controllers/couponController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", authMiddleware, isAdmin, couponController.getAllCoupon);
router.get("/:id", authMiddleware, isAdmin, couponController.getCouponById);
router.post("/", authMiddleware, isAdmin, couponController.createCoupon);
router.put("/:id", authMiddleware, isAdmin, couponController.updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, couponController.deleteCoupon);

export default router;
