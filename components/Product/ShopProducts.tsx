"use client";
import { ErrorBoundary } from "react-error-boundary";
import ShopProductsContent from "./ShopProductsContent";
import ProductsErrorFallback from "./ProductsErrorFallback";

const ShopProducts = () => {
  return (
    <>
      <h2 className="my-5 font-semibold text-xl underline underline-offset-4 decoration-1">
        ¡Consigue tus mejores ofertas de compras con nosotros!
      </h2>

      <ErrorBoundary
        FallbackComponent={ProductsErrorFallback}
        onReset={() => {
          console.log("ErrorBoundary reset");
        }}
      >
        <ShopProductsContent />
      </ErrorBoundary>
    </>
  );
};

export default ShopProducts;
