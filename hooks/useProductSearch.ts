"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { searchTextIsTooLong } from "@/app/constants";
import { QueryParams } from "next-sanity";

const MAX_RESULTS = 50;
const PRODUCT_SEARCH_QUERY = `*[
        _type == "product" &&
        (
          name match $search ||
          intro match $search
        )
      ][0...${MAX_RESULTS}] | order(name asc)`;

export function useProductSearch(debounceDelay: number = 300) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useMemo<QueryParams>(
    () => ({ search: `*${search}*` }),
    [search]
  );

  // Fetch products from Sanity based on search input
  const fetchProducts = useCallback(async () => {
    try {
      const response = await client.fetch<Product[]>(
        PRODUCT_SEARCH_QUERY,
        params
      );
      setProducts(response);
    } catch (error) {
      console.error("Product fetching Error:", error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Debounce behavior
  useEffect(() => {
    // Clear products if search input is empty or it's too long
    if (!search.trim() || searchTextIsTooLong(search.length)) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(fetchProducts, debounceDelay);
    return () => clearTimeout(timeout);
  }, [search, fetchProducts, debounceDelay]);

  return {
    search,
    setSearch,
    products,
    loading,
  };
}
