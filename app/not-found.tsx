import Logo from "@/components/Logo";
import Link from "next/link";
import { logoName } from "./constants";
import { Home, HelpCircle, Mail } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 relative min-h-screen">
      <div className="h-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo with animation */}
          <div className="text-center animate-fade-in">
            <Logo>{logoName}</Logo>

            {/* 404 */}
            <h1 className="mt-6 text-9xl font-extrabold text-gray-300">404</h1>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              ¿Buscas algo?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Lo sentimos. La dirección web que ingresó no es una página
              funcional de nuestro sitio.
            </p>
          </div>

          {/* Buttons with icons */}
          <div className="mt-8 space-y-3">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-darkBlue/80 hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkBlue transition-all hover:scale-105"
            >
              <Home className="w-4 h-4" />
              Ir a la página de inicio
            </Link>
            <Link
              href="/help"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              Ayuda
            </Link>
          </div>

          {/* Additional links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ¿Necesitas ayuda? Visita la{" "}
              <Link
                href="/help"
                className="font-medium text-darkBlue hover:underline"
              >
                Sección de ayuda
              </Link>{" "}
              o{" "}
              <Link
                href="/contact"
                className="font-medium text-darkBlue hover:underline inline-flex items-center gap-1"
              >
                contáctanos
                <Mail className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
