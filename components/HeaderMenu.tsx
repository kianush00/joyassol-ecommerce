"use client";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import MenuItem from "./MenuItem";

interface Props {
  categories: CATEGORIES_QUERYResult;
}

const HeaderMenu = ({ categories }: Props) => {
  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
      {/* Home Link */}
      <MenuItem href="/" title="Home" hasUnderlineEffect={true} />

      {/* Categories Links */}
      {categories?.map((category) => (
        <MenuItem
          key={category?._id}
          href={`/category/${category?.slug?.current}`}
          title={category?.title || "Category"}
          hasUnderlineEffect={true}
        />
      ))}
    </div>
  );
};

export default HeaderMenu;
