import HeaderMenu from "./HeaderMenu";
import Logo from "../Logo";
import Container from "../Container";
import MobileMenu from "../MobileMenu";
import SearchBar from "../Search/SearchBar";
import CartIcon from "../Cart/CartIcon";
import { auth } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { getAllCategories, getMyOrders } from "@/sanity/helpers/queries";
import OrdersIcon from "../Order/OrdersIcon";
import { logoName } from "@/app/constants";
import SignInLink from "./SignInLink";

const Header = async () => {
  const { userId } = await auth();
  // Load orders only if the user is signed in
  const orders = userId ? await getMyOrders(userId) : null;

  // Fetch categories
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
          <SearchBar aria-label="Open product search" />
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <OrdersIcon orders={orders} />
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInLink />
            </SignedOut>
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
