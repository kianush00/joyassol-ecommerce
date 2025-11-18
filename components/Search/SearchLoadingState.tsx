import { Loader2 } from "lucide-react";
import React from "react";

const SearchLoadingState = () => {
  return (
    <p className="flex items-center px-6 py-10 gap-1 text-center text-yellow-600 font-semibold">
      <Loader2 className="w-5 h-5 animate-spin" />
      Searching on progress...
    </p>
  );
};

export default SearchLoadingState;
