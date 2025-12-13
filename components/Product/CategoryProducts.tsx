"use client";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import CategoriesSidebar from "./CategoriesSidebar";
import { ErrorBoundary } from "react-error-boundary";
import CategoryProductsContent from "./CategoryProductsContent";
import ProductsErrorFallback from "./ProductsErrorFallback";

interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <CategoriesSidebar categories={categories} currentSlug={slug} />

      <ErrorBoundary
        FallbackComponent={ProductsErrorFallback}
        onReset={() => {
          console.log("ErrorBoundary reset");
        }}
      >
        <CategoryProductsContent slug={slug} />
      </ErrorBoundary>
    </div>
  );
};

export default CategoryProducts;
