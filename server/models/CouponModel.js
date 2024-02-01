import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var CouponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    expiry: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
  },
  {
    timestamps: true
  }
);

//Export the model
const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
