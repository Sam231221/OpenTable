import Stars from "@/app/components/Stars";
import { Review } from "@prisma/client";
import React from "react";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border-b pb-7 mb-5">
      <div className="flex">
        <div className="w-1/6 flex gap-3 flex-col items-center">
          <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
            <h2 className="text-white text-xl uppercase">
              {review.first_name[0]}
              {review.last_name[0]}
            </h2>
          </div>
          <p className="text-center">{review.first_name}</p>
        </div>

        <div className="flex flex-col justify-center content-center w-5/6">
          <div className="flex items-center">
            <Stars rating={review.rating} reviews={[]} />
          </div>
          <div className="mt-2">
            <p className="text-sm font-light">{review.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
