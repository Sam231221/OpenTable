import React from "react";
import { Review } from "@prisma/client";
import ReviewCard from "./ReviewCard";
export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What
        {reviews.length === 1
          ? ` ${reviews[0].first_name} is `
          : ` ${reviews.length} people are `}
        saying
      </h1>
      {reviews.map((review, i) => (
        <ReviewCard key={i} review={review} />
      ))}
    </div>
  );
}
