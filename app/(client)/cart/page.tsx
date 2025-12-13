"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/Cart/EmptyCart";
import CartContent from "@/components/Cart/CartContent";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";

const CartPage = () => {
  const totalItems = useZustandSnapshot((s) => s.getTotalItems(), 0);

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      <Container>{totalItems ? <CartContent /> : <EmptyCart />}</Container>
    </div>
  );
};

export default CartPage;
