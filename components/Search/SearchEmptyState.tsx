"use client";
import { logoName, searchTextIsTooLong } from "@/app/constants";
import { Search } from "lucide-react";

interface Props {
  search: string;
}

const SearchEmptyState = ({ search }: Props) => {
  const isTooLong = searchTextIsTooLong(search.length);

  return (
    <div className="text-center py-10 font-semibold tracking-wide">
      {/* Search text is too long */}
      {isTooLong && (
        <p className="text-red-600">
          El texto de búsqueda es demasiado largo. Introduzca una consulta más
          corta.
        </p>
      )}
      {/* No results for a valid search */}
      {!isTooLong && search && (
        <p>
          No hay resultados para la palabra clave{" "}
          <span className="underline text-red-600">{search}</span>. Inténtelo de
          nuevo con otra palabra.
        </p>
      )}
      {/* Initial empty state */}
      {!search && (
        <p className="text-green-600 flex items-center justify-center gap-1">
          <Search className="w-5 h-5" />
          Busca y explora tus productos de {logoName}.
        </p>
      )}
    </div>
  );
};

export default SearchEmptyState;
