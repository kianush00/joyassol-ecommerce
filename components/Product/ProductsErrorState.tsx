"use client";
import { Button } from "../ui/button";

interface Props {
  error: string | null;
  fetchProducts: (
    categorySlug: string,
    signal?: AbortSignal | undefined
  ) => Promise<void>;
  currentSlug: string;
}

const ProductsErrorState = ({ error, fetchProducts, currentSlug }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
      <span className="text-red-600 text-lg font-semibold">{error}</span>
      <Button onClick={() => fetchProducts(currentSlug)}>Reintentar</Button>
    </div>
  );
};

export default ProductsErrorState;
