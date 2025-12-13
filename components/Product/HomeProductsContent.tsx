"use client";
import { useMemo } from "react";
import { QueryParams } from "next-sanity";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import ProductsLoadingFallback from "./ProductsLoadingFallback";
import ProductGrid from "./ProductGrid";
import NoProductsAvailable from "./NoProductsAvailable";

const MAX_RESULTS = 50;
const PRODUCTS_BY_VARIANT_QUERY = `*[
          _type == "product" && variant == $variant
          ][0...${MAX_RESULTS}] | order(name asc)`;

interface Props {
  selectedTab: string;
}

const HomeProductsContent = ({ selectedTab }: Props) => {
  const queryParams = useMemo<QueryParams>(
    () => ({ variant: selectedTab.toLowerCase() }),
    [selectedTab]
  );

  const { products, loading, error } = useFilteredProducts({
    query: PRODUCTS_BY_VARIANT_QUERY,
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
          <NoProductsAvailable selectedTab={selectedTab} />
        ))}
    </div>
  );
};

export default HomeProductsContent;
