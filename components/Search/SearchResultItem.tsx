"use client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "../Price/PriceView";
import AddToCartButton from "../Cart/AddToCartButton";
import { Product } from "@/sanity.types";
import { getProductUrl } from "@/app/constants";

interface Props {
  product: Product;
  setShowSearch: (showSearch: boolean) => void;
}

const SearchResultItem = ({ product, setShowSearch }: Props) => {
  return (
    <div className="bg-white overflow-hidden border-b last:border-b-0">
      <div className="flex items-center p-1">
        {/* PRODUCT IMAGE */}
        <Link
          href={getProductUrl(product.slug?.current)}
          className="h-20 w-20 md:h-24 md:w-24 shrink-0 border border-darkColor/20 rounded-md overflow-hidden group"
          onClick={() => setShowSearch(false)}
        >
          {product.images && (
            <Image
              src={urlFor(product.images[0]).url()}
              width={200}
              height={200}
              alt={product.name || "Product image"}
              className="object-cover w-full h-full group-hover:scale-110 hoverEffect"
            />
          )}
        </Link>

        {/* PRODUCT INFO */}
        <div className="px-4 py-2 grow">
          <Link
            href={getProductUrl(product.slug?.current)}
            onClick={() => setShowSearch(false)}
          >
            <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">
              {product.intro}
            </p>
          </Link>

          {/* PRICE */}
          <PriceView
            price={product.price}
            discount={product.discount}
            className="md:text-lg"
          />
        </div>

        {/* Add to cart */}
        <div className="w-60 mt-1">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
