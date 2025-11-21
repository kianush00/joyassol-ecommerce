"use client";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import { useEffect, useState } from "react";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductGrid from "./ProductGrid";
import ProductsLoadingState from "./ProductsLoadingState";
import ProductsErrorState from "./ProductsErrorState";
import CategoriesSidebar from "./CategoriesSidebar";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { QueryParams } from "next-sanity";

interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const MAX_RESULTS = 50;

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState<string>(slug);

  // If the prop slug changes (due to navigation), the local state is synchronized
  useEffect(() => {
    setCurrentSlug(slug);
  }, [slug]);

  const query = `*[
        _type == "product" &&
        references(*[_type == "category" && slug.current == $categorySlug]._id)
        ][0...${MAX_RESULTS}] | order(name asc)`;

  const params: QueryParams = { categorySlug: currentSlug };
  const { products, loading, error, fetchProducts } = useFilteredProducts({
    query,
    params: params,
  });

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
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
            params={params}
          />
        )}

        {!loading &&
          !error &&
          (products.length ? (
            <ProductGrid products={products} />
          ) : (
            <NoProductsAvailable selectedTab={currentSlug} className="mt-0" />
          ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
