"use client";
import { ShoppingBag } from "lucide-react";
import CartProductsList from "./CartProductsList";
import OrderSummary from "../Order/OrderSummary";
import { Button } from "../ui/button";
import { CartItem } from "@/store";

interface Props {
  cartProducts: CartItem[];
  loading: boolean;
  getItemCount: (productId: string) => number;
  getSubtotalPrice: () => number;
  getTotalPrice: () => number;
  handleDeleteProduct: (productId: string) => void;
  handleResetCart: () => void;
  handleCheckout: () => void;
}

export default function CartContent({
  cartProducts,
  loading,
  getItemCount,
  getSubtotalPrice,
  getTotalPrice,
  handleDeleteProduct,
  handleResetCart,
  handleCheckout,
}: Readonly<Props>) {
  return (
    <>
      {/* Cart header */}
      <div className="flex items-center gap-2 py-5">
        <ShoppingBag />
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      </div>

      {/* Cart grid */}
      <div className="grid lg:grid-cols-3 md:gap-8">
        {/* Products list */}
        <div className="lg:col-span-2 rounded-lg">
          <div className="border bg-white rounded-md">
            <CartProductsList
              cartProducts={cartProducts}
              getItemCount={getItemCount}
              handleDeleteProduct={handleDeleteProduct}
            />

            <Button
              onClick={handleResetCart}
              className="m-5 font-semibold"
              variant="destructive"
            >
              Reset Cart
            </Button>
          </div>
        </div>

        {/* Order summary for desktop */}
        <div className="lg:col-span-1">
          <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
            <OrderSummary
              isLoading={loading}
              getSubtotalPrice={getSubtotalPrice}
              getTotalPrice={getTotalPrice}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>

        {/* Order summary for mobile */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
          <div className="p-4 rounded-lg border mx-4">
            <OrderSummary
              isLoading={loading}
              getSubtotalPrice={getSubtotalPrice}
              getTotalPrice={getTotalPrice}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </>
  );
}
