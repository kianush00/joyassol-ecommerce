"use client";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

const SearchInput = ({ search, setSearch }: Props) => {
  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <Input
        placeholder="Busca tu producto aquí..."
        className="flex-1 rounded-md py-5"
        value={search}
        onChange={(e) => setSearch(e.target.value.trimStart())}
      />

      {/* Clear button */}
      {search && (
        <X
          className="w-4 h-4 absolute top-3 right-12 hover:text-red-600 hoverEffect"
          onClick={() => setSearch("")}
        />
      )}

      {/* Submit button */}
      <button
        type="button"
        className={`absolute w-10 h-full top-0 right-0 flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-darkColor hover:text-white hoverEffect ${
          search ? "bg-darkColor text-white" : "bg-darkColor/10"
        }`}
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchInput;
