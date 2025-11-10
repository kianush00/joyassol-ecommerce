"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import NoAccessToCart from "@/components/NoAccessToCart";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { isSignedIn } = useAuth();
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();

  const user = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }
  const cartProducts = getGroupedItems();

  return (
    <div>
      {isSignedIn ? (
        <Container>
          {cartProducts?.length ? <p>products</p> : <EmptyCart />}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
