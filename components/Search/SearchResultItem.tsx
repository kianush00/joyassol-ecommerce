"use client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "../Price/PriceView";
import AddToCartButton from "../Cart/AddToCartButton";
import { Product } from "@/sanity.types";
import { getProductUrl } from "@/app/constants";
import NoImageFallback from "../Image/NoImageFallback";

interface Props {
  product: Product;
  setShowSearch: (showSearch: boolean) => void;
}

const SearchResultItem = ({ product, setShowSearch }: Props) => {
  if (!product._id) return null;
  const productUrl = getProductUrl(product.slug?.current);
  const productName = product.name || "Producto sin nombre";

  return (
    <div className="bg-white overflow-hidden border-b last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center p-2 md:p-3 gap-3">
        {/* PRODUCT IMAGE */}
        <Link
          href={productUrl}
          className="h-20 w-20 md:h-24 md:w-24 shrink-0 border border-darkColor/20 rounded-md overflow-hidden group"
          onClick={() => setShowSearch(false)}
          aria-label={`Ver detalles de ${productName}`}
        >
          {product.images && product.images.length > 0 ? (
            <Image
              src={urlFor(product.images[0])
                .width(300)
                .fit("crop")
                .auto("format")
                .quality(70)
                .url()}
              width={200}
              height={200}
              alt={productName}
              className="object-cover w-full h-full group-hover:scale-110 hoverEffect"
              loading="lazy"
            />
          ) : (
            <NoImageFallback />
          )}
        </Link>

        {/* PRODUCT INFO */}
        <div className="px-2 py-2 flex-1 min-w-0">
          <Link
            href={getProductUrl(product.slug?.current)}
            onClick={() => setShowSearch(false)}
            className="block hover:text-darkColor hoverEffect"
          >
            <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
              {productName}
            </h3>
            {product.intro && (
              <p className="text-xs md:text-sm text-gray-600 line-clamp-1 mt-0.5">
                {product.intro}
              </p>
            )}
          </Link>

          {/* PRICE */}
          <PriceView
            price={product.price}
            discount={product.discount}
            className="text-sm md:text-base mt-1"
          />
        </div>

        {/* Add to cart */}
        <div className="w-32 sm:w-38 md:w-45 shrink-0">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
