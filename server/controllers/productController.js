import Product from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";
import httpStatusCode from "../utils/httpStatusCode.js";
import slugify from "slugify";
import UserModel from "../models/UserModel.js";
import validateId from "../utils/validateId.js";

const productController = {
  //Create Product
  createProduct: asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }

      const newProduct = await Product.create(req.body);
      res.status(httpStatusCode.Created).json({
        message: "Create new product successfully!",
        data: newProduct
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  // Get a Product by Id
  getProductById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const product = await Product.findById(id);
      if (!product) {
        res.status(httpStatusCode.Not_Found).json({
          message: "Product not found"
        });
      }
      res.status(httpStatusCode.OK).json({
        message: "Find product successfully",
        data: product
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  // Get all a Product
  getAllProduct: asyncHandler(async (req, res) => {
    try {
      //Filter
      const queryObj = { ...req.query };
      const excludeField = ["page", "sort", "limit", "fields"];
      excludeField.forEach(el => {
        delete queryObj[el];
      });

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      let query = Product.find(JSON.parse(queryStr));

      //Sort product
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      //limiting the fields
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }

      //pagination
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) throw new Error("This page does not exist");
      }

      const product = await query;

      res.status(httpStatusCode.OK).json({
        message: "Get all product Successfully",
        data: product
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  // Update a product
  updateProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      res.status(httpStatusCode.OK).json({
        message: "Update product successfully!",
        data: updateProduct
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  //Delete a product
  deleteProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deleteProduct = await Product.findByIdAndDelete(id);
      res.status(httpStatusCode.OK).json({
        message: "Delete product successfully!",
        data: deleteProduct
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  // Add Product to wishlist
  addToWishlist: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
      const user = await UserModel.findById(_id);
      const alreadyAdded = await user.wishlist.find(id => id.toString() === prodId);
      if (alreadyAdded) {
        let user = await UserModel.findByIdAndUpdate(
          _id,
          {
            $pull: { wishlist: prodId }
          },
          {
            new: true
          }
        );
        res.status(httpStatusCode.OK).json({
          message: "Add to wishlist Successfully",
          data: user
        });
      } else {
        let user = await UserModel.findByIdAndUpdate(
          _id,
          {
            $push: { wishlist: prodId }
          },
          {
            new: true
          }
        );

        res.status(httpStatusCode.OK).json({
          message: "Uncreated to wishlist Successfully",
          data: user
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }),
  //Rating Product
  rating: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
      const product = await Product.findById(prodId);
      let alreadyRated = product.ratings.find(
        userId => userId.postedby.toString() === _id.toString()
      );
      if (alreadyRated) {
        const updateRating = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated }
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment }
          },
          {
            new: true
          }
        );
      } else {
        const rateProduct = await Product.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: _id
              }
            }
          },
          {
            new: true
          }
        );
      }
      const getAllRating = await Product.findById(prodId);
      let totalRating = getAllRating.ratings.length;
      let ratingSum = getAllRating.ratings
        .map(item => item.star)
        .reduce((pre, curr) => pre + curr, 0);
      let actualRating = Math.round(ratingSum / totalRating);
      let finalProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating
        },
        { new: true }
      );
      res.status(httpStatusCode.OK).json({
        message: "Rating Ok",
        data: finalProduct
      });
    } catch (error) {
      throw new Error(error);
    }
  })
};

export default productController;
