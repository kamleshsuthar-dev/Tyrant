"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StarSVG } from "@/features/reuseable-component/StarRating";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import DeleteBtn from "@/component/home/DeleteBtn.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGoogleAuthContext } from "@/context/GoogleAuth";
import CustomPieChart from "@/features/reuseable-component/CustomPieChart";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewFilter from "./ReviewFilter";

export default function ReviewSection({ avgRating, onReviewChange }) {
  const { pId } = useParams();
  const { userDetails, isLoginUser } = useGoogleAuthContext();

  // console.log(userDetails._id);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Initialize with default rating stats
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    totalReviews: 0,
    distribution: [0, 0, 0, 0, 0],
  });
  const [reviews, setReviews] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    setRatingStats((prev) => ({ ...prev, average: avgRating }));
  }, [avgRating]);

  // New review form state
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    summary: "",
  });

  const [filterValue, setFilterValue] = useState();
  const [sortValue, setSortValue] = useState("latest");

  const handleFilter = (star) => {
    console.log(star);
    setFilterValue(star);
  };

  const handleSort = (sort) => {
    console.log(sort);
    setSortValue(sort);
  };

  // useEffect(() => {
  //   const getReview = async () => {
  //     try {
  //       let res = await axios.get(
  //         `${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${pId}/reviews`,
  //         {
  //           params: {
  //             page: 1,
  //             limit: 5,
  //             sort: sortValue,
  //             rating: filterValue,
  //           },
  //         }
  //       );
  //       console.log(res.data,"dgfgdgfdgd");
  //       console.log(res.data.totalReview);
  //       const totalReviews = res.data.totalReviews;
  //       const distributionRating = Object.values(
  //         res.data.ratingDistributionCount
  //       ).reverse();
  //       console.log(distributionRating);

  //       setReviews(res.data.reviews);
  //       setRatingStats((prevReview) => ({
  //         ...prevReview,
  //         totalReviews: totalReviews,
  //         distribution:
  //           distributionRating.length === 5
  //             ? distributionRating
  //             : [0, 0, 0, 0, 0],
  //       }));
  //     } catch (error) {
  //       console.log("review api error", error);
  //     }
  //   };
  //   getReview();
  // }, [filterValue, sortValue,pId]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage , setReviewMessage] = useState()
  const fetchReviews = async (page = 1) => {
    setReviewLoading(true);
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${pId}/reviews`,
        {
          params: {
            page,
            limit: 5,
            sort: sortValue,
            rating: filterValue,
          },
        },
      );

      const totalReviews = res.data.totalReviews;
      const newReviews = res.data.reviews;
      // console.log(res.data.reviews);

      setReviews((prev) =>
        page === 1 ? newReviews : [...prev, ...newReviews],
      );
      setRatingStats((prevReview) => ({
        ...prevReview,
        totalReviews: totalReviews,
        distribution: Object.values(
          res.data.ratingDistributionCount,
        ).reverse() || [0, 0, 0, 0, 0],
      }));
    } catch (error) {
      console.log("review api error", error);
    } finally {
      setReviewLoading(false);
    }
  };

  

  useEffect(() => {
    setCurrPage(1); // reset page when sort/filter changes
    fetchReviews(1);
  }, [sortValue, filterValue,pId]);
  const reviewPagination = () => {
    const totalPages = Math.ceil(ratingStats.totalReviews / 5);
    if (currPage < totalPages) {
      const nextPage = currPage + 1;
      setCurrPage(nextPage);
      fetchReviews(nextPage);
    } else {
      console.log("No more reviews");
      setReviewMessage("No more reviews")
    }
  };

  const addReview = () => {
    if (!isLoginUser) {
      alert("not login yet !");
      return;
    }
    setIsDialogOpen(true);
  };

  // In your handleSubmitReview function, modify it to ensure the new review has the exact same structure as those from the API
  const handleSubmitReview = async (e) => {
    setIsButtonDisabled(true);
    e.preventDefault();
    setErrorMessage("");
    if (!isLoginUser) return alert("login first ");

    if (!newReview.rating || !newReview.comment || !newReview.summary) {
      setErrorMessage("Please fill in all fields");
      setIsButtonDisabled(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_ADD_PRODUCT_REVIEW}`,
        {
          productId: pId,
          rating: newReview.rating,
          reviewTitle: newReview.comment,
          reviewDescription: newReview.summary,
        },
      );

      console.log("Review submission response:", res.data); // Debug: Log the actual response

      if (res.status === 200 || res.status === 201) {
        // After successful submission, fetch the updated reviews instead of manually creating one
        const updatedReviewsResponse = await axios.get(
          `${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${pId}/reviews`,
          {
            params: {
              page: 1,
              limit: 10,
              sort: sortValue,
              rating: filterValue,
            },
          },
        );

        // Update the state with the fresh data from the API
        setReviews(updatedReviewsResponse.data.reviews);
        setRatingStats((prevReview) => ({
          ...prevReview,
          totalReviews: updatedReviewsResponse.data.totalReviews,
          distribution: Object.values(
            updatedReviewsResponse.data.ratingDistributionCount,
          ).reverse(),
        }));

        if (onReviewChange) {
          onReviewChange();
        }
        // Reset the form
        setNewReview({ rating: 0, comment: "", summary: "" });
        setIsDialogOpen(false);
      } else {
        setErrorMessage("Failed to add review. Please try again.");
      }
    } catch (error) {
      console.error("Error adding review:", error?.response?.data?.error);

      if (
        error?.response?.data?.error ===
        "You have already reviewed this product"
      ) {
        setErrorMessage("You have already reviewed this product");

        setTimeout(() => {
          setErrorMessage("");
          setIsDialogOpen(false);
          setNewReview({ rating: 0, comment: "", summary: "" });
        }, 1500);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
    setIsButtonDisabled(false);
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBtn = async (review) => {
    if (!review?._id || isDeleting) return;

    try {
      setIsDeleting(true);
      console.log("Attempting to delete review with ID:", review._id); // Debug

      const res = await axios.delete(
        `${import.meta.env.VITE_DELETE_PRODUCT_REVIEW}/${review._id}`,
      );
      console.log("Delete response:", res); // Debug

      if (res.status === 200 || res.status === 201) {
        // After successful deletion, fetch the updated reviews instead of manually calculating
        const updatedReviewsResponse = await axios.get(
          `${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${pId}/reviews`,
          {
            params: {
              page: 1,
              limit: 10,
              sort: sortValue,
              rating: filterValue,
            },
          },
        );

        // Update the state with the fresh data from the API
        setReviews(updatedReviewsResponse.data.reviews);
        setRatingStats((prevReview) => ({
          ...prevReview,
          totalReviews: updatedReviewsResponse.data.totalReviews,
          distribution: Object.values(
            updatedReviewsResponse.data.ratingDistributionCount,
          ).reverse(),
        }));

        if (onReviewChange) {
          onReviewChange();
        }
      } else {
        console.error("Failed to delete review with status:", res.status);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto relative max-w-4xl space-y-6 p-4">
      {/* review add  */}
      <div className="flex flex-wrap items-start justify-between">
        <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
        <ReviewFilter handleSort={handleSort} handleFilter={handleFilter} />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button variant="outline" className="gap-2" onClick={addReview}>
            <span className="text-lg">+</span> Add Review
          </Button>

          <DialogContent
            className="sm:max-w-[425px]"
            aria-describedby="review-dialog-description"
          >
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>

            <div
              id="review-dialog-description"
              className="mb-2 text-sm text-muted-foreground"
            >
              Share your thoughts about the product.
            </div>

            {errorMessage && (
              <div className="font-medium text-red-600">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newReview.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Review Title</Label>
                <Input
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  placeholder="Brief title for your review"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Review Description</Label>
                <Textarea
                  id="summary"
                  value={newReview.summary}
                  onChange={(e) =>
                    setNewReview({ ...newReview, summary: e.target.value })
                  }
                  placeholder="Write your detailed review here..."
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isButtonDisabled}
              >
                Submit Review
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid h-[75vh] gap-8 md:grid-cols-2">
        {/* Rating Overview */}
        {reviews && reviews.length > 0 ? (
          <>
            <div className="mt-12 max-w-[380px] space-y-8">
              <div className="flex flex-col items-center justify-center gap-4">
                <CustomPieChart average={ratingStats.average} />
                <div className="text-[24px] font-semibold text-[#202020]">
                  <div className="text-center font-semibold">
                    {ratingStats.totalReviews.toLocaleString()}
                  </div>
                  <div> Ratings & Reviews</div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingStats.distribution.map((count, index) => (
                  <div key={5 - index} className="flex items-center gap-[20px]">
                    <div className="flex items-center justify-center gap-1 rounded-full bg-[#202020] p-1 px-3 text-white">
                      <div className="flex w-[30px] gap-1 text-sm">
                        {5 - index} <StarSVG color="#fff" />
                      </div>
                      <Progress
                        value={(count / ratingStats.totalReviews) * 100}
                        className="h-[11px] w-[268px]"
                        color={
                          Math.max(...ratingStats.distribution) ===
                          ratingStats.distribution[index]
                            ? "#9EFF00"
                            : "#FFFFFF"
                        }
                      />
                    </div>
                    {/* <Progress value={(count / Math.max(...ratingStats.distribution)) * 100} className="h-2" /> */}
                    <div className="w-16 pl-1 text-right text-lg font-bold text-[#202020]">
                      {count.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Reviews List */}
        <div className="no-scrollbar  max-h-full space-y-4 overflow-scroll">
        
          {
          reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id || `review-${Math.random()}`}
                className="rounded-2xl border-[2px] border-[#202020]"
              >
                <div className="relative space-y-2 p-4 shadow-none">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <div className="flex h-[24px] gap-1 rounded-full bg-[#202020] px-2 pt-[3px] text-[13px] text-white">
                        {review.rating} <StarSVG color="#fff" scale={75} />
                      </div>
                      {/* <StarRating rating={review.rating} Pcolor="#202020" Scolor="#e6e3e0 " /> */}
                    </div>
                    <span className="text-xl font-bold">
                      {review?.user?.name || "Anonymous"}
                    </span>
                  </div>

                  <p className="px-4 text-lg font-medium">
                    {review?.review?.description || "No Description"}
                  </p>
                  <p className="text-xl font-bold text-black">
                    {review?.review?.title || "No Title"}
                  </p>
                  {review?.user?._id === userDetails?._id && (
                    <div
                      className="absolute right-4 top-6 flex h-12 w-9 items-center justify-center rounded-md bg-[#FF1010]"
                      onClick={() => deleteBtn(review)}
                    >
                      <DeleteBtn />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              No reviews yet. Be the first to add one!
            </div>
          )}

         
        </div>
      </div>
     
      {reviews && ratingStats.totalReviews && (
        <Button variant="outline" onClick={reviewPagination} className="w-full">
              {reviewLoading ? "Loading..." : reviewMessage ? "No more reviews" : "See More"}
        </Button>
      )}
    </div>
  );
}
