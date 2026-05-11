"use client";
import Logo from "./Logo";
import { motion } from "motion/react";
import { logoName } from "../app/constants/index";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center gap-8"
      >
        {/* Logo */}
        <Logo>{logoName}</Logo>

        {/* Spinner + label */}
        <div className="flex flex-col items-center gap-3">
          {/* Ring spinner */}
          <div className="relative w-10 h-10">
            {/* Track */}
            <div className="absolute inset-0 rounded-full border-[2.5px] border-gray-100" />
            {/* Animated arc */}
            <motion.div
              className="absolute inset-0 rounded-full border-[2.5px] border-transparent border-t-green-600"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>

          {/* Label */}
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-sm font-semibold tracking-widest text-gray-700 uppercase"
          >
            Cargando
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;
