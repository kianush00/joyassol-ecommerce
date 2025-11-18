"use client";
import { Loader2 } from "lucide-react";

const ProductsLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
      <div className="flex items-center space-x-2 text-blue-600">
        <Loader2 className="animate-spin" />
        <span className="text-lg font-semibold">Cargando productos...</span>
      </div>
    </div>
  );
};

export default ProductsLoadingState;
