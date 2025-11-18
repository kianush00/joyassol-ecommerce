"use client";
import { useEffect, useState } from "react";
import HomeTabbar from "../HomeTabbar";
import { productType } from "@/app/constants";
import { client } from "@/sanity/lib/client";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductGrid from "./ProductGrid";
import ProductsLoadingState from "./ProductsLoadingState";

const HomeProducts = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "product" && variant ==$variant] | order(name asc)`;
        const params = { variant: selectedTab.toLocaleLowerCase() };
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.log("Product fetching Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading && <ProductsLoadingState />}
      {!loading && (
        <>
          {products?.length ? (
            <ProductGrid products={products} />
          ) : (
            <NoProductsAvailable selectedTab={selectedTab} />
          )}
        </>
      )}
    </div>
  );
};

export default HomeProducts;
