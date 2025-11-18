"use client";
import { logoName } from "@/app/constants";
import { Search } from "lucide-react";

interface Props {
  search: string;
}

const SearchEmptyState = ({ search }: Props) => {
  return (
    <div className="text-center py-10 font-semibold tracking-wide">
      {search ? (
        <p>
          Nothing matches with the keyword{" "}
          <span className="underline text-red-600">{search}</span>. Please try
          something else.
        </p>
      ) : (
        <p className="text-green-600 flex items-center justify-center gap-1">
          <Search className="w-5 h-5" />
          Search and explore your products from {logoName}.
        </p>
      )}
    </div>
  );
};

export default SearchEmptyState;
