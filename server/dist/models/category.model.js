"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true }, // SEO friendly URL string
    description: { type: String },
    parent: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category", default: null },
    ancestors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    image: {
        url: { type: String },
        public_id: { type: String },
    },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ parent: 1 });
exports.default = (0, mongoose_1.model)("Category", categorySchema);
