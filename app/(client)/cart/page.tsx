"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import NoAccessToCart from "@/components/NoAccessToCart";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import CartContent from "@/components/CartContent";

const CartPage = () => {
  const deleteCartProduct = useCartStore((s) => s.deleteCartProduct);
  const resetCart = useCartStore((s) => s.resetCart);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getSubtotalPrice = useCartStore((s) => s.getSubtotalPrice);
  const groupedItems = useCartStore((s) => s.getGroupedItems());
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }

  const handleResetCart = () => {
    const confirmed = globalThis.confirm(
      "Are you sure you want to reset cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Your cart reset successfully!");
    }
  };
  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
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
