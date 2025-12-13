"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { QueryParams } from "next-sanity";

interface Props {
  query: string;
  params: QueryParams;
}

export function useFilteredProducts({ query, params }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await client.fetch<Product[]>(query, params, {
          signal: controller.signal,
        });
        setProducts(response ?? []);
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;

        console.error("Error fetching products:", err);
        setError("Error al cargar los productos. Inténtelo de nuevo.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [query, params]);

  return { products, loading, error };
}
