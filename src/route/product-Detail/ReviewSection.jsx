
"use client"

import { useEffect, useState } from "react"
import { LogIn, Star } from "lucide-react"
import { Progress } from '@/components/ui/progress'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useGoogleAuthContext } from "@/context/GoogleAuth"
import DeleteBtn from '@/component/home/DeleteBtn.jsx'
import { useParams } from "react-router-dom"
import ReviewFilter from "./ReviewFilter"
export default function ReviewSection({avgRating , onReviewChange}) {
        const {pId} = useParams()
  const {userDetails,isLoginUser} = useGoogleAuthContext()
  
          // console.log(userDetails._id);
          
  const [reviews, setReviews] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isButtonDisabled , setIsButtonDisabled] = useState(false)
  // Initialize with default rating stats
  const [ratingStats, setRatingStats] = useState({
    average:  0,
    totalReviews: 0,
    distribution: [0,0,0,0,0],
  })

  useEffect(()=>{
    setRatingStats((prev)=>({...prev , average : avgRating}))
  },[avgRating])
  
  // New review form state
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    summary: "",
  })

   
    const [filterValue,setFilterValue] = useState()
    const [sortValue,setSortValue] = useState("latest")

    const handleFilter = (star)=>{
      console.log(star);
      setFilterValue(star) 
     }

    const handleSort = (sort)=>{
    console.log(sort);
    setSortValue(sort)
        
    }


 useEffect(()=>{
         
    const getReview =  async()=>{
   try {
      let res = await axios.get(`${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${pId}/reviews`,{
         params :{
           page:1,
           limit:10,
           sort: sortValue,
           rating: filterValue
         }
      })
               console.log(res.data);
               console.log(res.data.totalReviews);
               const totalReviews = res.data.totalReviews ;
               const distributionRating = Object.values(res.data.ratingDistributionCount).reverse()
                     console.log(distributionRating);
                     
                       
               setReviews(res.data.reviews)
               setRatingStats((prevReview)=>({
                 ...prevReview,
               totalReviews: totalReviews ,
               distribution: distributionRating.length === 5 ? distributionRating : [0, 0, 0, 0, 0]
               }))
   } catch (error) {
    console.log("review api error" , error);
    
   }
    }
    getReview()     
 },[filterValue,sortValue])

 const addReview = ()=>{
  if(!isLoginUser) {
     alert("not login yet !")
     return
    }
    setIsDialogOpen(true)

  }



  // In your handleSubmitReview function, modify it to ensure the new review has the exact same structure as those from the API
const handleSubmitReview = async (e) => {
  setIsButtonDisabled(true)
  e.preventDefault();
  setErrorMessage("");
  if(!isLoginUser) return alert("login first ")
  
  if (!newReview.rating || !newReview.comment || !newReview.summary) {
    setErrorMessage("Please fill in all fields");
    setIsButtonDisabled(false);
    return;
  }

 

  try {
    const res = await axios.post(`${import.meta.env.VITE_ADD_PRODUCT_REVIEW}`, {
      productId: pId,
      rating: newReview.rating,
      reviewTitle: newReview.comment,
      reviewDescription: newReview.summary,
    });

    console.log("Review submission response:", res.data); // Debug: Log the actual response

    if (res.status === 200 || res.status === 201) {
      // After successful submission, fetch the updated reviews instead of manually creating one
      const updatedReviewsResponse = await axios.get(`${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${pId}/reviews`, {
        params: {
          page: 1,
          limit: 10,
          sort: sortValue,
          rating: filterValue
        }
      });
      
      // Update the state with the fresh data from the API
      setReviews(updatedReviewsResponse.data.reviews);
      setRatingStats((prevReview) => ({
        ...prevReview,
        totalReviews: updatedReviewsResponse.data.totalReviews,
        distribution: Object.values(updatedReviewsResponse.data.ratingDistributionCount).reverse()
      }));
      
      if(onReviewChange){
        onReviewChange()
      }
      // Reset the form
      setNewReview({ rating: 0, comment: "", summary: "" });
      setIsDialogOpen(false);
    } else {
      setErrorMessage("Failed to add review. Please try again.");
    }

    
  } catch (error) {
    console.error("Error adding review:", error?.response?.data?.error);
    
    if(error?.response?.data?.error === 'You have already reviewed this product') {
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
      
 
  const [isDeleting, setIsDeleting] = useState(false)
  


  const deleteBtn = async(review) => {
    if (!review?._id || isDeleting) return;

    
    try {
      setIsDeleting(true);
      console.log("Attempting to delete review with ID:", review._id); // Debug
      
      const res = await axios.delete(`${import.meta.env.VITE_DELETE_PRODUCT_REVIEW}/${review._id}`);
      console.log("Delete response:", res); // Debug
  
      if (res.status === 200 || res.status === 201) {
        // After successful deletion, fetch the updated reviews instead of manually calculating
        const updatedReviewsResponse = await axios.get(`${import.meta.env.VITE_GET_PRODUCT_REVIEW}/${pId}/reviews`, {
          params: {
            page: 1,
            limit: 10,
            sort: sortValue,
            rating: filterValue
          }
        });
        
        // Update the state with the fresh data from the API
        setReviews(updatedReviewsResponse.data.reviews);
        setRatingStats((prevReview) => ({
          ...prevReview,
          totalReviews: updatedReviewsResponse.data.totalReviews,
          distribution: Object.values(updatedReviewsResponse.data.ratingDistributionCount).reverse()
        }));

        if(onReviewChange){
          onReviewChange()
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
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex flex-wrap justify-between items-start">
        <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
          <ReviewFilter handleSort={handleSort} handleFilter={handleFilter}/>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
            <Button variant="outline" className="gap-2" onClick ={addReview}>
              <span className="text-lg">+</span> Add Review
            </Button>
         
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            {errorMessage && (
              <div className="text-red-600 font-medium">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
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
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Brief title for your review"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Review Description</Label>
                <Textarea
                  id="summary"
                  value={newReview.summary}
                  onChange={(e) => setNewReview({ ...newReview, summary: e.target.value })}
                  placeholder="Write your detailed review here..."
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled = {isButtonDisabled}>
                Submit Review
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Rating Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold ">{ratingStats.average}</div>
              </div>
              <svg className="w-full h-full -rotate-90 ">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-[#9EFF00] "
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-[#202020] "
                  strokeDasharray={`${(ratingStats.average / 5) * 377} 377`}
                />
              </svg>
            </div>
            <div className="">
              <div className="font-semibold">{ratingStats.totalReviews.toLocaleString()} Ratings</div>
              <div className="text-muted-foreground">&</div>
              <div className="font-semibold"> Reviews</div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingStats.distribution.map((count, index) => (
              <div key={5 - index} className="flex items-center gap-2">
                <div className="w-12 text-sm">{5 - index} ★</div>
                <Progress value={((count)/ratingStats.totalReviews)*100} className="h-2" />
                {/* <Progress value={(count / Math.max(...ratingStats.distribution)) * 100} className="h-2" /> */}
                <div className="w-16 text-sm text-right">{count.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review?._id || `review-${Math.random()}`}>
                <CardContent className="p-4 space-y-2 relative">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review?.user?.name || "Anonymous"}</span> 
                  </div>
                  <p className="text-md font-bold">{review?.review?.title || "No Title"}</p>
                  <p className="text-sm font-medium">{review?.review?.description || "No Description"}</p>
                
                  {review?.user?._id === userDetails?._id && (
                      <div
                        className="absolute right-4 top-6 h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center"
                        onClick={() => deleteBtn(review)}
                      >
                        <DeleteBtn />
                      </div>
                    )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              No reviews yet. Be the first to add one!
            </div>
          )}
        </div>
      </div>

      {reviews && reviews.length > 5 && (
        <Button variant="outline" className="w-full">
          See More
        </Button>
      )}
    </div>
  )
}