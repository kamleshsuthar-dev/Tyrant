"use client";

import { useState, useEffect } from "react";
import axios from '@/Utils/axios';

export function useReviews(pId, sortValue, filterValue, onReviewChange) {
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    totalReviews: 0,
    distribution: [0, 0, 0, 0, 0],
  });
  const [currPage, setCurrPage] = useState(1);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState();

  const fetchReviews = async (page = 1) => {
    setReviewLoading(true);
    try {
      let res = await axios.get(`/product/single-product/${pId}/reviews`,
        {
          params: {
            page,
            limit: 5,
            sort: sortValue,
            rating: filterValue,
          },
        },
      );
            // console.log(res.data);
            
      const totalReviews = res.data.totalReviews;
      const newReviews = res.data.reviews;

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

  const reviewPagination = () => {
    const totalPages = Math.ceil(ratingStats.totalReviews / 5);
    if (currPage < totalPages) {
      const nextPage = currPage + 1;
      setCurrPage(nextPage);
      fetchReviews(nextPage);
    } else {
      console.log("No more reviews");
      setReviewMessage("No more reviews");
    }
  };
  

  const addReview = async (productId, reviewData) => {
    try {
        const res = await axios.post(`/product/add-product`,
      {
        productId,
        rating: reviewData.rating,
        reviewTitle: reviewData.comment,
        reviewDescription: reviewData.summary,
      },
    );

    if (res.status === 200 || res.status === 201) {
      // Refresh reviews after adding
      const updatedReviewsResponse = await axios.get(`${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${productId}/reviews`,
        {
          params: {
            page: 1,
            limit: 10,
            sort: sortValue,
            rating: filterValue,
          },
        },
      );

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
    }

    return res;
    } catch (error) {
      console.log(error);
      
    }
  
  };

  const deleteReview = async (reviewId) => {
    const res = await axios.delete(
      `/product/delete-product/${reviewId}`,
    );

    if (res.status === 200 || res.status === 201) {
      // Refresh reviews after deletion
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
    }

    return res;
  };

  useEffect(() => {
    setCurrPage(1);
    fetchReviews(1);
  }, [sortValue, filterValue, pId]);

  return {
    reviews,
    ratingStats,
    reviewLoading,
    reviewMessage,
    fetchReviews,
    reviewPagination,
    addReview,
    deleteReview,
    setRatingStats
  };
}