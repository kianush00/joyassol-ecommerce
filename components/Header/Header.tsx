import HeaderMenu from "./HeaderMenu";
import Logo from "../Logo";
import Container from "../Container";
import MobileMenu from "../MobileMenu";
import SearchBar from "../Search/SearchBar";
import CartIcon from "../Cart/CartIcon";
import { getAllCategories } from "@/sanity/helpers/queries";
import { logoName } from "@/app/constants";
import HeaderAuth from "./HeaderAuth";

const Header = async () => {
  const categories = await getAllCategories(12);
  const headerCategories = categories?.slice(0, 3) || [];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-5">
      <Container className="flex items-center justify-between gap-7 text-lightColor">
        <HeaderMenu categories={headerCategories} />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu categories={categories} />
          <Logo>{logoName}</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <HeaderAuth />
        </div>
      </Container>
    </header>
  );
};

export default Header;
