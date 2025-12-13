"use client";
import { useMemo } from "react";
import ProductsLoadingFallback from "./ProductsLoadingFallback";
import ProductGrid from "./ProductGrid";
import NoProductsAvailable from "./NoProductsAvailable";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { QueryParams } from "next-sanity";

const MAX_RESULTS = 100;
const PRODUCTS_QUERY = `*[_type == "product"][0...${MAX_RESULTS}] | order(name asc)`;

const ShopProductsContent = () => {
  const queryParams = useMemo<QueryParams>(() => ({}), []);
  const { products, loading, error } = useFilteredProducts({
    query: PRODUCTS_QUERY,
    params: queryParams,
  });

  // Throw error if there is one, so that it can be caught by the ErrorBoundary
  if (error) {
    throw new Error(error);
  }

  return (
    <div>
      {loading && <ProductsLoadingFallback />}

      {!loading &&
        (products.length ? (
          <ProductGrid products={products} />
        ) : (
          <NoProductsAvailable />
        ))}
    </div>
  );
};

export default ShopProductsContent;
