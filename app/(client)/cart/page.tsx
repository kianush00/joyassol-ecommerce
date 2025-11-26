"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/Cart/EmptyCart";
import Loading from "@/components/Loading";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import CartContent from "@/components/Cart/CartContent";
import NoAccessToCart from "@/components/Cart/NoAccessToCart";

const CartPage = () => {
  const [mounted, setMounted] = useState(false);

  // Mounted flag to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const deleteCartProduct = useCartStore((s) => s.deleteCartProduct);
  const resetCart = useCartStore((s) => s.resetCart);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getSubtotalPrice = useCartStore((s) => s.getSubtotalPrice);
  const groupedItems = useCartStore((s) => s.getGroupedItems());
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (!mounted) {
    return <Loading />;
  }

  const handleResetCart = () => {
    const confirmed = globalThis.confirm(
      "¿Estás segur@ de que quieres restablecer el carrito?"
    );
    if (confirmed) {
      resetCart();
      toast.success("¡Tu carrito se ha reiniciado correctamente!");
    }
  };
  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("¡El producto se ha eliminado correctamente!");
  };

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
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
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
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems.length ? (
            <CartContent
              cartProducts={groupedItems}
              loading={loading}
              getItemCount={getItemCount}
              getSubtotalPrice={getSubtotalPrice}
              getTotalPrice={getTotalPrice}
              handleDeleteProduct={handleDeleteProduct}
              handleResetCart={handleResetCart}
              handleCheckout={handleCheckout}
            />
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
