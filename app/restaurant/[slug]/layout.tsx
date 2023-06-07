import Header from "./components/Header";

export const metadata = {
  title: "OpenTable | Restaurant",
  description:
    "Make online reservations, read restaurant reviews from diners, and earn points towards free meals. OpenTable is a real-time online reservation network for fine dining restaurants..",
};
export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}
