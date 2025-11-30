"use client";
import useCartStore from "@/store";
import toast from "react-hot-toast";
import CartProductItem from "./CartProductItem";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";

const CartProductsList = () => {
  const deleteCartProduct = useCartStore((s) => s.deleteCartProduct);
  const cartProducts = useZustandSnapshot((s) => s.getGroupedItems(), []);

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
