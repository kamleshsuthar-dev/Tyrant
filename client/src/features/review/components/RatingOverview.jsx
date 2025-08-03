"use client";

import { StarSVG, CustomPieChart } from "@/components/components";
import { Progress } from "@/components/ui/progress";
import { twMerge } from "tailwind-merge";

export default function RatingOverview({ ratingStats }) {
  return (
    <div className="mt-12 max-w-[380px] space-y-8 flex flex-col justify-center item-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <CustomPieChart average={ratingStats.average} />
        <div className="text-[24px] font-semibold text-secondary">
          <div className="text-center font-semibold">
            {ratingStats.totalReviews.toLocaleString()}
          </div>
          <div> Ratings & Reviews</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2 p-2 ">
        {ratingStats.distribution.map((count, index) => (
          <div key={5 - index} className="flex items-center lg:gap-[20px] gap-1 scale-75 md:scale-90 lg:scale-100 ">
            <div className="flex items-center justify-center gap-1 rounded-full bg-primary-contrast p-1 px-3 text-secondary">
              <div className="flex w-[30px] gap-1 text-sm">
                {5 - index} <StarSVG color="#fff" />
              </div>
              <Progress
                value={(count / ratingStats.totalReviews) * 100}
                className="h-[11px] w-[268px]"
                color={
                  Math.max(...ratingStats.distribution) ===
                  ratingStats.distribution[index]
                    ? "#9eff00"
                    : "#fff"
                }
              />
           
            </div>
            <div className="lg:w-16 w-12 pl-1 text-right text-lg font-bold text-secondary">
              { count }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}