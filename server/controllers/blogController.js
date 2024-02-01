import Blog from "../models/BlogModel.js";
import User from "../models/UserModel.js";
import asyncHandle from "express-async-handler";
import validateId from "../utils/validateId.js";
import httpStatusCode from "../utils/httpStatusCode.js";

const blogController = {
  createBlog: asyncHandle(async (req, res) => {
    try {
      const newBlog = await Blog.create(req.body);
      res.status(httpStatusCode.Created).json({
        message: "Create new Blog successfully",
        data: newBlog
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  updateBlog: asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateId(id);

    try {
      const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      res.status(httpStatusCode.OK).json({
        message: "Update Blog successfully",
        data: updateBlog
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  deleteBlog: asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateId(id);

    try {
      const deleteBlog = await Blog.findByIdAndDelete(id);
      res.status(httpStatusCode.OK).json({
        message: "Delete Blog successfully",
        deleteBlog
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  getBlogById: asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const getBlogById = await Blog.findById(id).populate("likes").populate("dislikes");

      const updateView = await Blog.findByIdAndUpdate(
        id,
        {
          $inc: { numViews: 1 }
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Get Blog by Id successfully",
        data: getBlogById
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  getAllBlog: asyncHandle(async (req, res) => {
    try {
      const getAllBlog = await Blog.find();
      res.status(httpStatusCode.OK).json({
        message: "Get Blog successfully",
        data: getAllBlog
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  likeBlog: asyncHandle(async (req, res) => {
    const { blogId } = req.body;
    validateId(blogId);
    console.log(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // Find the login user
    const loginUserId = req?.user._id;
    // Find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // Find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      userId => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Disliked successfully",
        blog: blog
      });
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Liked successfully",
        blog: blog
      });
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Liked successfully",
        blog: blog
      });
    }
  }),

  dislikeBlog: asyncHandle(async (req, res) => {
    const { blogId } = req.body;
    validateId(blogId);
    console.log(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // Find the login user
    const loginUserId = req?.user._id;
    // Find if the user has liked the blog
    const isDisliked = blog?.isDisliked;
    // Find if the user has disliked the blog
    const alreadyLiked = blog?.dislikes?.find(
      userId => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Disliked successfully",
        blog: blog
      });
    }
    if (isDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "DisLiked successfully",
        blog: blog
      });
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Disliked successfully",
        blog: blog
      });
    }
  })
};

export default blogController;
