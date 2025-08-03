"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import ReviewCard from "./ReviewCard";
import { StarSVG } from "@/components/components";
import { ArrowSVG } from "@/components/components/component/CommonSVG";
import AddReview from "./AddReview";

export default function ReviewsList({
  pId ,
  isOpen,
  setIsOpen,
  reviews,
  currentUserId,
  onDelete,
  isDeleting,
  fetchMore,
  hasMore,
}) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No reviews yet. Be the first to add one!
      </div>
    );
  }

  return (
    <div
      className="no-scrollbar max-h-[75vh] space-y-4 overflow-scroll mx-2 md:mx-5 "
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={reviews.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading...</h4>}
        endMessage={<p className="text-center">No more reviews</p>}
        scrollableTarget="scrollableDiv"
      >
       {isOpen ? <AddReview setIsOpen={setIsOpen} pId={pId}/>  : "" } 

        {reviews.map((review) => (
          <ReviewCard
            key={review._id || `review-${Math.random()}`}
            review={review}
            currentUserId={currentUserId}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
