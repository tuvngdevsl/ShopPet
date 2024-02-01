import asyncHandler from "express-async-handler";
import BlogCategory from "../models/BlogCategoryModel.js";
import httpStatusCode from "../utils/httpStatusCode.js";
import validateId from "../utils/validateId.js";

const blogCategoryController = {
  createBlogCategory: asyncHandler(async (req, res) => {
    try {
      const newCategory = await BlogCategory.create(req.body);
      res.status(httpStatusCode.Created).json({
        message: "Create new blog category successfully",
        data: newCategory
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  getAllBlogCategory: asyncHandler(async (req, res) => {
    try {
      const category = await BlogCategory.find();
      res.status(httpStatusCode.OK).json({
        message: "Get all blog category successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  getBlogCategoryById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const category = await BlogCategory.findById(id);
      res.status(httpStatusCode.OK).json({
        message: "Get blog category by id successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  updateBlogCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const updateCategory = await BlogCategory.findByIdAndUpdate(id, req.body, { new: true });
      res.status(httpStatusCode.OK).json({
        message: "Update blog category successfully",
        data: updateCategory
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  deleteBlogCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const category = await BlogCategory.findByIdAndDelete(id);
      res.status(httpStatusCode.OK).json({
        message: "Delete blog category successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  })
};

export default blogCategoryController;
