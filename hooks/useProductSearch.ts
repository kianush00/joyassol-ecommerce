"use client";
import { useState, useEffect, useCallback } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";

export function useProductSearch(debounceDelay: number = 300) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products from Sanity based on search input
  const fetchProducts = useCallback(async () => {
    if (!search.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
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
