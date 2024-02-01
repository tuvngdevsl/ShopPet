import asyncHandler from "express-async-handler";
import Brand from "../models/BrandModel.js";
import httpStatusCode from "../utils/httpStatusCode.js";
import validateId from "../utils/validateId.js";

const brandController = {
  createBrand: asyncHandler(async (req, res) => {
    try {
      const newCategory = await Brand.create(req.body);
      res.status(httpStatusCode.Created).json({
        message: "Create new brand successfully",
        data: newCategory
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  getAllBrand: asyncHandler(async (req, res) => {
    try {
      const brand = await Brand.find();
      res.status(httpStatusCode.OK).json({
        message: "Get all brand successfully",
        data: brand
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  getBrandById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const brand = await Brand.findById(id);
      res.status(httpStatusCode.OK).json({
        message: "Get brand by id successfully",
        data: brand
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  updateBrand: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const updateCategory = await Brand.findByIdAndUpdate(id, req.body, { new: true });
      res.status(httpStatusCode.OK).json({
        message: "Update brand successfully",
        data: updateCategory
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  deleteBrand: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const category = await Brand.findByIdAndDelete(id);
      res.status(httpStatusCode.OK).json({
        message: "Delete brand successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  })
};

export default brandController;
