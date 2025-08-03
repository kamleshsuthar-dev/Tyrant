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
import { DottedLine } from "@/components/components";

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
    setIsDialogOpen(prev => !prev);
  };

  // const handleSubmitReview = async (e) => {
  //   setIsButtonDisabled(true);
  //   e.preventDefault();
  //   setErrorMessage("");
    
  //   if (!isLogin) {
  //     alert("login first ");
  //     setIsButtonDisabled(false);
  //     return;
  //   }

  //   if (!newReview.rating || !newReview.comment || !newReview.summary) {
  //     setErrorMessage("Please fill in all fields");
  //     setIsButtonDisabled(false);
  //     return;
  //   }

  //   const reviewObj = { 
  //       productId: pId, 
  //       rating: newReview.rating  ,
  //       reviewTitle : newReview.comment ,
  //       reviewDescription: newReview.summary
  //     }

  //   try {
  //     const result = await dispatch(addReviewAction(reviewObj));
      
  //     if (addReviewAction.fulfilled.match(result)) {
  //       setNewReview({ rating: 0, comment: "", summary: "" });
  //       setIsDialogOpen(false);
  //     } else if (addReviewAction.rejected.match(result)) {
  //       // Handle specific error cases
  //       const errorMsg = result.payload;
  //       if (errorMsg === "You have already reviewed this product") {
  //         setErrorMessage("You have already reviewed this product");
  //         setTimeout(() => {
  //           setErrorMessage("");
  //           setIsDialogOpen(false);
  //           setNewReview({ rating: 0, comment: "", summary: "" });
  //         }, 1500);
  //       } else {
  //         setErrorMessage(errorMsg || "An error occurred. Please try again.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error adding review:", error);
  //     setErrorMessage("An error occurred. Please try again.");
  //   }
    
  //   setIsButtonDisabled(false);
  // };

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
    <div  className="w-full text-secondary bg-primary px-2">
    <div className="relative mx-auto max-w-8xl space-y-6 ">
       
      <div className="flex flex-wrap items-start justify-between">
        <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
        {/* <ReviewFilter handleSort={handleSort} handleFilter={handleFilter} /> */}
        <div className="space-x-2">
        <Button variant="outline" className="px-5 py-1 bg-primary !rounded-2xl outline outline-[1.50px] outline-offset-[-1.50px] outline-secondary inline-flex justify-center items-center gap-2.5" onClick={handleAddReview}>
          <span className="text-base font-medium ">+</span> Add Review
        </Button>
        <Button variant="secondary" className="rounded-xl w-9 h-9 p-1.5 " onClick={handleAddReview}>
          {/* <span className="text-lg">+</span> Add Review */}
          <img src="/svg/filterIcon.svg" alt="" />
        </Button>
        </div>
        

    
      </div>

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

      <div className="grid lg:h-[75vh] xl:gap-8 gap-4 md:grid-cols-3">
        <div className="col-span-1">
        {reviews && reviews.length > 0 && (
          <RatingOverview ratingStats={ratingStats} />
        )}
        </div>
        <div className="col-span-2 ">
        <ReviewsList
          pId={pId}
          isOpen={isDialogOpen}
          setIsOpen = {setIsDialogOpen}
          reviews={reviews}
          currentUserId={userData?._id}
          onDelete={handleDeleteReview}
          isDeleting={isDeleting}
          fetchMore={reviewPagination} // 👈 pass this
          hasMore={currPage < Math.ceil(ratingStats.totalReviews / 5)} // 👈 pass this
          />
          </div>
      </div>

    

      {reviews && ratingStats.totalReviews && (
        <Button
          variant="outline"
          onClick={reviewPagination}
          className="w-full"
          disabled={reviewLoading}
        >
       
              See More
        </Button>
      )}

   
    </div>
    </div>
  );
}


