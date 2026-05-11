"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Product } from "@/sanity.types";
import SearchInput from "./SearchInput";
import SearchEmptyState from "./SearchEmptyState";
import SearchResultItem from "./SearchResultItem";
import SearchLoadingState from "./SearchLoadingState";
import { useProductSearch } from "@/hooks/useProductSearch";
import ResultsCounter from "./ResultsCounter";

const SearchBar = () => {
  const { search, setSearch, products, loading } = useProductSearch();
  const [showSearch, setShowSearch] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setShowSearch(open);
    if (!open) {
      setSearch("");
    }
  };

  return (
    <Dialog open={showSearch} onOpenChange={handleOpenChange}>
      {/* Trigger Button */}
      <DialogTrigger
        aria-label="Abrir búsqueda de productos"
        onClick={() => setShowSearch(true)}
      >
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Búsqueda de productos</DialogTitle>

          {/* SEARCH INPUT */}
          <SearchInput
            search={search}
            setSearch={setSearch}
            loading={loading}
            autoFocus={true}
          />
        </DialogHeader>

        {/* SEARCH RESULTS */}
        <div className="w-full h-full overflow-y-auto border border-darkColor/20 rounded-md">
          {/* Loading state */}
          {loading && <SearchLoadingState />}

          {/* Results */}
          {!loading && products.length > 0 && (
            <div>
              {/* Results counter */}
              <ResultsCounter products={products} />

              {/* Result Items */}
              {products.map((product: Product) => (
                <SearchResultItem
                  key={product._id}
                  product={product}
                  setShowSearch={setShowSearch}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <SearchEmptyState search={search} setShowSearch={setShowSearch} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
