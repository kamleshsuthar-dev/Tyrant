"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ReviewFilter } from "@/features/review";
import RatingOverview from "../components/RatingOverview";
import ReviewsList from "../components/ReviewsList";
import AddReviewDialog from "../components/AddReviewDialog";
import ReviewSkeleton from "../components/ReviewSkeleton";

// Redux imports
import { fetchReviews, addReview as addReviewAction, deleteReview as deleteReviewAction } from "@/store/action/reviewAction";
import { clearAddStatus, clearDeleteStatus, resetReviews,setRatingStats } from "@/store/reducer/reviewSlice";

export default function ReviewSection({ avgRating, onReviewChange }) {
  const { pId } = useParams();

  
  const { isLogin, userData } = useSelector(state => state?.auth);
  const dispatch = useDispatch();
  
 
  const { reviews, ratingStats, currPage, reviewMessage, fetchStatus, addStatus, deleteStatus,} = useSelector((state) => state?.reviews);

  const reviewLoading = fetchStatus.loading;

  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    summary: "",
  });

  // Filter and sort states
  const [filterValue, setFilterValue] = useState();
  const [sortValue, setSortValue] = useState("latest");

  // Fetch reviews function
  const fetchReviewsData = useCallback((page = 1) => {
    dispatch(fetchReviews({ page, pId, sortValue, filterValue }));
  }, [dispatch, pId,sortValue,filterValue]);

  // Pagination function
  const reviewPagination = useCallback(() => {
    const totalPages = Math.ceil(ratingStats.totalReviews / 5);
    if (currPage < totalPages) {
      const nextPage = currPage + 1;
      dispatch(fetchReviews({ page: nextPage, pId, sortValue, filterValue }));
    }
  }, [dispatch, currPage, ratingStats.totalReviews, pId, sortValue, filterValue]);

  // Set average rating when it changes
  useEffect(() => {
    if (avgRating) {
      dispatch(setRatingStats({ average: avgRating }));
    }
  }, [avgRating, dispatch]);

  // Fetch reviews when dependencies change
  useEffect(() => {
    dispatch(resetReviews());
    fetchReviewsData(1);
  }, [fetchReviewsData]);

  // Handle add review success
  useEffect(() => {
    if (addStatus.success) {
      // Refresh reviews after adding
      dispatch(resetReviews());
      fetchReviewsData(1);
      
      if (onReviewChange) {
        onReviewChange();
      }
      
      setTimeout(() => {
        dispatch(clearAddStatus());
      }, 100);
    }
  }, [addStatus.success, dispatch, fetchReviewsData, onReviewChange]);

  // Handle delete review success
  useEffect(() => {
    if (deleteStatus.success) {
      // Refresh reviews after deletion
      dispatch(resetReviews());
      fetchReviewsData(1);
      
      if (onReviewChange) {
        onReviewChange();
      }
      
      // Clear the success status after handling
      setTimeout(() => {
        dispatch(clearDeleteStatus());
      }, 100);
    }
  }, [deleteStatus.success, dispatch, fetchReviewsData, onReviewChange]);

  // Handle loading states for delete
  useEffect(() => {
    setIsDeleting(deleteStatus.loading);
  }, [deleteStatus.loading]);

  const handleFilter = (star) => {
    setFilterValue(star);
  };

  const handleSort = (sort) => {
    setSortValue(sort);
  };

  const handleAddReview = () => {
    if (!isLogin) {
      alert("not login yet !");
      return;
    }
    setIsDialogOpen(true);
  };

  const handleSubmitReview = async (e) => {
    setIsButtonDisabled(true);
    e.preventDefault();
    setErrorMessage("");
    
    if (!isLogin) {
      alert("login first ");
      setIsButtonDisabled(false);
      return;
    }

    if (!newReview.rating || !newReview.comment || !newReview.summary) {
      setErrorMessage("Please fill in all fields");
      setIsButtonDisabled(false);
      return;
    }

    const reviewObj = { 
        productId: pId, 
        rating: newReview.rating  ,
        reviewTitle : newReview.comment ,
        reviewDescription: newReview.summary
      }

    try {
      const result = await dispatch(addReviewAction(reviewObj));
      
      if (addReviewAction.fulfilled.match(result)) {
        setNewReview({ rating: 0, comment: "", summary: "" });
        setIsDialogOpen(false);
      } else if (addReviewAction.rejected.match(result)) {
        // Handle specific error cases
        const errorMsg = result.payload;
        if (errorMsg === "You have already reviewed this product") {
          setErrorMessage("You have already reviewed this product");
          setTimeout(() => {
            setErrorMessage("");
            setIsDialogOpen(false);
            setNewReview({ rating: 0, comment: "", summary: "" });
          }, 1500);
        } else {
          setErrorMessage(errorMsg || "An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error adding review:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
    
    setIsButtonDisabled(false);
  };

  const handleDeleteReview = async (review) => {
    if (!review?._id || isDeleting) return;

    try {
      await dispatch(deleteReviewAction({ 
        reviewId: review._id, 
        pId 
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Show loading skeleton on initial load
  // if (reviewLoading && reviews.length === 0) {
  //   return <ReviewSkeleton />;
  // }

  return (
    <div className="relative mx-auto max-w-4xl space-y-6 p-4">
      {/* Header with Add Review Button */}
      <div className="flex flex-wrap items-start justify-between">
        <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
        <ReviewFilter handleSort={handleSort} handleFilter={handleFilter} />
        
        <Button variant="outline" className="gap-2" onClick={handleAddReview}>
          <span className="text-lg">+</span> Add Review
        </Button>

        <AddReviewDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          newReview={newReview}
          setNewReview={setNewReview}
          onSubmit={handleSubmitReview}
          errorMessage={errorMessage}
          isSubmitting={isButtonDisabled || addStatus.loading}
        />
      </div>

      {/* Show error messages */}
      {fetchStatus.error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            Error loading reviews: {fetchStatus.error}
          </div>
        </div>
      )}

      {addStatus.error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            {addStatus.error}
          </div>
        </div>
      )}

      {deleteStatus.error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            Error deleting review: {deleteStatus.error}
          </div>
        </div>
      )}

      <div className="grid lg:h-[75vh] gap-8 md:grid-cols-2">
        {reviews && reviews.length > 0 && (
          <RatingOverview ratingStats={ratingStats} />
        )}

        <ReviewsList
          reviews={reviews}
          currentUserId={userData?._id}
          onDelete={handleDeleteReview}
          isDeleting={isDeleting}
          fetchMore={reviewPagination} // 👈 pass this
           hasMore={currPage < Math.ceil(ratingStats.totalReviews / 5)} // 👈 pass this
        />
      </div>

      {/* Pagination Button */}
      {reviews && ratingStats.totalReviews && (
        <Button
          variant="secondary"
          onClick={reviewPagination}
          className="w-full"
          disabled={reviewLoading}
        >
          {/* {reviewLoading
            ? "Loading..."
            : reviewMessage || (currPage >= Math.ceil(ratingStats.totalReviews / 5))
              ? "No more reviews"
              : "See More"} */}
              See More
        </Button>
      )}

      {/* Loading indicator for additional reviews */}
      {/* {reviewLoading && reviews.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="text-sm text-gray-500">Loading more reviews...</div>
        </div>
      )} */}
    </div>
  );
}


