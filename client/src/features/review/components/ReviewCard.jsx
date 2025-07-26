"use client";

import { StarSVG } from "@/components/components";
import DeleteBtn from "@/components/home/DeleteBtn.jsx";

export default function ReviewCard({ review, currentUserId, onDelete, isDeleting }) {
  return (
    <div
      key={review._id || `review-${Math.random()}`}
      className="rounded-2xl border-[2px] border-primary"
    >
      <div className="relative space-y-2 p-4 shadow-none">
        <div className="flex items-center gap-2">
          <div className="flex">
            <div className="flex h-[24px] gap-1 rounded-full bg-primary px-2 pt-[3px] text-[13px] text-secondary">
              {review.rating} <StarSVG color="#fff" scale={75} />
            </div>
          </div>
          <span className="text-xl font-bold">
            {review?.user?.name || "Anonymous"}
          </span>
        </div>

        <p className="px-4 text-lg font-medium">
          {review?.review?.description || "No Description"}
        </p>
        <p className="text-xl font-bold text-primary">
          {review?.review?.title || "No Title"}
        </p>
        
        {review?.user?._id === currentUserId && (
          <div
            className="absolute right-4 top-6 flex h-12 w-9 items-center justify-center rounded-md bg-[#FF1010]"
            onClick={() => !isDeleting && onDelete(review)}
          >
            <DeleteBtn />
          </div>
        )}
      </div>
    </div>
  );
}