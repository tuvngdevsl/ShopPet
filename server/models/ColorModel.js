import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var colorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

//Export the model
const color = mongoose.model("color", colorSchema);
export default color;
