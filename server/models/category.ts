import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parent?: Types.ObjectId;
  ancestors?: Types.ObjectId[];
  image?: string;
  isActive: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true }, // SEO friendly URL string
    description: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    ancestors: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    image: { type: String }, // category banner or thumbnail
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ parent: 1 });

export default model<ICategory>("Category", categorySchema);