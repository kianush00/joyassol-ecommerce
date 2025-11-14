"use client";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  categories: CATEGORIES_QUERYResult;
}

const HeaderMenu = ({ categories }: Props) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
      <Link
        href={"/"}
        className={`hover:text-darkColor hoverEffect relative group ${
          "/" === pathname && "text-darkColor"
        }`}
      >
        Home
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${
            "/" === pathname && "w-1/2"
          }`}
        />
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${
            "/" === pathname && "w-1/2"
          }`}
        />
      </Link>
      {categories?.map((category) => (
        <Link
          key={category?._id}
          href={`/category/${category?.slug?.current}`}
          className={`hover:text-darkColor hoverEffect relative group ${
            `/category/${category?.slug?.current}` === pathname &&
            "text-darkColor"
          }`}
        >
          {category?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${
              `/category/${category?.slug?.current}` === pathname && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${
              `/category/${category?.slug?.current}` === pathname && "w-1/2"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
