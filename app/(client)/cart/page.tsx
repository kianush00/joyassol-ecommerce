"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/Cart/EmptyCart";
import { useAuth } from "@clerk/nextjs";
import CartContent from "@/components/Cart/CartContent";
import NoAccessToCart from "@/components/Cart/NoAccessToCart";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";

const CartPage = () => {
  const groupedItems = useZustandSnapshot((s) => s.getGroupedItems(), []);
  const { isSignedIn } = useAuth();

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems.length ? <CartContent /> : <EmptyCart />}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
