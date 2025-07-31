import productModels from "../../models/product.models.js";
import productReviewModels from "../../models/productReview.models.js";

export const updateProductRating = async (productId) => {
  try {
    const result = await productReviewModels.aggregate([
      {
        $match: {
          _id: {
            $in: (await productModels.findById(productId).select("pReviews"))
              .pReviews,
          },
        },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    const { avgRating = 0, reviewCount = 0 } = result[0] || {};

    await productModels.findByIdAndUpdate(productId, {
      avgRating: Number(avgRating.toFixed(1)),
      reviewCount,
    });
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
};
