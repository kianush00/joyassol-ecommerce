"use client";
import useCartStore from "@/store";
import { toast } from "sonner";
import CartProductItem from "./CartProductItem";

const CartProductsList = () => {
  const deleteCartProduct = useCartStore((s) => s.deleteCartProduct);
  const cartProducts = useCartStore((s) => s.getGroupedItems());

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Producto eliminado del carrito", { icon: "🗑️" });
  };

  return (
    <>
      {cartProducts?.map(({ product }) => (
        <CartProductItem
          key={product._id}
          product={product}
          onDelete={handleDeleteProduct}
        />
      ))}
    </>
  );
};

export default CartProductsList;
