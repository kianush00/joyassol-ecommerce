"use client";
import { useZustandSnapshot } from "@/hooks/useZustandSnapshot";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartIcon = () => {
  const totalItems = useZustandSnapshot((s) => s.getTotalItems(), 0);
  const fontSize = totalItems < 10 ? "text-xs" : "text-[10px]";
  const count = totalItems > 99 ? "99+" : totalItems;

  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
      {totalItems > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full font-semibold flex items-center justify-center ${fontSize}`}
        >
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
