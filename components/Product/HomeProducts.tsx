"use client";
import HomeTabbar from "../HomeTabbar";
import { productType } from "@/app/constants";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductGrid from "./ProductGrid";
import ProductsLoadingState from "./ProductsLoadingState";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { useState } from "react";
import ProductsErrorState from "./ProductsErrorState";
import { defineQuery } from "next-sanity";

const MAX_RESULTS = 50;

const HomeProducts = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  const query = defineQuery(`*[_type == "product" && variant == $variant
          ][0...${MAX_RESULTS}] | order(name asc)`);

  const { products, loading, error } = useFilteredProducts({
    query,
    params: { variant: selectedTab.toLowerCase() },
  });

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading && <ProductsLoadingState />}
      {!loading && error && <ProductsErrorState error={error} />}

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
