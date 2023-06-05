import RestaurantNavbar from "./components/RestaurantNavbar";
import Images from "./components/Images";
import ReservationCard from "./components/ReservationCard";
import Reviews from "./components/Reviews";
import { prisma } from "../../../db";
import { Review } from "@prisma/client";
import Rating from "./components/Rating";
import { notFound } from "next/navigation";
export interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

export const fetchSingleRestaurantBySlug = async (
  slug: string
): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    throw notFound();
  }
  return restaurant;
};

export default async function RestaurantDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchSingleRestaurantBySlug(params.slug);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={restaurant.slug} />

        <div className="mt-4 border-b pb-6">
          <h1 className="font-bold text-6xl">{restaurant.name}</h1>
        </div>

        <Rating reviews={restaurant.reviews} />

        <div className="mt-4">
          <p className="text-sm font-light">{restaurant.description}</p>
        </div>

        <Images images={restaurant.images} />
        {/* IMAGES */}

        {/* REVIEWS */}
        <Reviews reviews={restaurant.reviews} />
        {/* REVIEWS */}
      </div>
      <div className="w-[27%]  text-sm">
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
          slug={restaurant.slug}
        />
      </div>
    </>
  );
}
