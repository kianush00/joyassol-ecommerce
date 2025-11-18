"use client";
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
        {products?.map((product: Product) => (
          <motion.div
            key={product?._id}
            layout
            initial={{ opacity: 0.2, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.27 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default ProductGrid;
