"use client";
import { QueryParams } from "next-sanity";
import { Button } from "../ui/button";

interface Props {
  error: string | null;
  fetchProducts?: (
    overrides?:
      | {
          params?: QueryParams;
          signal?: AbortSignal;
        }
      | undefined
  ) => Promise<void>;
  params?: QueryParams;
}

const ProductsErrorState = ({ error, fetchProducts, params }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
      <span className="text-red-600 text-lg font-semibold">{error}</span>
      {fetchProducts && params && (
        <Button onClick={() => fetchProducts({ params: params })}>
          Reintentar
        </Button>
      )}
    </div>
  );
};

export default ProductsErrorState;
