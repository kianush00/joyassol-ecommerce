"use client";
import { Product } from "@/sanity.types";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import QuantityButtons from "./QuantityButtons";
import PriceFormatter from "../Price/PriceFormatter";
import useCartStore from "@/store";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const [mounted, setMounted] = useState(false);

  // Use useEffect to set mounted to true after component mounts
  // This ensures that the component only renders on the client-side
  // Preventing hydration errors due to server/client mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const addItem = useCartStore((s) => s.addItem);
  const itemCount = useCartStore((s) => s.getItemCount(product?._id));
  const isOutOfStock = product?.stock === 0;

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount > 0 ? (
        // Update cart
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Cantidad</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        // Add to cart
        <Button
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.name?.substring(0, 12)}... añadido con éxito!`
            );
          }}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect",
            className
          )}
        >
          Añadir al carrito
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
