"use client";
import { Bed, Dumbbell, LucideHome, Pizza } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const Nav = () => {
  const pathName = usePathname();
  return (
    <div className="fixed bottom-0 w-full flex justify-center gap-4 items-center border-t rounded-xl h-[80px]">
      <Link
        className={`flex flex-col justify-center items-center w-[60px] h-[60px] rounded-full ${
          pathName === "/" ? "bg-[#8c2230]" : ""
        }`}
        href={"/"}
      >
        <LucideHome width={20} height={20} />{" "}
        <span className="text-sm font-semibold">Home</span>
      </Link>
      <Link
        className={`flex flex-col justify-center items-center w-[60px] h-[60px] rounded-full ${
          pathName === "/sleep" ? "bg-[#8c2230]" : ""
        }`}
        href={"/sleep"}
      >
        <Bed width={20} height={20} />{" "}
        <span className="text-sm font-semibold">Sleep</span>
      </Link>
      <Link
        className={`flex flex-col justify-center items-center w-[60px] h-[60px] rounded-full ${
          pathName === "/food" ? "bg-[#8c2230]" : ""
        }`}
        href={"/food"}
      >
        <Pizza width={20} height={20} />{" "}
        <span className="text-sm font-semibold">Food</span>
      </Link>
      <Link
        className={`flex flex-col justify-center items-center w-[60px] h-[60px] rounded-full ${
          pathName === "/work-out" ? "bg-[#8c2230]" : ""
        }`}
        href={"/work-out"}
      >
        <Dumbbell width={20} height={20} />{" "}
        <span className="text-sm font-semibold w-max">W-out</span>
      </Link>
    </div>
  );
};

export default Nav;
