"use client";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Heart, Trash } from "lucide-react";
import PriceFormatter from "../Price/PriceFormatter";
import QuantityButtons from "./QuantityButtons";
import { getProductUrl } from "@/app/constants";

interface Props {
  cartProducts: CartItem[];
  getItemCount: (productId: string) => number;
  handleDeleteProduct: (productId: string) => void;
}

const CartProductsList = ({
  cartProducts,
  getItemCount,
  handleDeleteProduct,
}: Props) => {
  return (
    <>
      {cartProducts?.map(({ product }) => {
        const itemCount = getItemCount(product._id);

        return (
          <div
            key={product._id}
            className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
          >
            <div className="flex flex-1 items-center gap-2 h-36 md:h-44">
              {/* Product Image */}
              {product.images && (
                <Link
                  href={getProductUrl(product.slug?.current)}
                  className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                >
                  <Image
                    src={urlFor(product.images[0]).url()}
                    alt="productImage"
                    width={500}
                    height={500}
                    loading="lazy"
                    className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                  />
                </Link>
              )}

              {/* Product Info */}
              <div className="h-full flex flex-1 items-start flex-col justify-between py-1">
                <div className="space-y-1.5">
                  <h2 className="font-semibold line-clamp-1">{product.name}</h2>
                  <p className="text-sm text-lightColor font-medium">
                    {product.intro}
                  </p>
                  <p className="text-sm capitalize">
                    Variant:{" "}
                    <span className="font-semibold">{product.variant}</span>
                  </p>
                  <p className="text-sm capitalize">
                    Status:{" "}
                    <span className="font-semibold">{product.status}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="text-gray-500 flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect" />
                      </TooltipTrigger>
                      <TooltipContent className="font-bold">
                        Add to favorite
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Trash
                          onClick={() => handleDeleteProduct(product._id)}
                          className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="font-bold bg-red-600">
                        Delete product
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                <PriceFormatter
                  amount={(product.price ?? 0) * itemCount}
                  className="font-bold text-lg"
                />
                <QuantityButtons product={product} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartProductsList;
