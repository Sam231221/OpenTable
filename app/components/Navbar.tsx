"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import Image from "next/image";
import logo from "../../public/open-table.svg";
export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <>
      <div className="flex text-xs text-[#2d333f] py-2 bg-[#F1F2F4] justify-end content-end gap-3 w-full">
        <span>For Business</span>
        <span>Mobile</span>
        <span>FAQs</span>
        <span className="mr-3">En</span>
      </div>
      <nav className="bg-white p-2 flex justify-between">
        <Link href="/" className="ml-3 font-bold text-gray-700 text-2xl">
          <Image src={logo} width={150} height={150} alt="logo" />
        </Link>
        <div>
          {loading ? null : (
            <div className="flex">
              {data ? (
                <div className="flex items-center gap-3">
                  <p>Hello {data.firstName}</p>
                  <button
                    className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                    onClick={signout}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <AuthModal isSignin={true} />
                  <AuthModal isSignin={false} />
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
