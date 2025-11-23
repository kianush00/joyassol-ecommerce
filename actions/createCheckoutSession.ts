"use server";
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
}

export async function createCheckoutSession(
  items: CartItem[],
  metadata: Metadata
) {
  try {
    const validateEmptyCart = () => {
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Cart is empty");
      }
    };

    const validateItemHasNoPrice = () => {
      for (const item of items) {
        if (!item.product?.price || typeof item.product.price !== "number") {
          throw new Error(`Invalid price for product ${item.product?._id}`);
        }

        if (item.quantity <= 0) {
          throw new Error(`Invalid quantity for product ${item.product?._id}`);
        }
      }
    };

    // Validate cart
    validateEmptyCart();
    validateItemHasNoPrice();

    // Retrieve existing customer or create a new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "CLP",
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description,
            metadata: { id: item.product._id },
            images:
              item.product.images && item.product.images.length > 0
                ? [urlFor(item.product.images[0]).url()]
                : undefined,
          },
          unit_amount: Math.round(item.product.price!),
        },
        quantity: item.quantity,
      })),
    };

    // Conditionally add customer or customer_email
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return session.url;
  } catch (error: unknown) {
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe error:", error);
    } else {
      console.error("Unexpected checkout error:", error);
    }
    throw new Error("Checkout session could not be created");
  }
}
