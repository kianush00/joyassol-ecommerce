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

const SearchBar = () => {
  const { search, setSearch, products, loading } = useProductSearch(300);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Dialog open={showSearch} onOpenChange={setShowSearch}>
      {/* Trigger Button */}
      <DialogTrigger
        aria-label="Open search dialog"
        onClick={() => setShowSearch(true)}
      >
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="min-w-3xl max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Searchbar</DialogTitle>

          {/* SEARCH INPUT */}
          <SearchInput search={search} setSearch={setSearch} />
        </DialogHeader>

        {/* SEARCH RESULTS */}
        <div className="w-full h-full overflow-y-scroll border border-darkColor/20 rounded-md">
          {/* Loading state */}
          {loading && <SearchLoadingState />}

          {/* Results */}
          {!loading && products.length > 0 && (
            <>
              {products.map((product: Product) => (
                <SearchResultItem
                  key={product._id}
                  product={product}
                  setShowSearch={setShowSearch}
                />
              ))}
            </>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <SearchEmptyState search={search} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
