"use client";
import { Product } from "@/sanity.types";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { cn, truncateName } from "@/lib/utils";
import useCartStore from "@/store";
import { toast } from "sonner";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";

interface Props {
  product: Product;
  className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const itemCount = useZustandSnapshot((s) => s.getItemCount(product._id), 0);
  const isOutOfStock = !product.stock;
  const productName = product.name || "Producto";

  const handleRemoveProduct = () => {
    if (itemCount === 0) return; // Prevent negative itemCount
    removeItem(product._id);
    if (itemCount > 1) {
      toast.success("Cantidad reducida correctamente");
    } else {
      toast.success(`${truncateName(productName, 30)} eliminado del carrito`, {
        icon: "🗑️",
      });
    }
  };

  const handleAddProduct = () => {
    if (isOutOfStock) return; // Prevent adding out of stock products

    addItem(product);
    toast.success(`${truncateName(productName, 30)} agregado`);
  };

  if (!product._id) {
    console.error("QuantityButtons: product._id is required");
    return null;
  }

  return (
    <div className={cn("flex items-center gap-1 text-base pb-1", className)}>
      {/* Remove product */}
      <Button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        variant="outline"
        size="icon"
        className="w-6 h-6 disabled:cursor-not-allowed"
        aria-label="Disminuir cantidad"
        type="button"
      >
        <Minus className="w-4 h-4" />
      </Button>

      {/* Item count */}
      <span
        className="font-semibold w-8 text-center text-darkColor"
        aria-label={`Cantidad: ${itemCount}`}
      >
        {itemCount}
      </span>

      {/* Add product */}
      <Button
        onClick={handleAddProduct}
        variant="outline"
        size="icon"
        className="w-6 h-6 disabled:cursor-not-allowed"
        disabled={isOutOfStock}
        aria-label="Aumentar cantidad"
        type="button"
      >
        <Plus className="w-4 h-4" />
      </Button>

      {isOutOfStock && (
        <span className="text-xs text-red-500 ml-2">Sin stock</span>
      )}
    </div>
  );
};

export default QuantityButtons;
