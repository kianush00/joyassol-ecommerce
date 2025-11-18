"use client";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import SearchInput from "./SearchInput";
import SearchEmptyState from "./SearchEmptyState";
import SearchResultItem from "./SearchResultItem";
import SearchLoadingState from "./SearchLoadingState";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Fetch products from Sanity based on search input
  const fetchProducts = useCallback(async () => {
    if (!search.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `*${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Product fetching Error", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Debounce input changes to reduce API calls
  useEffect(() => {
    setLoading(true);
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300); // Delay of 300ms
    return () => clearTimeout(debounceTimer); // Cleanup the timer
  }, [search, fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      {/* Trigger Button */}
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="min-w-3xl max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Searchbar</DialogTitle>

          {/* SEARCH INPUT */}
          <SearchInput
            search={search}
            setSearch={setSearch}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
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
