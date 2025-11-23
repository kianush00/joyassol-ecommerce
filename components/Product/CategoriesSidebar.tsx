"use client";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  categories: CATEGORIES_QUERYResult;
  currentSlug: string;
}

const CategoriesSidebar = ({ categories, currentSlug }: Props) => {
  const router = useRouter();

  return (
    <nav className="flex flex-col md:min-w-40 border" aria-label="Categories">
      {categories.map((item) => {
        const itemSlug = item.slug?.current as string;
        return (
          <Button
            key={item?._id ?? itemSlug}
            onClick={() => router.push(`/category/${itemSlug}`)}
            className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${
              currentSlug === itemSlug &&
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
