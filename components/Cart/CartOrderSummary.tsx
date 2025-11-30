"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PriceFormatter from "@/components/Price/PriceFormatter";
import Image from "next/image";
import Link from "next/link";
import paypalLogo from "@/images/paypalLogo.png";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CartItem } from "@/store";

interface Props {
  cartProducts: CartItem[];
}

const CartOrderSummary = ({ cartProducts }: Readonly<Props>) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const totalPrice = useZustandSnapshot((s) => s.getTotalPrice(), 0);
  const subtotalPrice = useZustandSnapshot((s) => s.getSubtotalPrice(), 0);

  /**
   * Handles checkout process by creating a checkout session and redirecting user to checkout URL.
   * @returns {Promise<void>}
   */
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(cartProducts, metadata);
      if (checkoutUrl) {
        globalThis.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <PriceFormatter amount={subtotalPrice} />
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <PriceFormatter amount={subtotalPrice - totalPrice} />
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>Total</span>
          <PriceFormatter
            amount={totalPrice}
            className="text-lg font-bold text-black"
          />
        </div>
        <Button
          disabled={loading}
          onClick={handleCheckout}
          className="w-full rounded-full font-semibold tracking-wide"
          size="lg"
        >
          Realizar pago
        </Button>
        <Link
          href="/"
          className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/5 hoverEffect"
        >
          <Image src={paypalLogo} alt="paypalLogo" className="w-20" />
        </Link>
      </div>
    </>
  );
};

export default CartOrderSummary;
