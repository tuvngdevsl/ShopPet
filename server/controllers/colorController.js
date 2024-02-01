import asyncHandler from "express-async-handler";
import color from "../models/colorModel.js";
import httpStatusCode from "../utils/httpStatusCode.js";
import validateId from "../utils/validateId.js";

const colorController = {
  createcolor: asyncHandler(async (req, res) => {
    try {
      const newCategory = await color.create(req.body);
      res.status(httpStatusCode.Created).json({
        message: "Create new color successfully",
        data: newCategory
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  getAllcolor: asyncHandler(async (req, res) => {
    try {
      const category = await color.find();
      res.status(httpStatusCode.OK).json({
        message: "Get all color successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  getcolorById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const category = await color.findById(id);
      res.status(httpStatusCode.OK).json({
        message: "Get color by id successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  updatecolor: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const updateCategory = await color.findByIdAndUpdate(id, req.body, { new: true });
      res.status(httpStatusCode.OK).json({
        message: "Update color successfully",
        data: updateCategory
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  deletecolor: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const category = await color.findByIdAndDelete(id);
      res.status(httpStatusCode.OK).json({
        message: "Delete color successfully",
        data: category
      });
    } catch (error) {
      throw new Error(error);
    }
  })
};

export default colorController;
