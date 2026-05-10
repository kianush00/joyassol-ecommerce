"use client";
import { ClerkLoaded, Show, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
import OrdersIcon from "../Order/OrdersIcon";
import SignInLink from "./SignInLink";

const HeaderAuth = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [orders, setOrders] = useState<MY_ORDERS_QUERY_RESULT | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrders(null);
      return;
    }

    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders)
      .catch(console.error);
  }, [isSignedIn]);

  // Loading skeleton
  if (!isLoaded) {
    return <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-md" />;
  }

  return (
    <ClerkLoaded>
      <Show when="signed-out">
        <SignInLink />
      </Show>
      <Show when="signed-in">
        <OrdersIcon orders={orders} />
        <UserButton />
      </Show>
    </ClerkLoaded>
  );
};

export default HeaderAuth;
