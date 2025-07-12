import { lazy } from "react";

const ReviewSection = lazy(() => import("../review/review/ReviewSection"));
const ReviewFilter = lazy(() => import("../review/review/ReviewFilter"));
const ReviewPagination = lazy(() => import("../review/review/ReviewPagination"));
export{
    ReviewFilter,
    ReviewSection,
    ReviewPagination
}