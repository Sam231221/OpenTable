import React from "react";
import { Review } from "@prisma/client";
import { calculateAverageRating } from "../../../../utils/calculateAverageRating";
import Stars from "@/app/components/Stars";
export default function Rating({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">{calculateAverageRating(reviews)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
