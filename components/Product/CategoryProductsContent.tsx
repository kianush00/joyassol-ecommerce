"use client";
import { QueryParams } from "next-sanity";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import ProductsLoadingFallback from "./ProductsLoadingFallback";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductGrid from "./ProductGrid";
import { useMemo } from "react";

const MAX_RESULTS = 50;
const PRODUCTS_BY_CATEGORY_QUERY = `*[
  _type == "product" &&
  references(*[_type == "category" && slug.current == $categorySlug]._id)
][0...${MAX_RESULTS}] | order(name asc)`;

interface Props {
  slug: string;
}

const CategoryProductsContent = ({ slug }: Props) => {
  const queryParams = useMemo<QueryParams>(
    () => ({ categorySlug: slug }),
    [slug]
  );

  const { products, loading, error } = useFilteredProducts({
    query: PRODUCTS_BY_CATEGORY_QUERY,
    params: queryParams,
  });

  // Throw error if there is one, so that it can be caught by the ErrorBoundary
  if (error) {
    throw new Error(error);
  }

  return (
    <div className="w-full">
      {loading && <ProductsLoadingFallback />}

      {!loading &&
        (products.length ? (
          <ProductGrid products={products} />
        ) : (
          <NoProductsAvailable selectedTab={slug} className="mt-0" />
        ))}
    </div>
  );
};

export default CategoryProductsContent;
