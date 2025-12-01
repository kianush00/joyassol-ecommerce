"use client";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { useRef, useEffect } from "react";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  loading?: boolean;
  autoFocus?: boolean;
}

const SearchInput = ({
  search,
  setSearch,
  loading = false,
  autoFocus = true,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatic focus on input
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    setSearch("");
    inputRef.current?.focus(); // Keep cursor in input
  };

  return (
    <form
      className="relative"
      onSubmit={(e) => e.preventDefault()}
      role="search"
    >
      {/* Hidden label for screen readers */}
      <label htmlFor="product-search" className="sr-only">
        Buscar productos
      </label>

      {/* Input */}
      <Input
        id="product-search"
        ref={inputRef}
        type="search"
        placeholder="Busca tu producto aquí..."
        className="flex-1 rounded-md py-5"
        value={search}
        onChange={(e) => setSearch(e.target.value.trimStart())}
        autoComplete="off"
        aria-label="Buscar productos"
      />

      {/* Clear button */}
      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 -translate-y-1/2 right-12 p-1 hover:bg-gray-100 rounded-full transition-colors hoverEffect"
          aria-label="Limpiar búsqueda"
          disabled={loading}
        >
          <X className="w-4 h-4 text-gray-500 hover:text-red-600 transition-colors" />
        </button>
      )}

      {/* Submit button */}
      <button
        type="button"
        className={`absolute w-10 h-full top-0 right-0 flex items-center justify-center rounded-tr-md rounded-br-md hoverEffect ${
          search
            ? "bg-darkColor text-white hover:bg-darkColor/90"
            : "bg-darkColor/10 hover:bg-darkColor/20"
        }`}
        disabled={loading || !search}
        aria-label="Buscar"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Search className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default SearchInput;
