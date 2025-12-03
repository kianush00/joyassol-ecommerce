"use client";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductGrid from "./ProductGrid";
import ProductsLoadingState from "./ProductsLoadingState";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import ProductsErrorState from "./ProductsErrorState";
import { useMemo } from "react";
import { QueryParams } from "next-sanity";

const MAX_RESULTS = 100;
const PRODUCTS_QUERY = `*[_type == "product"][0...${MAX_RESULTS}] | order(name asc)`;

const ShopProducts = () => {
  const queryParams = useMemo<QueryParams>(() => ({}), []);
  const { products, loading, error, refetch } = useFilteredProducts({
    query: PRODUCTS_QUERY,
    params: queryParams,
  });

  return (
    <>
      <h2 className="my-5 font-semibold text-xl underline underline-offset-4 decoration-1">
        ¡Consigue tus mejores ofertas de compras con nosotros!
      </h2>

      {loading && <ProductsLoadingState />}
      {!loading && error && (
        <ProductsErrorState error={error} onRetry={refetch} />
      )}

      {!loading &&
        !error &&
        (products.length ? (
          <ProductGrid products={products} />
        ) : (
          <NoProductsAvailable />
        ))}
    </>
  );
};

export default ShopProducts;
