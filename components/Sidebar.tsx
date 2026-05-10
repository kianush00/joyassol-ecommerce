import { motion } from "motion/react";
import Logo from "./Logo";
import { X } from "lucide-react";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { getCategoryUrl, logoName } from "../app/constants/index";
import { CATEGORIES_QUERY_RESULT } from "@/sanity.types";
import MenuItem from "./MenuItem";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: CATEGORIES_QUERY_RESULT;
}

const Sidebar = ({ isOpen, onClose, categories }: Props) => {
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-darkColor/50 shadow-xl hoverEffect cursor-auto w-full ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-darkColor text-white/70 h-full p-10 border-r border-r-white flex flex-col gap-6"
      >
        {/* Header Content and X Button */}
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <Logo className="text-white">{logoName}</Logo>
          </button>
          <button className="hover:text-red-500 hoverEffect" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide">
          <MenuItem
            href={"/"}
            title={"Home"}
            onClick={onClose}
            className="w-40"
            backgroundIsLightColor={false}
          />
          {categories?.map((item) => (
            <MenuItem
              key={item?.title}
              href={getCategoryUrl(item?.slug?.current)}
              title={item?.title || "Category"}
              onClick={onClose}
              className="w-40"
              backgroundIsLightColor={false}
            />
          ))}
        </div>
        <SocialMedia />
      </motion.div>
    </div>
  );
};

export default Sidebar;
