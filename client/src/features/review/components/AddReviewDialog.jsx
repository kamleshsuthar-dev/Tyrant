

"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function AddReviewDialog({
  isOpen,
  onOpenChange,
  newReview,
  setNewReview,
  onSubmit,
  errorMessage,
  isSubmitting
}) {
  



  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        
        <form onSubmit={onSubmit} className="space-y-4">
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
            disabled={isSubmitting}
          >
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}


