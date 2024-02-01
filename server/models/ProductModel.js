import mongoose from "mongoose";

var ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    images: [
      {
        public_id: String,
        url: String
      }
    ],
    color: [],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: {
          type: String
        },
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    totalrating: {
      type: String,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

//Export the model
const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
