"use client"

// import type React from "react"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import {Progress} from '@/components/ui/progress'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import axios from "axios"

export default function ReviewSection({product}) {
    // console.log("pReviews",product);
    // console.log("pReviews",product.pReviews);
    
  const [reviews, setReviews] = useState([])

  useEffect(()=>{
        setReviews(product.pReviews)

  },[product.pReviews])

  

  const [ratingStats, setRatingStats] = useState({
    average: 4.5,
    total: 127475,
    totalReviews: 10793,
    distribution: [86434, 28487, 7089, 2503, 5182],
  })

  // New review form state
  const [newReview, setNewReview] = useState({
    // author: "",
    rating: 0,
    comment: "",
    summary: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

//   const handleSubmitReview = (e) => {
//     e.preventDefault()

//     if (!newReview.author || !newReview.rating || !newReview.comment || !newReview.summary) {
//       alert("Please fill in all fields")
//       return
//     }

//     // Add new review to the list
//     const review = {
//       id: reviews.length + 1,
//       ...newReview,
//     }
//     setReviews([review, ...reviews])

//     // Update rating stats
//     // const newTotal = ratingStats.total + 1
//     // const newTotalReviews = ratingStats.totalReviews + 1
//     // const newDistribution = [...ratingStats.distribution]
//     // newDistribution[5 - newReview.rating] += 1
//     // const newAverage = (ratingStats.average * ratingStats.total + newReview.rating) / newTotal

//     // setRatingStats({
//     //   ...ratingStats,
//     //   average: Number(newAverage.toFixed(1)),
//     //   total: newTotal,
//     //   totalReviews: newTotalReviews,
//     //   distribution: newDistribution,
//     // })

//     // Reset form and close dialog
//     setNewReview({
//       author: "",
//       rating: 0,
//       comment: "",
//       summary: "",
//     })
//     setIsDialogOpen(false)
//   }

// console.log("iddd",product._id);

const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (
        // !newReview.author ||
         !newReview.rating || !newReview.comment || !newReview.summary) {
      alert("Please fill in all fields");
      return;
    }
  
    try {

      const res = await axios.post(`${import.meta.env.VITE_ADD_PRODUCT_REVIEW}`, {
        productId: product._id,  // Ensure pReviews has _id
        rating: newReview.rating,
        reviewTitle: newReview.comment,
        reviewDescription: newReview.summary,
      });
  
      if (res.status === 200 || res.status === 201) {
        // Add new review to the state
        const newAddedReview = {
          id: reviews.length + 1,
        //   author: newReview.author,
          rating: newReview.rating,
          comment: newReview.comment,
          summary: newReview.summary,
        };
  
        setReviews([newAddedReview, ...reviews]);
        setNewReview({ rating: 0, comment: "", summary: "" });
        // setNewReview({ author: "", rating: 0, comment: "", summary: "" });

        setIsDialogOpen(false);
      } else {
        alert("Failed to add review. Please try again.");
      }
    } catch (error) {
      console.error("Error adding review:", error.response.data.error);
        if(error.response.data.error=== 'You have already reviewed this product'){
             const messageElement = document.querySelector('.message');
                if (messageElement) {
                    messageElement.classList.remove('hidden');
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    messageElement.classList.add('hidden');
                }
                setIsDialogOpen(false)
                setNewReview({
                        //   author: "",
                        rating: 0,
                        comment: "",
                        summary: "",
                        })
        }
    }
  };

// const deleteBtn = async()=>{
//     let res = await axios.post(`${import.meta.env.VITE_DELETE_PRODUCT_REVIEW}`, {
//         productId : ,
//         reviewId: 
//     })
// }
  

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <span className="text-lg">+</span> Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            
            <DialogHeader>
              <DialogTitle className='message hidden text-red-600'>! You have already reviewed this product </DialogTitle>
              <DialogTitle>Write a Review</DialogTitle>
                
            </DialogHeader>
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
                {/* <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  placeholder="Your name"
                  required
                /> */}
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Review</Label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Write your review here..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Input
                  id="summary"
                  value={newReview.summary}
                  onChange={(e) => setNewReview({ ...newReview, summary: e.target.value })}
                  placeholder="Brief summary of your review"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
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
            <div>
              <div className="font-semibold">{ratingStats.total.toLocaleString()} Ratings</div>
              <div className="text-muted-foreground">&</div>
              <div className="font-semibold">{ratingStats.totalReviews.toLocaleString()} Reviews</div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingStats.distribution.map((count, index) => (
              <div key={5 - index} className="flex items-center gap-2">
                <div className="w-12 text-sm">{5 - index} ★</div>
                <Progress value={(count / Math.max(...ratingStats.distribution)) * 100} className="h-2" />
                <div className="w-16 text-sm text-right">{count.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.user._id}>
              <CardContent className="p-4 space-y-2">
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
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      <Button variant="outline" className="w-full">
        See More
      </Button>
    </div>
  )
}

