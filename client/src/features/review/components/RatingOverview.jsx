

"use client";

import { StarSVG, CustomPieChart } from "@/components/components";
import { Progress } from "@/components/ui/progress";

export default function RatingOverview({ ratingStats }) {
  return (
    <div className="mt-12 w-full max-w-[380px] space-y-8 flex flex-col justify-center items-center ">
      
      {/* Average Rating & Total Reviews */}
      <div className="flex flex-col items-center justify-center gap-4">
        <CustomPieChart average={ratingStats.average} />
        <div className="text-[24px] font-semibold text-secondary text-center">
          <div>{ratingStats.totalReviews.toLocaleString()}</div>
          <div> Ratings & Reviews</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2 w-full">
        {ratingStats.distribution.map((count, index) => (
          <div 
            key={5 - index} 
            className="flex items-center lg:gap-[20px] gap-1"
          >
            {/* Left: Star + Progress */}
            <div className="flex items-center gap-1 rounded-full bg-primary-contrast p-1 px-3 text-secondary flex-1 min-w-0">
              <div className="flex w-[30px] gap-1 text-sm shrink-0">
                {5 - index} <StarSVG color="#fff" />
              </div>
              <Progress
                value={(count / ratingStats.totalReviews) * 100}
                className="h-[11px] md:w-full w-44 "
                color={
                  Math.max(...ratingStats.distribution) ===
                  ratingStats.distribution[index]
                    ? "#9eff00"
                    : "#fff"
                }
              />
            </div>

            {/* Right: Count */}
            <div className="lg:w-16 w-12 pl-1 text-right text-lg font-bold text-secondary shrink-0">
              {count}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}






// import { StarSVG, CustomPieChart } from "@/components/components";
// import { Progress } from "@/components/ui/progress";
// import { twMerge } from "tailwind-merge";

// export default function RatingOverview({ ratingStats }) {
//   return (
//     <div className="mt-12 max-w-[380px] space-y-8 flex flex-col justify-center item-center">
//       <div className="flex flex-col items-center justify-center gap-4">
//         <CustomPieChart average={ratingStats.average} />
//         <div className="text-[24px] font-semibold text-secondary">
//           <div className="text-center font-semibold">
//             {ratingStats.totalReviews.toLocaleString()}
//           </div>
//           <div> Ratings & Reviews</div>
//         </div>
//       </div>

//       {/* Rating Distribution */}
//       <div className="space-y-2  ">
//         {ratingStats.distribution.map((count, index) => (
//           <div key={5 - index} className="flex items-center lg:gap-[20px] gap-1 scale-75 md:scale-90 lg:scale-100 ">
//             <div className="flex items-center justify-center gap-1 rounded-full bg-primary-contrast p-1 px-3 text-secondary">
//               <div className="flex w-[30px] gap-1 text-sm">
//                 {5 - index} <StarSVG color="#fff" />
//               </div>
//               <Progress
//                 value={(count / ratingStats.totalReviews) * 100}
//                 className="h-[11px] w-5 md:w-[268px]"
//                 color={
//                   Math.max(...ratingStats.distribution) ===
//                   ratingStats.distribution[index]
//                     ? "#9eff00"
//                     : "#fff"
//                 }
//               />
           
//             </div>
//             <div className="lg:w-16 w-12 pl-1 text-right text-lg font-bold text-secondary">
//               { count }
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

