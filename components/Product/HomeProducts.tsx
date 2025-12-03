"use client";
import HomeTabbar from "../HomeTabbar";
import { productType } from "@/app/constants";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductGrid from "./ProductGrid";
import ProductsLoadingState from "./ProductsLoadingState";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { useMemo, useState } from "react";
import ProductsErrorState from "./ProductsErrorState";
import { QueryParams } from "next-sanity";

const MAX_RESULTS = 50;
const PRODUCTS_BY_VARIANT_QUERY = `*[
          _type == "product" && variant == $variant
          ][0...${MAX_RESULTS}] | order(name asc)`;

const HomeProducts = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const queryParams = useMemo<QueryParams>(
    () => ({ variant: selectedTab.toLowerCase() }),
    [selectedTab]
  );

  const { products, loading, error, refetch } = useFilteredProducts({
    query: PRODUCTS_BY_VARIANT_QUERY,
    params: queryParams,
  });

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading && <ProductsLoadingState />}
      {!loading && error && (
        <ProductsErrorState error={error} onRetry={refetch} />
      )}

      {!loading &&
        !error &&
        (products.length ? (
          <ProductGrid products={products} />
        ) : (
          <NoProductsAvailable selectedTab={selectedTab} />
        ))}
    </div>
  );
};

export default HomeProducts;
