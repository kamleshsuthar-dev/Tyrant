"use client";

import ReviewCard from "./ReviewCard";

export default function ReviewsList({ 
  reviews, 
  currentUserId, 
  onDelete, 
  isDeleting 
}) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No reviews yet. Be the first to add one!
      </div>
    );
  }

  return (
    <div className="no-scrollbar max-h-[75vh] space-y-4 overflow-scroll">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id || `review-${Math.random()}`}
          review={review}
          currentUserId={currentUserId}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}