import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    cName: {
      type: String,
      required: true,
    },
    cDescription: {
      type: String,
      required: true,
    },
    cImage: {
      type: String,
    },
    cImageURL: {
      type: String,
    },
    cStatus: {
      type: String,
      required: true,
    },
    cProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    }],
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
