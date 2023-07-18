import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default function SearchSideBar(
  {locations, cusinies,searchParams}:
  {
    locations:Location[], cusinies:Cuisine[]
    ,searchParams: {city?: string; cuisine?: string; price?: PRICE;}
  }
) {
   const prices =[
    {
      label:"$",
      price:PRICE.CHEAP,
      className:"border text-center w-full text-reg font-light rounded-l p-2"
    },
    {
      label:"$$",
      price:PRICE.REGULAR,
      className:"border text-center w-full text-reg font-light p-2"
    },
    {
      label:"$$$",
      price:PRICE.EXPENSIVE,
      className:"border text-center w-full text-reg font-light rounded-r p-2"
    }
  ]
  return (
    <div className="w-1/5">

      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location,i)=>(
        <Link href={
          {
            pathname:'/search',
            query:{
              ...searchParams,
              city:location.name
            }
          }
        } key={i} className="font-light text-reg">{location.name}</Link>
        ))}


      </div>

      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cusinies.map((cuisine,i)=>(
          <Link 
          href={
            {
              pathname:'/search',
              query:{
                ...searchParams,
                cuisine:cuisine.name
              }
            }
          }
          key={i} className="font-light text-reg">{cuisine.name}</Link>
        ))}

      </div>

      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({price, label, className}, i)=>(
          <Link key={i} href={
            {
              pathname:'/search',
              query:{
                ...searchParams,
                price,
              }
            }
          } className={className}>
            {label}
          </Link>
          ))}

        </div>
      </div>

    </div>
  );
}
