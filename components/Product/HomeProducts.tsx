"use client";
import HomeTabbar from "../HomeTabbar";
import { productType } from "@/app/constants";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomeProductsContent from "./HomeProductsContent";
import ProductsErrorFallback from "./ProductsErrorFallback";

const HomeProducts = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      <ErrorBoundary
        FallbackComponent={ProductsErrorFallback}
        onReset={() => {
          console.log("ErrorBoundary reset");
        }}
      >
        <HomeProductsContent selectedTab={selectedTab} />
      </ErrorBoundary>
    </div>
  );
};

export default HomeProducts;
