"use client";
import { ShoppingBag } from "lucide-react";
import CartProductsList from "./CartProductsList";
import { Button } from "../ui/button";
import useCartStore, { CartItem } from "@/store";
import toast from "react-hot-toast";
import CartOrderSummary from "./CartOrderSummary";

interface Props {
  cartProducts: CartItem[];
}

export default function CartContent({ cartProducts }: Readonly<Props>) {
  const resetCart = useCartStore((s) => s.resetCart);

  const handleResetCart = () => {
    const confirmed = globalThis.confirm(
      "¿Estás segur@ de que quieres restablecer el carrito?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Carrito reiniciado correctamente", { icon: "🗑️" });
    }
  };

  return (
    <>
      {/* Cart header */}
      <div className="flex items-center gap-2 py-5">
        <ShoppingBag />
        <h1 className="text-2xl font-semibold">Tu Carrito</h1>
      </div>

      {/* Cart grid */}
      <div className="grid lg:grid-cols-3 md:gap-8">
        {/* Products list */}
        <div className="lg:col-span-2 rounded-lg">
          <div className="border bg-white rounded-md">
            <CartProductsList cartProducts={cartProducts} />

            <Button
              onClick={handleResetCart}
              className="m-5 font-semibold"
              variant="destructive"
            >
              Reiniciar carrito
            </Button>
          </div>
        </div>

        {/* Order summary for desktop */}
        <div className="lg:col-span-1">
          <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
            <CartOrderSummary cartProducts={cartProducts} />
          </div>
        </div>

        {/* Order summary for mobile */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
          <div className="p-4 rounded-lg border mx-4">
            <CartOrderSummary cartProducts={cartProducts} />
          </div>
        </div>
      </div>
    </>
  );
}
