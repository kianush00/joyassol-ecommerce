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
          Your search text is too long. Please submit a shorter query.
        </p>
      )}
      {/* No results for a valid search */}
      {!isTooLong && search && (
        <p>
          Nothing matches with the keyword{" "}
          <span className="underline text-red-600">{search}</span>. Please try
          something else.
        </p>
      )}
      {/* Initial empty state */}
      {!search && (
        <p className="text-green-600 flex items-center justify-center gap-1">
          <Search className="w-5 h-5" />
          Search and explore your products from {logoName}.
        </p>
      )}
    </div>
  );
};

export default SearchEmptyState;
