"use client";

import { StarSVG, CustomPieChart } from "@/components/components";
import { Progress } from "@/components/ui/progress";

export default function RatingOverview({ ratingStats }) {
  return (
    <div className="mt-12 max-w-[380px] space-y-8 flex flex-col justify-center item-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <CustomPieChart average={ratingStats.average} />
        <div className="text-[24px] font-semibold text-primary">
          <div className="text-center font-semibold">
            {ratingStats.totalReviews.toLocaleString()}
          </div>
          <div> Ratings & Reviews</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2 ">
        {ratingStats.distribution.map((count, index) => (
          <div key={5 - index} className="flex items-center gap-[20px]">
            <div className="flex items-center justify-center gap-1 rounded-full bg-primary p-1 px-3 text-secondary">
              <div className="flex w-[30px] gap-1 text-sm">
                {5 - index} <StarSVG color="#fff" />
              </div>
              <Progress
                value={(count / ratingStats.totalReviews) * 100}
                className="h-[11px] w-[268px]"
                color={
                  Math.max(...ratingStats.distribution) ===
                  ratingStats.distribution[index]
                    ? "#9EFF00"
                    : "#FFFFFF"
                }
              />
            </div>
            <div className="w-16 pl-1 text-right text-lg font-bold text-primary">
              {count.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}