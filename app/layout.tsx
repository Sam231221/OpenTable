import Navbar from "./components/Navbar";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OpenTable",
  description:
    "Make online reservations, read restaurant reviews from diners, and earn points towards free meals. OpenTable is a real-time online reservation network for fine dining restaurants..",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-gray-100 min-h-screen ">
          {/* AuthoContext providing state to all components inside it */}
          <AuthContext>
            <main className="max-w-screen-2xl m-auto bg-white">
              <Navbar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
