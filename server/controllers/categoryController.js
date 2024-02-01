import asyncHandler from "express-async-handler";
import Category from "../models/CategoryModel.js";
import httpStatusCode from "../utils/httpStatusCode.js";
import validateId from "../utils/validateId.js";

const categoryController = {
  createCategory: asyncHandler(async (req, res) => {
    try {
      const newCategory = await Category.create(req.body);
      res.status(httpStatusCode.Created).json({
        message: "Create new category successfully",
        data: newCategory
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  getAllCategory: asyncHandler(async (req, res) => {
    try {
      const category = await Category.find();
      res.status(httpStatusCode.OK).json({
        message: "Get all category successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  getCategoryById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const category = await Category.findById(id);
      res.status(httpStatusCode.OK).json({
        message: "Get category by successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  updateCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const updateCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
      res.status(httpStatusCode.OK).json({
        message: "Update category successfully",
        data: updateCategory
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  deleteCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const category = await Category.findByIdAndDelete(id);
      res.status(httpStatusCode.OK).json({
        message: "delete category successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  })
};

export default categoryController;
