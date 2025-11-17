"use client";
import { AlignLeft } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { CATEGORIES_QUERYResult } from "@/sanity.types";

interface Props {
  categories: CATEGORIES_QUERYResult;
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
