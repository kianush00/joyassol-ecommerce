import React from "react";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Container from "./Container";

const Header = () => {
  return (
    <header className="border-b border-b-gray-200 py-5">
      <Container className="flex items-center justify-between gap-7 text-lightColor">
        <HeaderMenu />
        <Logo />
        <div>right</div>
      </Container>
    </header>
  );
};

export default Header;
