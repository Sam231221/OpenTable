import { fetchSingleRestaurantBySlug } from "../page";

export default async function Header({ name }: { name: string }) {
  const renderTitle = () => {
    const nameArray = name.split("-");

    nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;

    return nameArray.join(" ");
  };

  const restaurant = await fetchSingleRestaurantBySlug(name);

  return (
    <div
      style={{
        backgroundImage: `url(${restaurant.images[0]})`,
        backgroundPosition: "center",
        backgroundSize: "auto",
        backgroundBlendMode: "soft-light",
        backgroundColor: "rgba(0,0,0,.3)",
      }}
      className="h-96 flex justify-center items-center"
    ></div>
  );
}
