import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ReviewsPagination = ({ productId, reviewsPerPage = 3 }) => {
  // State variables
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortValue, setSortValue] = useState("newest");
  const [filterValue, setFilterValue] = useState("all");

  
  // Fetch reviews when page changes
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${productId}/reviews`,
          {
            params: {
              page: currentPage,
              limit: reviewsPerPage,
              sort: sortValue,
              rating: filterValue,
            },
          }
        );

        // Update state with API response
        setReviews(res.data.reviews);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, currentPage, sortValue, filterValue, reviewsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];

    // First page is always shown
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Add ellipsis if there's a gap between first page and current page region
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Pages around current page (but not first or last)
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i > 1 && i < totalPages) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Add ellipsis if there's a gap between current page region and last page
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Last page is always shown (if there's more than one page)
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div>
      {/* Reviews would be rendered here */}
      {loading ? (
        <div className="text-center py-4">Loading reviews...</div>
      ) : (
        <div>
          {/* Your reviews list component here */}
        </div>
      )}

      {/* Pagination component - only show if we have pages */}
      {totalPages > 0 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              {/* Previous button */}
              <PaginationItem>
                <PaginationPrevious 
                  onClick={handlePrevious} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {/* Page numbers and ellipses */}
              {renderPaginationItems()}

              {/* Next button */}
              <PaginationItem>
                <PaginationNext 
                  onClick={handleNext} 
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          {/* Optional page indicator */}
          <div className="text-center text-sm text-gray-500 mt-2">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPagination;