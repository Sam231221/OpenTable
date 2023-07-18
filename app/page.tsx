import { prisma } from "../db";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
export interface RestaurantCardType {
  id: number;
  slug: string;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  locaton: Location;
  price: PRICE;
  reviews: Review[];
}

//A Promise to return array of RestaurantCardType object since its async function.
const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  return await prisma.restaurant.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      main_image: true,
      cuisine: true,
      locaton: true,
      price: true,
      reviews: true,
    },
  });
};

/*
Notice ,It will print out all restaurants in terminal but
not on browser console.This is because Home page is Server Component.
*/

export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
