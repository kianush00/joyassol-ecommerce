"use client";
import { logoName, productType, searchTextIsTooLong } from "@/app/constants";
import { AlertCircle, Search, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  search: string;
  setShowSearch: (showSearch: boolean) => void;
}

const SearchEmptyState = ({ search, setShowSearch }: Props) => {
  const isTooLong = searchTextIsTooLong(search.length);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* Search text is too long */}
        {isTooLong && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Texto demasiado largo
            </h3>
            <p className="text-gray-600 mb-4">
              El texto de búsqueda es demasiado largo. Por favor, introduce una
              consulta más corta.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
              <p className="font-semibold text-blue-900 mb-2">💡 Consejos:</p>
              <ul className="list-disc list-inside text-blue-800 space-y-1">
                <li>Usa palabras clave específicas</li>
                <li>Evita frases muy largas</li>
                <li>Intenta con términos más generales</li>
              </ul>
            </div>
          </>
        )}

        {/* No results for a valid search */}
        {!isTooLong && search && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 mb-4">
              No hay resultados para{" "}
              <span className="font-semibold text-darkColor">
                &quot;{search}&quot;
              </span>
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-left space-y-3">
              <p className="font-semibold text-gray-900">
                Prueba lo siguiente:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Verifica la ortografía</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Usa palabras más generales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Intenta con sinónimos</span>
                </li>
              </ul>

              {/* ✅ Link a categorías */}
              <div className="pt-3 border-t border-gray-200">
                <Link
                  href="/"
                  onClick={() => setShowSearch(false)}
                  className="text-darkColor hover:underline font-medium text-sm"
                >
                  Ver todos los productos →
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Initial empty state */}
        {!search && (
          <>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Busca tus productos favoritos
            </h3>
            <p className="text-gray-600 mb-6">
              Explora nuestra colección de {logoName} y encuentra lo que
              necesitas
            </p>

            {/* Popular searches */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-900 mb-3">
                Búsquedas populares:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {productType.map((item) => (
                  <button
                    key={item.title}
                    className="px-3 py-1.5 bg-white border border-green-300 rounded-full text-sm text-green-700 hover:bg-green-100 hover:border-green-400 transition-colors"
                    onClick={() => {
                      // TODOO: handle this onClick by passing setSearch as a prop or using a context
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchEmptyState;
