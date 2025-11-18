"use client";
import { CATEGORIES_QUERYResult, Product } from "@/sanity.types";
import { useEffect, useState, useCallback } from "react";
import { client } from "@/sanity/lib/client";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductGrid from "./ProductGrid";
import ProductsLoadingState from "./ProductsLoadingState";
import ProductsErrorState from "./ProductsErrorState";
import CategoriesSidebar from "./CategoriesSidebar";

interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const MAX_RESULTS = 50;

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState<string>(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // If the prop slug changes (due to navigation), the local state is synchronized
  useEffect(() => {
    setCurrentSlug(slug);
  }, [slug]);

  // Memorized fetch: avoids re-declarations and facilitates cancellation
  const fetchProducts = useCallback(
    async (categorySlug: string, signal?: AbortSignal) => {
      setError(null);
      setLoading(true);

      try {
        const query = `*[
          _type == "product" &&
          references(*[_type == "category" && slug.current == $categorySlug]._id)
        ][0...${MAX_RESULTS}] | order(name asc)`;
        const data = await client.fetch<Product[]>(
          query,
          { categorySlug },
          { signal }
        );
        setProducts(data ?? []);
      } catch (err: unknown) {
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
    []
  );

  // Effect that triggers the search and uses AbortController to prevent race conditions
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(currentSlug, controller.signal);
    return () => controller.abort();
  }, [currentSlug, fetchProducts]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      {/* Categories sidebar */}
      <CategoriesSidebar
        categories={categories}
        currentSlug={currentSlug}
        setCurrentSlug={setCurrentSlug}
      />

      {/* Products grid */}
      <div className="w-full">
        {loading && <ProductsLoadingState />}
        {!loading && error && (
          <ProductsErrorState
            error={error}
            fetchProducts={fetchProducts}
            currentSlug={currentSlug}
          />
        )}
        {!loading && !error && (
          <>
            {products?.length ? (
              <ProductGrid products={products} />
            ) : (
              <NoProductsAvailable selectedTab={currentSlug} className="mt-0" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
