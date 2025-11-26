import { Product } from "@/sanity.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface Props {
  product: Product;
}

const ProductCharacteristics = ({ product }: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold px-3 text-darkColor bg-transparent hover:bg-lightColor/6 hoverEffect">
          {product?.name}: Características
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1 px-3">
          <p className="flex items-center justify-between">
            Marca:{" "}
            <span className="font-semibold tracking-wide">Desconocido</span>
          </p>
          <p className="flex items-center justify-between">
            Colección: <span className="font-semibold tracking-wide">2025</span>
          </p>
          <p className="flex items-center justify-between">
            Tipo:{" "}
            <span className="font-semibold tracking-wide">
              {product?.variant}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Stock:{" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Disponible" : "Agotado"}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Introducción:{" "}
            <span className="font-semibold tracking-wide">
              {product?.intro}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
