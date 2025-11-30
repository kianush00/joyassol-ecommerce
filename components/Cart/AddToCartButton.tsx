"use client";
import { Product } from "@/sanity.types";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { cn, truncateName } from "@/lib/utils";
import QuantityButtons from "./QuantityButtons";
import PriceFormatter from "../Price/PriceFormatter";
import useCartStore from "@/store";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const itemCount = useZustandSnapshot((s) => s.getItemCount(product._id), 0);
  const [isAdding, setIsAdding] = useState(false);

  // Validations
  const isOutOfStock = !product.stock;
  const productName = product.name || "Producto";
  const hasValidId = !!product._id;

  const handleAddToCart = async () => {
    // Early validation
    if (!hasValidId) {
      toast.error("Error: Producto inválido");
      return;
    }

    if (isOutOfStock) {
      toast.error("Producto agotado");
      return;
    }

    setIsAdding(true);

    try {
      addItem(product);
      toast.success(`${truncateName(productName, 20)} añadido al carrito`);
    } catch (error) {
      toast.error("Error al añadir al carrito");
      console.error("Error adding to cart:", error);
    } finally {
      setTimeout(() => setIsAdding(false), 300); // Short delay to prevent button flickering
    }
  };

  // Guard clause for invalid id
  if (!hasValidId) {
    return (
      <div className="w-full h-12 flex items-center justify-center">
        <span className="text-sm text-gray-500">Producto no disponible</span>
      </div>
    );
  }

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount > 0 ? (
        // Update cart
        <div className="w-full text-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">
              Cantidad
            </span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold text-gray-700">
              Subtotal
            </span>
            <PriceFormatter
              amount={product.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        // Add to cart
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          className={cn(
            "w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect",
            isOutOfStock && "opacity-50 cursor-not-allowed",
            isAdding && "opacity-70",
            className
          )}
          aria-label={`Añadir ${productName} al carrito`}
        >
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Añadir al carrito
          </span>
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
