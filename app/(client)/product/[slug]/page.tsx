import AddToCartButton from "@/components/Cart/AddToCartButton";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/Price/PriceView";
import ProductCharacteristics from "@/components/Product/ProductCharacteristics";
import { getProductBySlug } from "@/sanity/helpers/queries";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";
import { RxBorderSplit } from "react-icons/rx";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const SingleProductPage = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <Container className="py-10 flex flex-col md:flex-row gap-10">
      {/* PRODUCT IMAGE */}
      <ImageView images={product?.images ?? []} />

      {/* PRODUCT INFO */}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        {/* Product name and price */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {product?.name}
          </h2>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-lg font-bold"
          />
        </div>

        {/* Stock status */}
        {product?.stock ? (
          <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
            En Stock
          </p>
        ) : (
          <p className="bg-red-100 w-24 text-center text-red-600 text-sm py-2.5 font-semibold rounded-lg">
            Agotado
          </p>
        )}

        {/* Product description */}
        <p className="text-sm text-gray-600 tracking-wide">
          {product?.description}
        </p>

        {/* Cart and wishlist buttons */}
        <div className="flex items-center gap-2.5 lg:gap-5">
          <AddToCartButton
            product={product}
            className="bg-darkColor/80 text-white hover:bg-darkColor hoverEffect"
          />
          <button className="border-2 border-darkColor/30 text-darkColor/60 px-2.5 py-1.5 rounded-md hover:text-darkColor hover:border-darkColor hoverEffect">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Product characteristics */}
        <ProductCharacteristics product={product} />
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <RxBorderSplit className="text-lg" />
            <p>Comparar color</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FaRegQuestionCircle className="text-lg" />
            <p>Haz una pregunta</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <TbTruckDelivery className="text-lg" />
            <p>Delivery & Reembolso</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FiShare2 className="text-lg" />
            <p>Compartir</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEffect">
            <p className="text-base font-semibold text-darkColor">
              Free Shipping
            </p>
            <p className="text-sm text-gray-500">
              Free shipping over order $120
            </p>
          </div>
          <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEffect">
            <p className="text-base font-semibold text-darkColor">
              Pago Flexible
            </p>
            <p className="text-sm text-gray-500">
              Pago con Múltiples Tarjetas de Crédito
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
