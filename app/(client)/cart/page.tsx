"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import NoAccessToCart from "@/components/NoAccessToCart";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OrderSummary from "@/components/OrderSummary";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import CartProductsList from "@/components/CartProductsList";

const CartPage = () => {
  const deleteCartProduct = useCartStore((s) => s.deleteCartProduct);
  const resetCart = useCartStore((s) => s.resetCart);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getSubtotalPrice = useCartStore((s) => s.getSubtotalPrice);
  const cartProducts = useCartStore((s) => s.getGroupedItems());
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
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {cartProducts?.length ? (
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

                {/* Order summary for desktop view */}
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

                {/* Order summary for mobile view */}
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
