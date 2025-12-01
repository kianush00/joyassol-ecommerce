import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import PriceView from "../Price/PriceView";
import AddToCartButton from "../Cart/AddToCartButton";
import { getProductUrl } from "@/app/constants";
import NoImageFallback from "../Image/NoImageFallback";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const isOutOfStock = !product.stock;
  const productUrl = getProductUrl(product.slug?.current);

  return (
    <div className="group text-sm rounded-lg overflow-hidden">
      {/* PRODUCT IMAGE */}
      <div className="bg-linear-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative">
        {/* Product image */}
        <Link href={productUrl}>
          {product.images && product.images.length > 0 ? (
            <Image
              src={urlFor(product.images[0]).url()}
              width={500}
              height={500}
              alt={product.name || "Producto sin nombre"}
              priority
              className={`w-full h-72 object-contain overflow-hidden hoverEffect ${
                !isOutOfStock && "group-hover:scale-105"
              }`}
            />
          ) : (
            <NoImageFallback className="w-full h-72" />
          )}
        </Link>

        {/* Out of stock */}
        {isOutOfStock && (
          <div className="absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center">
            <p className="text-lg text-white font-semibold text-center">
              Agotado
            </p>
          </div>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
        <h2 className="font-semibold line-clamp-1">{product.name}</h2>
        <p>{product.intro}</p>
        <PriceView
          className="text-lg"
          price={product.price}
          discount={product.discount}
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
