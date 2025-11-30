"use client";
import useCartStore, { CartItem } from "@/store";
import toast from "react-hot-toast";
import CartProductItem from "./CartProductItem";

interface Props {
  cartProducts: CartItem[];
}

const CartProductsList = ({ cartProducts }: Readonly<Props>) => {
  const deleteCartProduct = useCartStore((s) => s.deleteCartProduct);

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
