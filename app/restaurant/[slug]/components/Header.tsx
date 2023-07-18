import { Review } from "@prisma/client";
import { fetchSingleRestaurantBySlug } from "../page";
import { prisma } from "@/db";

interface Restaurant {
  name: string;
  reviews: Review[];
  id: number;
  images: string[];
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
}

export default function Header({ name }: { name: string }) {
  const renderTitle = () => {
    const nameArray = name.split("-");

    nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;

    return nameArray.join(" ");
  };
  const fetchSingleRestaurantBySlug = (slug: string) => {
    const restaurant = prisma.restaurant.findUnique({
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

    return restaurant;
  };
  const restaurant = fetchSingleRestaurantBySlug(name);
  if (!restaurant) {
    throw new Error();
  }
  return (
    <div>
      <div
        // style={{
        //   backgroundImage: `url(${restaurant?.images[0]})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "auto",
        //   backgroundBlendMode: "soft-light",
        //   backgroundColor: "rgba(0,0,0,.3)",
        // }}
        className="h-96 flex justify-center items-center"
      >
        {renderTitle()}
      </div>
    </div>
  );
}
