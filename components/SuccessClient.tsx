"use client";
import useCartStore from "@/store";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Loading from "./Loading";

interface Props {
  orderNumber: string;
  sessionId: string;
}

const SuccessClient = ({ orderNumber, sessionId }: Props) => {
  const [mounted, setMounted] = useState(false);
  const resetCart = useCartStore((s) => s.resetCart);
  const calledRef = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true); // Mounted flag to prevent hydration errors

    if (!calledRef.current) {
      resetCart(); // only call resetCart once
      calledRef.current = true;
    }
  }, [orderNumber, sessionId, resetCart]);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <div className="py-10 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl px-8 py-12 max-w-xl w-full text-center"
      >
        <motion.div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Check className="text-white w-12 h-12" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Pedido confirmado!
        </h1>
        <div className="space-y-4 mb-8 text-left">
          <p className="text-gray-700">
            Gracias por su compra. Estamos procesando su pedido y lo enviaremos
            pronto. En breve recibirá un correo electrónico de confirmación con
            los detalles de su pedido en su bandeja de entrada.
          </p>
          <p className="text-gray-700">
            Número de pedido:{" "}
            <span className="text-black font-semibold">{orderNumber}</span>
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-gray-900 mb-2">¿Qué sigue?</h2>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>
              Revise su correo electrónico para la confirmación del pedido.
            </li>
            <li>Le notificaremos cuando se envíe su pedido.</li>
            <li>Rastree el estado de su pedido en cualquier momento</li>
          </ul>
        </div>

        {/* Order tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Pedidos
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Tienda
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessClient;
