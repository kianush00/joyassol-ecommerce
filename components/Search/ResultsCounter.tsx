import { Product } from "@/sanity.types";

interface Props {
  products: Product[];
}

const ResultsCounter = ({ products }: Props) => {
  return (
    <div className="px-4 py-2 bg-gray-50 border-b text-sm text-gray-600">
      {products.length} {products.length === 1 ? "resultado" : "resultados"}
    </div>
  );
};

export default ResultsCounter;
