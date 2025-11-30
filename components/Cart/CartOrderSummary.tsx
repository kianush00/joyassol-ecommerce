"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PriceFormatter from "@/components/Price/PriceFormatter";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import Loading from "../Loading";
import { CheckCircle2, Loader2 } from "lucide-react";

const CartOrderSummary = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const cartProducts = useZustandSnapshot((s) => s.getGroupedItems(), []);
  const totalPrice = useZustandSnapshot((s) => s.getTotalPrice(), 0);
  const subtotalPrice = useZustandSnapshot((s) => s.getSubtotalPrice(), 0);

  // Values and validations
  const discount = subtotalPrice - totalPrice;
  const hasDiscount = discount > 0;
  const hasItems = cartProducts.length > 0;
  const canCheckout = hasItems && isLoaded && user;

  /**
   * Handles checkout process by creating a checkout session and redirecting user to checkout URL.
   * @returns {Promise<void>}
   */
  const handleCheckout = async () => {
    // Early validation
    if (!user) {
      toast.error("Por favor inicia sesión para continuar");
      return;
    }

    if (!hasItems) {
      toast.error("Tu carrito está vacío");
      return;
    }

    setLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user.fullName || user.firstName || "Cliente",
        customerEmail: user.emailAddresses[0]?.emailAddress || "",
        clerkUserId: user.id,
      };

      // Validate email
      if (!metadata.customerEmail) {
        throw new Error("No valid email address was found");
      }

      const checkoutUrl = await createCheckoutSession(cartProducts, metadata);

      if (!checkoutUrl) {
        throw new Error("The payment session could not be created");
      }
      toast.success("Redirigiendo al pago...", { icon: <Loader2 /> });
      await new Promise((resolve) => setTimeout(resolve, 500)); // A slight delay for the user to see the message.

      globalThis.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al procesar el pago. Por favor intenta nuevamente.";

      toast.error(errorMessage);
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <PriceFormatter amount={subtotalPrice} />
        </div>

        {/* Discount */}
        {hasDiscount && (
          <div className="flex justify-between text-green-950">
            <span>Descuento</span>
            <PriceFormatter amount={discount} />
          </div>
        )}

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <PriceFormatter
            amount={totalPrice}
            className="text-lg font-bold text-black"
          />
        </div>

        {/* Checkout button */}
        <Button
          disabled={!canCheckout || loading}
          onClick={handleCheckout}
          className="w-full rounded-full font-semibold tracking-wide"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            "Realizar pago"
          )}
        </Button>

        {/* Payment information */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4.5 h-4.5 text-green-600 shrink-0" />
            <span>Pago 100% seguro y encriptado</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4.5 h-4.5 text-green-600 shrink-0" />
            <span>Devoluciones gratuitas en 30 días</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartOrderSummary;
