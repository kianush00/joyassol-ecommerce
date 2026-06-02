"use client";
import { useState, useEffect, useRef } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { isSearchTooLong } from "@/app/constants";
import { QueryParams } from "next-sanity";

const MAX_RESULTS = 50;
const DEBOUNCE_MS = 300;

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
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!search.trim() || isSearchTooLong(search.length)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);

    const debounceTimeout = setTimeout(async () => {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const params = { search: `*${search}*` } as QueryParams;
        const response = await client.fetch<Product[]>(
          PRODUCT_SEARCH_QUERY,
          params,
          { signal: controllerRef.current.signal },
        );
        setProducts(response ?? []);
        setError(null);
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
        console.error("Product fetching Error:", err);
        setError("Error al buscar productos. Inténtelo de nuevo.");
        setProducts([]);
      } finally {
        if (!controllerRef.current?.signal.aborted) {
          setLoading(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(debounceTimeout);
      controllerRef.current?.abort();
    };
  }, [search]);

  return {
    search,
    setSearch,
    products,
    loading,
    error,
  };
}
