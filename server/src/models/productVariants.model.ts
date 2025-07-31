

const productVariantSchema = new Schema<IProductVariant>({
  quantityAvailable: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, {timestamps: true});

productVariantSchema.virtual("finalPrice").get(function (this: IProductVariant) {
  return this.price * (1 - (this.discount ?? 0) / 100);
});

productVariantSchema.set("toJSON", { virtuals: true });
productVariantSchema.set("toObject", { virtuals: true });

export default model<IProductVariant>("ProductVariant", productVariantSchema);
