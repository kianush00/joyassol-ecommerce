"use client";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductGrid from "./ProductGrid";
import ProductsLoadingState from "./ProductsLoadingState";
import ProductsErrorState from "./ProductsErrorState";
import CategoriesSidebar from "./CategoriesSidebar";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { QueryParams } from "next-sanity";
import { useMemo } from "react";

interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const MAX_RESULTS = 50;
const PRODUCTS_BY_CATEGORY_QUERY = `*[
        _type == "product" &&
        references(*[_type == "category" && slug.current == $categorySlug]._id)
        ][0...${MAX_RESULTS}] | order(name asc)`;

const CategoryProducts = ({ categories, slug }: Props) => {
  const queryParams = useMemo<QueryParams>(
    () => ({ categorySlug: slug }),
    [slug]
  );

  const { products, loading, error, refetch } = useFilteredProducts({
    query: PRODUCTS_BY_CATEGORY_QUERY,
    params: queryParams,
  });

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <CategoriesSidebar categories={categories} currentSlug={slug} />

      {/* Products grid */}
      <div className="w-full">
        {loading && <ProductsLoadingState />}

        {!loading && error && (
          <ProductsErrorState error={error} onRetry={refetch} />
        )}

        {!loading &&
          !error &&
          (products.length ? (
            <ProductGrid products={products} />
          ) : (
            <NoProductsAvailable selectedTab={slug} className="mt-0" />
          ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
