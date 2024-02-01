import Order from "../models/orderModel.js";
import User from "../models/UserModel.js";
import asyncHandle from "express-async-handler";
import httpStatusCode from "../utils/httpStatusCode.js";
import { generateToken, generateRefreshToken } from "../config/jwt.js";
import validateId from "../utils/validateId.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import emailController from "./emailController.js";
import Cart from "../models/cartModel.js";
import Product from "../models/ProductModel.js";
import Coupon from "../models/CouponModel.js";
import uniqid from "uniqid";

const userController = {
  register: asyncHandle(async (req, res) => {
    const { email, firstname, lastname, password, phone } = req.body;
    const findUser = await User.findOne({ email });
    const findPhone = await User.findOne({ phone });
    if (!findUser && !findPhone) {
      // Register a new user

      const registerUser = await User.create({
        firstname,
        lastname,
        fullname: firstname + " " + lastname,
        email,
        phone,
        password
      });

      res.status(httpStatusCode.Created).json({
        message: "Register user successfully",
        data: registerUser
      });
    } else {
      // User existed
      throw new Error("User already Exists or Phone already Exists");
    }
  }),

  login: asyncHandle(async (req, res) => {
    const { email, password } = req.body;
    //Check user if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const token = generateToken(findUser?._id);
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updateUser = await User.findByIdAndUpdate(
        findUser?.id,
        {
          refreshToken: refreshToken
        },
        { new: true }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
      });
      return res.status(httpStatusCode.OK).json({
        message: "Login successfully",
        token: token
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  }),
  //Admin Login
  adminLogin: asyncHandle(async (req, res) => {
    const { email, password, firstname, lastname, phone } = req.body;
    //Check user if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin?.role !== "admin") throw new Error("Not authorized");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const token = generateToken(findAdmin?._id);
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateUser = await User.findByIdAndUpdate(
        findAdmin?.id,
        {
          refreshToken: refreshToken
        },
        { new: true }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
      });
      return res.status(httpStatusCode.OK).json({
        message: "Admin Login successfully",
        token: token
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  }),

  // Get all user
  getAllUser: asyncHandle(async (req, res) => {
    try {
      const getAllUser = await User.find().populate("wishlist");
      res.status(httpStatusCode.OK).json({
        message: "Get all User successfully",
        data: getAllUser
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  // Get user by id
  getUserById: asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const getUserById = await User.findById(id);

      res.status(httpStatusCode.OK).json({
        message: "Get user successfully",
        data: getUserById
      });
    } catch (error) {
      throw new Error("User not found");
    }
  }),

  //handle refresh token
  handleRefreshToken: asyncHandle(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No refreshToken present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (error, decoded) => {
      if (error || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken(user?.id);
      res.status(httpStatusCode.OK).json({
        Token: accessToken
      });
    });
  }),
  //Update User
  updateUser: asyncHandle(async (req, res) => {
    const { _id } = req.user;
    validateId(_id);
    const { firstname, lastname, email, password, fullname, phone } = req.body;
    try {
      const updateUser = await User.findByIdAndUpdate(
        _id,
        {
          firstname,
          lastname,
          email,
          fullname: firstname + lastname,
          phone
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Update User successfully",
        data: updateUser
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  //Delete User
  deleteUser: asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const deleteUser = await User.findByIdAndDelete(id);

      res.status(httpStatusCode.OK).json({
        message: "Delete user successfully",
        deleteUser
      });
    } catch (error) {
      throw new Error("User not found");
    }
  }),
  // Delete all user
  deleteAllUser: asyncHandle(async (req, res) => {
    try {
      const deleteAllUser = await User.deleteMany();
      res.status(httpStatusCode.OK).json({
        message: "Delete all user successfully",
        data: deleteAllUser
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  blockUser: asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const block = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Block user successfully!",
        data: block
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  unblockUser: asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const unblock = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Unblock user successfully!",
        data: unblock
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  //Logout Function
  logout: asyncHandle(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
      });
      return res.sendStatus(204);
    }
    await User.findOneAndUpdate(
      { refreshToken: refreshToken },
      {
        refreshToken: ""
      }
    );
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true
    });

    return res.sendStatus(204);
  }),
  //update password
  updatePassword: asyncHandle(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateId(_id);
    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      const updatePassword = await user.save();
      res.status(httpStatusCode.OK).json({
        message: "Update password successfully",
        newPassword: updatePassword
      });
    } else {
      res.json(user);
    }
  }),
  //Forgot password

  forgotPasswordToken: asyncHandle(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetUrl = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href="http:localhost:3000/api/user/reset-password/${token}">Click here</a>`;
      const data = {
        to: email,
        text: "Hey User",
        subject: "Forgot password link",
        html: resetUrl
      };

      emailController.sendEmail(data);

      res.status(httpStatusCode.OK).json({
        message: "Send email successfully",
        token: token
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  //reset password
  resetPassword: asyncHandle(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) throw new Error("Token Expires, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(httpStatusCode.OK).json({
      message: "Reset password Ok",
      data: user
    });
  }),

  //get WishLish
  getWishList: asyncHandle(async (req, res) => {
    const { _id } = req.user;
    try {
      const findUser = await User.findById(_id).populate("wishlist");
      res.status(httpStatusCode.OK).json({
        message: "Get wishlist successfully",
        data: findUser
      });
    } catch (error) {}
  }),

  saveUserAddress: asyncHandle(async (req, res) => {
    const { _id } = req.user;
    validateId(_id);
    try {
      const saveAddress = await User.findByIdAndUpdate(
        _id,
        {
          address: req?.body?.address
        },
        {
          new: true
        }
      );
      res.status(httpStatusCode.OK).json({
        message: "Save address successfully",
        data: saveAddress
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  //User cart
  userCart: asyncHandle(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    validateId(_id);
    try {
      let products = [];
      const user = await User.findById(_id);
      const alreadyExistCart = await Cart.findOne({ orderby: user._id });
      if (alreadyExistCart) {
        alreadyExistCart.remove();
      }
      for (let i = 0; i < cart.length; i++) {
        let obj = {};
        obj.product = cart[i]._id;
        obj.count = cart[i].count;
        obj.color = cart[i].color;
        let getPrice = await Product.findById(cart[i]._id).select("price").exec();
        obj.price = getPrice.price;
        products.push(obj);
      }
      let cartTotal = 0;
      for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
      }
      let newCart = await new Cart({
        products,
        cartTotal,
        orderby: user?._id
      }).save();
      res.status(httpStatusCode.Created).json({
        message: "Add to cart successfully",
        Cart: newCart
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  // Get User cart
  getUserCart: asyncHandle(async (req, res) => {
    const { _id } = req.user;
    validateId(_id);
    try {
      const cart = await Cart.findOne({ orderby: _id }).populate("products.product");
      res.status(httpStatusCode.OK).json({
        message: "Get Cart successfully",
        cart: cart
      });
    } catch (error) {
      throw new Error(error);
    }
  }),
  //Empty Cart
  emptyCart: asyncHandle(async (req, res) => {
    const { _id } = req.user;
    validateId(_id);
    try {
      const user = await User.findOne({ _id });
      const cart = await Cart.findOneAndDelete({ orderby: user._id });

      res.status(httpStatusCode.OK).json({
        message: "Empty cart",
        cart: cart
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  applyCoupon: asyncHandle(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      throw new Error("Invalid Coupon");
    }
    const user = await User.findOne({ _id });
    let { cartTotal } = await Cart.findOne({ orderby: user._id }).populate("products.product");
    let totalAfterDiscount = (cartTotal - (cartTotal - validCoupon.discount) / 100).toFixed(2);
    await Cart.findOneAndUpdate({ orderby: user._id }, { totalAfterDiscount }, { new: true });

    res.status(httpStatusCode.OK).json({
      message: "Apply coupon successfully",
      totalAfterDiscount: totalAfterDiscount
    });
  }),

  createOrder: asyncHandle(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateId(_id);

    try {
      if (!COD) throw new Error("Create cash order failed");
      const user = await User.findById(_id);
      let userCart = await Cart.findOne({ orderby: user?._id });
      let finalAmount = 0;
      if (couponApplied && userCart.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount;
      } else {
        finalAmount = userCart.cartTotal;
      }

      let newOrder = await new Order({
        products: userCart.products,
        paymentIntent: {
          id: uniqid(),
          method: "COD",
          amount: finalAmount,
          status: "Cash on Delivery",
          created: Date.now(),
          currency: "usd"
        },
        orderby: user._id,
        orderStatus: "Cash on Delivery"
      }).save();

      let update = userCart.products.map(item => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.count, solid: +item.count } }
          }
        };
      });

      const updated = await Product.bulkWrite(update);
      res.status(httpStatusCode.Created).json({
        message: "Order successfully",
        order: newOrder
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  getOrder: asyncHandle(async (req, res) => {
    const { _id } = req.user;
    validateId(_id);
    try {
      const userOrders = await Order.findOne({ orderby: _id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.status(httpStatusCode.OK).json({
        message: "Get Order successfully",
        data: userOrders
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  getAllOrders: asyncHandle(async (req, res) => {
    try {
      const getAllOrders = await Order.find().populate("products.product").populate("orderby");
      res.status(httpStatusCode.OK).json({
        message: "Get All Order successfully",
        data: getAllOrders
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  getOrderByUserId: asyncHandle(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
      const userOrders = await Order.findOne({ orderby: id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.status(httpStatusCode.OK).json({
        message: "Get Order successfully",
        data: userOrders
      });
    } catch (error) {
      throw new Error(error);
    }
  }),

  updateOrderStatus: asyncHandle(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    validateId(id);

    try {
      const updateOrderStatus = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
          paymentIntent: {
            status: status
          }
        },
        { new: true }
      );
      res.status(httpStatusCode.OK).json({
        message: "Update status successfully!",
        updateOrderStatus
      });
    } catch (error) {
      throw new Error(error);
    }
  })
};

export default userController;
