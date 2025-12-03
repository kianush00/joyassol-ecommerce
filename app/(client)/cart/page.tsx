"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/Cart/EmptyCart";
import CartContent from "@/components/Cart/CartContent";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";

const CartPage = () => {
  const groupedItems = useZustandSnapshot((s) => s.getGroupedItems(), []);

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      <Container>
        {groupedItems.length ? <CartContent /> : <EmptyCart />}
      </Container>
    </div>
  );
};

export default CartPage;
