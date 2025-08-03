"use client";

import { ArrowSVG } from "@/components/components/component/CommonSVG"
import { DottedBorder, StarSVG } from "@/components/components";
import DeleteBtn from "@/components/home/DeleteBtn.jsx";
import { Button } from "@/components/ui/button";

function ReviewCard({ review, currentUserId, onDelete, isDeleting }) {

 

  return (
           <div
             data-property-1="Default"
             className="h-full w-full mb-2 p-6 bg-primary text-primary-foreground rounded-3xl border-primary-muted border-[0.5px]  inline-flex flex-col justify-start items-start gap-4"
           >
             <div className="self-stretch inline-flex justify-between items-center">
               <div className="self-stretch flex justify-start items-center gap-2">
                 <div className="self-stretch px-2 py-1  rounded-xl flex justify-center items-center">
                   
                     <div className={`self-stretch px-3  py-[2px] text-primary  rounded-xl inline-flex justify-center items-center`}
                          style={{ backgroundColor: ratingBgColor(review.rating) }}
                     >
                           <div className="justify-start  text-xs font-semibold  capitalize"
                            style={{ color: ratingStarColor(review.rating) }}
                           >{review.rating}</div>
                           <StarSVG color={`${ratingStarColor(review.rating)}`} scale={75} />
                       </div>
                 </div>
               
                 <div className="justify-start text-Pure-White text-sm font-medium ">
                   {review?.user?.name || "Anonymous"} <span> {review?.user?._id === currentUserId && (<><span className="text-xs font-semibold text-primary-muted"> - You</span></>)}</span>
                 </div>
               </div>
               <div className="flex justify-start items-center gap-1">
                 <div className="justify-start text-muted text-xs font-medium  lowercase">
                   28 days ago
                 </div>
               </div>
             </div>
             <div className="self-stretch px-2 inline-flex justify-center items-center gap-2.5">
               <div className="flex-1 justify-start text-Pure-White text-base font-medium ">
                  {review?.review?.title || 'Over all great product{" "}'} 
               </div>
             </div>
             <div className="self-stretch px-2 inline-flex flex-col justify-center  gap-2.5">
               <div className="flex-1 justify-start text-muted text-sm font-medium line-clamp-4 ">
                  {review?.review?.description || ` The Hoddie was very stylish and all but the material could be more
                 better. The Hoddie was very stylish and all but the material could
                 be more better. ` }
                
               </div>
                <div className="w-24 h-24 relative ">
                    <DottedBorder  dashLength={6} gapLength={5} color="#fff"  size={1} borderRadius={12} className='w-full h-full' >
                      <div className="w-9 h-9 left-[27px] top-[27px] absolute overflow-hidden">
                          <img src="/svg/Media.svg" alt="" className=''/>
                      </div>
                    </DottedBorder>
                </div>      
                <div className="w-1/2 h-24 relative ">
                    <DottedBorder  dashLength={6} gapLength={5} color="#fff"  size={1} borderRadius={12} className='w-full h-full' >
                      <div className="w-9 h-9 left-[27px] top-[27px] absolute overflow-hidden">
                          <img src="/svg/Media.svg" alt="" className=''/>
                      </div>
                    </DottedBorder>
                </div>      


             </div>

             <div className="self-stretch inline-flex justify-start items-center gap-4">
               <div className="flex justify-center items-center gap-3">
                 <div className="px-2.5 py-0.5 bg-secondary rounded-xl flex justify-center items-center gap-1.5">
                   <div className="flex min-w-6 text-center gap-x-1 items-center justify-start text-primary  text-xs font-medium  capitalize">
                   <ArrowSVG  color={"#202020"}/>
                     56
                   </div>
                   <div className="flex min-w-6 text-center gap-x-1 items-center justify-start text-primary  text-xs font-medium  capitalize">
                   <ArrowSVG  color={"#f00"} rotate= "true"/>
                     69
                   </div>
                  
                 </div>
   
                 <div className="px-2 py-0.5  rounded-xl flex justify-center items-center">
                    <img src="/svg/replyIcon.svg" alt=""   />
                   <div className="justify-start  text-xs font-medium  capitalize">
                     Reply
                   </div>
                 </div>
                 <div className="w-5 h-5 relative bg-primary rounded-xl">
                     <div className="w-0.5 h-0.5 left-[9px] top-[9px] absolute bg-secondary rounded-[31px]" />
                     <div className="w-0.5 h-0.5 left-[5px] top-[9px] absolute bg-secondary rounded-[31px]" />
                     <div className="w-0.5 h-0.5 left-[13px] top-[9px] absolute bg-secondary rounded-[31px]" />
                 </div>
                 {review?.user?._id === currentUserId && (
                  <>
                      <Button
                        variant="accent" size="sm" className="rounded-xl  h-6 !my-0 "
                          // className="text-muted text-sm place-content-end"
                          // onClick={() => !isDeleting && onDelete(review)}
                        >
                        <img src="/svg/editIcon.svg" alt="" className="h-5" />
                          Edit
                      </Button>
                      <Button
                       variant="destructive" size="sm" className="rounded-xl h-6 !my-0  text-xs font-medium"
                        // className="text-muted text-sm place-content-end"
                        onClick={() => !isDeleting && onDelete(review)}
                      >
                        <img src="/svg/deleteIcon.svg" alt="" className="h-5"/>
                        Delete
                      </Button>
                     
                      </>
                    )}
               </div>
             </div>
           </div>
  )
}

export default ReviewCard


export function ratingBgColor(rating){
      if(rating <= 2){
        return "#ff1010"
      }else if (rating == 3){
        return "#FFB524"
      }else  {
        return "#72D570"
      }
  }
 export function ratingStarColor(rating){
      if(rating <= 2){
        return "#fff"
      }else  {
        return "#202020"
      }
  }