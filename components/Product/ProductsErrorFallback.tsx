"use client";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { FallbackProps } from "react-error-boundary";

const ProductsErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          {/* Error icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>

          {/* Error message */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error al cargar productos
          </h3>

          <p className="text-gray-600 mb-6">
            {error instanceof Error
              ? error.message
              : "Ha ocurrido un error inesperado"}
          </p>

          {/* Retry button */}
          <Button
            onClick={resetErrorBoundary}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsErrorFallback;
