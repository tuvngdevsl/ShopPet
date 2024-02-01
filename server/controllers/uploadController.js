import asyncHandler from "express-async-handler";
import { cloudinaryUploadImg, cloudinaryDeleteImg } from "../utils/cloudinary.js";
import httpStatusCode from "../utils/httpStatusCode.js";
import fs from "fs";

//Upload Image

const uploadImage = asyncHandler(async (req, res) => {
  try {
    const uploader = path => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
    }
    const images = urls.map(file => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.status(httpStatusCode.OK).json({
      message: "Delete image successfully",
      data: deleted
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { uploadImage, deleteImage };
