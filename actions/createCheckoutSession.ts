import { CartItem } from "@/store";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
}

interface CartItems {
  products: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: CartItem[],
  metadata: Metadata
) {
  return "about";
}
