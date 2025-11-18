"use client";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import { Button } from "../ui/button";

interface Props {
  categories: CATEGORIES_QUERYResult;
  currentSlug: string;
  setCurrentSlug: (slug: string) => void;
}

const CategoriesSidebar = ({
  categories,
  currentSlug,
  setCurrentSlug,
}: Props) => {
  return (
    <nav className="flex flex-col md:min-w-40 border" aria-label="Categories">
      {categories?.map((item) => {
        const slugVal = item?.slug?.current as string;
        return (
          <Button
            key={item?._id ?? slugVal}
            onClick={() => setCurrentSlug(slugVal)}
            className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${
              currentSlug === slugVal &&
              "bg-darkColor text-white border-darkColor"
            }`}
          >
            {item?.title}
          </Button>
        );
      })}
    </nav>
  );
};

export default CategoriesSidebar;
