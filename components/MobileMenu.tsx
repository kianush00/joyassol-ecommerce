"use client";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { CATEGORIES_QUERY_RESULT } from "@/sanity.types";

interface Props {
  categories: CATEGORIES_QUERY_RESULT;
}

const MobileMenu = ({ categories }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <button onClick={toggleSidebar}>
        <AlignLeft className="w-6 h-6 hover:text-darkColor hoverEffect md:hidden" />
      </button>
      <div className="md-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={categories}
        />
      </div>
    </>
  );
};

export default MobileMenu;
