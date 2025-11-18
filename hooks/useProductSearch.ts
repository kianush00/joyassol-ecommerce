"use client";
import { useState, useEffect, useCallback } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { searchTextIsTooLong } from "@/app/constants";

export function useProductSearch(debounceDelay: number = 300) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products from Sanity based on search input
  const fetchProducts = useCallback(async () => {
    try {
      const query = `*[
        _type == "product" &&
        (
          name match $search ||
          intro match $search
        )
      ][0...50] | order(name asc)`;
      const params = { search: `*${search}*` };
      const response = await client.fetch<Product[]>(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Product fetching Error:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

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
