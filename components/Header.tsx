import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { getAllCategories, getMyOrders } from "@/sanity/helpers/queries";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import OrdersIcon from "./OrdersIcon";
import { logoName } from "../app/constants/index";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders: MY_ORDERS_QUERYResult | null = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }
  const categories = await getAllCategories();

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-5">
      <Container className="flex items-center justify-between gap-7 text-lightColor">
        <HeaderMenu categories={categories} />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu categories={categories} />
          <Logo>{logoName}</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <OrdersIcon orders={orders} />
              <UserButton />
            </SignedIn>
            {!user && (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
