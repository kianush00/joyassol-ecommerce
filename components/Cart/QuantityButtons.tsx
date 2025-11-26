"use client";
import { Product } from "@/sanity.types";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import useCartStore from "@/store";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const itemCount = useCartStore((s) => s.getItemCount(product?._id));
  const isOutOfStock = product?.stock === 0;
  const handleRemoveProduct = () => {
    removeItem(product._id);
    if (itemCount > 1) {
      toast.success("¡La cantidad disminuyó con éxito!");
    } else {
      toast.success(
        `${product?.name?.substring(0, 12)}... fue eliminado con éxito!`
      );
    }
  };

  return (
    <div className={cn("flex items-center gap-1 text-base pb-1", className)}>
      {/* Remove product */}
      <Button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Minus />
      </Button>

      {/* Item count */}
      <span className="font-semibold w-8 text-center text-darkColor">
        {itemCount}
      </span>

      {/* Add product */}
      <Button
        onClick={() => {
          addItem(product);
          toast.success(
            `${product?.name?.substring(0, 12)}... fue añadido con éxito!`
          );
        }}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
