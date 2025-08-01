import { Schema, model } from "mongoose";
const categorySchema = new Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true }, // SEO friendly URL string
    description: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    ancestors: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    image: {
        url: { type: String },
        public_id: { type: String },
    },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ parent: 1 });
export default model("Category", categorySchema);
//# sourceMappingURL=category.model.js.map