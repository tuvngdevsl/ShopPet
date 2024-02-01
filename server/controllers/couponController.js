import asyncHandler from "express-async-handler";
import httpStatusCode from "../utils/httpStatusCode.js";
import validateId from "../utils/validateId.js";
import Coupon from "../models/CouponModel.js";
const couponController = {
  createCoupon: asyncHandler(async (req, res) => {
    try {
      const newCoupon = await Coupon.create(req.body);
      res.status(httpStatusCode.Created).json({
        data: newCoupon,
        message: "Create new Coupon successfully"
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  getAllCoupon: asyncHandler(async (req, res) => {
    try {
      const coupon = await Coupon.find();
      res.status(httpStatusCode.OK).json({
        message: "Get all coupon successfully",
        data: coupon
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  // Get By Id
  getCouponById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const getCoupon = await Coupon.findById(id);
      res.status(httpStatusCode.OK).json({
        message: "Get coupon successfully",
        data: getCoupon
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  updateCoupon: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
      res.status(httpStatusCode.OK).json({
        message: "Update coupon successfully",
        data: updateCoupon
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  deleteCoupon: asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    validateId(id);
    try {
      const deleteCoupon = await Coupon.findByIdAndDelete(id);
      res.status(httpStatusCode.OK).json({
        message: "Delete coupon successfully"
      });
    } catch (error) {
      throw new Error(error);
    }
  })
};

export default couponController;
