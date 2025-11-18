import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { ListOrdered } from "lucide-react";
import Link from "next/link";

const OrdersIcon = ({ orders }: { orders: MY_ORDERS_QUERYResult | null }) => {
  return (
    <Link href={"/orders"} className="group relative">
      <ListOrdered className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {orders?.length || 0}
      </span>
    </Link>
  );
};

export default OrdersIcon;
