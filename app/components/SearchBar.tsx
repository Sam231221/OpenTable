/*
If you remove this wont work because we have to use useState() 
So This is CLient Component.
*/
"use client";

import React, { useState } from "react";
//dont use next/router
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  return (
    <div className="text-left text-lg flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        onClick={() => {
          if (location === "") return;
          router.push(`/search?city=${location}`);
          setLocation("");
        }}
        className="rounded bg-red-500 hover:bg-red-600 px-9 py-2 text-white"
      >
        Let&apos;s go
      </button>
    </div>
  );
}
