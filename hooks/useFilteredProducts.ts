"use client";
import { useCallback, useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { QueryParams } from "next-sanity";

interface Props {
  query: string;
  params?: QueryParams;
}

export function useFilteredProducts({ query, params = {} }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(
    async (overrides?: { params?: QueryParams; signal?: AbortSignal }) => {
      setError(null);
      setLoading(true);
      const finalParams = overrides?.params ?? params;
      const signal = overrides?.signal;

      try {
        const response = await client.fetch<Product[]>(query, finalParams, {
          signal,
        });
        setProducts(response ?? []);
      } catch (err: unknown) {
        // Memorized fetch: avoids re-declarations and facilitates cancellation
        if ((err as Error)?.name === "AbortError") {
          return; // Request cancelled
        }
        console.error("Error fetching products:", err);
        setError("Error al cargar los productos. Inténtelo de nuevo.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [query, params]
  );

  // Effect that triggers the search and uses AbortController to prevent race conditions
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts({ signal: controller.signal });
    return () => controller.abort();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
}
