"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PriceFormatter from "@/components/Price/PriceFormatter";
import Image from "next/image";
import Link from "next/link";
import paypalLogo from "@/images/paypalLogo.png";

interface OrderSummaryProps {
  getSubtotalPrice: () => number;
  getTotalPrice: () => number;
  handleCheckout: () => void;
  isLoading: boolean;
}

const OrderSummary = ({
  getSubtotalPrice,
  getTotalPrice,
  handleCheckout,
  isLoading,
}: OrderSummaryProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <PriceFormatter amount={getSubtotalPrice()} />
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <PriceFormatter amount={getSubtotalPrice() - getTotalPrice()} />
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>Total</span>
          <PriceFormatter
            amount={getTotalPrice()}
            className="text-lg font-bold text-black"
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={handleCheckout}
          className="w-full rounded-full font-semibold tracking-wide"
          size="lg"
        >
          Proceed to Checkout
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

export default OrderSummary;
