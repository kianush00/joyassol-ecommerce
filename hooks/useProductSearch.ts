"use client";
import { useState, useEffect, useDeferredValue } from "react";
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

export function useProductSearch() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    // Initial validation
    if (!deferredSearch.trim() || searchTextIsTooLong(deferredSearch.length)) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const params = { search: `*${deferredSearch}*` } as QueryParams;
        const response = await client.fetch<Product[]>(
          PRODUCT_SEARCH_QUERY,
          params,
          { signal: controller.signal }
        );
        setProducts(response ?? []);
      } catch (error: unknown) {
        if ((error as Error)?.name === "AbortError") return;
        console.error("Product fetching Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [deferredSearch]);

  return {
    search,
    setSearch,
    products,
    loading,
    isPending: search !== deferredSearch, // indicates that the search is in progress
  };
}
