import { useEffect, useState } from 'react';
import { Upload, Star, Image, Video } from 'lucide-react';
import { DottedBorder, MediaUpload, StarRating, StarSVG } from '@/components/components';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '@/store/action/reviewAction';

export default function AddReview({pId ,setIsOpen}) {
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const dispatch = useDispatch()
  const {addStatus:{loading , success , error}} = useSelector(state=> state?.reviews)

const handleSubmt = async()=>{
  if (rating<=0 || reviewTitle == "" || reviewContent=="") return ;
  
    const reviewObj = { 
        productId: pId, 
        rating: rating  ,
        reviewTitle : reviewTitle ,
        reviewDescription: reviewContent
      }
      
       await dispatch(addReview(reviewObj));
} 

useEffect(()=>{
  if(success=="Review added successfully") {
     setIsOpen(prev=>!prev)
  }
},[success])



  return (
    <div className=" bg-primary text-secondary mb-3">
        
      

     <DottedBorder  dashLength={12} gapLength={9} color="#fff"  size={2} borderRadius={22}  >
      <div className="rounded-3xl p-2 lg:p-7 flex flex-col gap-3">
        {/* Rating Section */}
          {/* <StarRating rating={product.avgRating} Pcolor="#9EFF00" Scolor="#fff" /> */}

        <div className=" flex flex-row justify-between items-center">
          <div className="w-full flex flex-row items-center justify-between  ">
            <div className='flex gap-2'>
              <span className="text-base font-medium">Give Rating :</span>
              <div className="flex items-center gap-2 ">
                <div className='bg-secondary rounded-xl px-2.5 flex items-center py-0.5'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-colors duration-200"
                      >
                        <StarSVG type='full' color={star<= rating ? "#9eff00" : "#202020" }/>
                      </button>
                    ))}
                </div>
                
                <span className="">{rating}</span>
                <StarSVG type='full' color={rating>=1 ? "#9eff00" : "#fff" }/>
              </div>
            </div>
          
             <Button onClick={handleSubmt} disabled={loading} variant="secondary" size="sm" className="rounded-xl !my-0 py-0  scale-100">
               {loading ? "Submitting.." :
                <>
               Submit
                <img src="/svg/reviewSumbitRightArrow.svg" alt="" />
               </>} 
             </Button>
          </div>
        </div>

        {/* Add Media Section */}
        <div className="w-full ">
           {/* <DottedBorder  dashLength={6} gapLength={5} color="#fff"  size={1} borderRadius={12} className='w-full h-full' >
              <div className="w-9 h-9 left-[27px] top-[27px] absolute overflow-hidden">
                  <img src="/svg/Media.svg" alt="" className=''/>
              </div>
           </DottedBorder> */}
           <MediaUpload />
        </div>

        {/* Review Title */}
        <div className="">
         <div className="self-stretch justify-start  text-base font-medium mb-3">Review Title</div>
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder="Write A One-Line Review Of This Product"
            className="w-full text-xs font-medium text-primary placeholder-primary-muted  bg-white rounded-xl p-3 border-none outline-none transition-all capitalize"/>
        </div>
       

        {/* Review Content */}
        <div className="">
         <div className="self-stretch justify-start  text-base font-medium mb-3">Review Title</div>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Write A Descriptive Review Of This Product..."
            rows={6}
            className="w-full text-xs font-medium text-primary  rounded-lg p-3 placeholder-primary-muted border-none outline-none  transition-all resize-none h-20"
          />
        </div>
      </div>
      </DottedBorder>
    </div>
  );
}