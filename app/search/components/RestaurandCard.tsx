import React from "react";
import Link from "next/link";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Price from "@/app/components/Price";
import { calculateAverageRating } from "@/utils/calculateAverageRating";
import Stars from "@/app/components/Stars";
interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  locaton: Location;
  slug: string;
  reviews: Review[];
}

export default function RestaurandCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const renderRatingText = () => {
    const rating = calculateAverageRating(restaurant.reviews);
    if (rating > 4) {
      return "Awesome";
    } else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 2) return "Average";
    else "";
  };
  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.locaton.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`restaurant/${restaurant.slug}/`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
