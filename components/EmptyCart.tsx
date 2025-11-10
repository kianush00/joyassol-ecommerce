"use client";
import emptyCart from "@/images/emptyCart.png";
import Image from "next/image";
import { motion } from "motion/react";

const EmptyCart = () => {
  return (
    <div className="py-10 md:py-20 bg-linear-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div className="bg-white rounded-2xl">
        <motion.div>
          <Image src={emptyCart} alt="emptyCart" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
