import Container from "../Container";
import FooterTop from "./FooterTop";
import Logo from "../Logo";
import SocialMedia from "../SocialMedia";
import { Input } from "../ui/input";
import { categoriesData, quickLinksData } from "@/app/constants";
import Link from "next/link";
import { logoName } from "../../app/constants/index";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        {/* Top section with contact info */}
        <FooterTop />

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo>{logoName}</Logo>
            <p className="text-gray-600 text-sm">
              Descubre las mejores joyas caseras en Joyas Sol, con estilos
              únicos y precios accesibles. ¡Explora nuestra colección y
              encuentra las joyas perfectas para tu estilo!
            </p>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-darkColor hover:text-darkColor"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          <div>
            <h3 className="font-semibold text-darkColor mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {quickLinksData?.map((item) => (
                <Link
                  key={item?.title}
                  href={item?.href}
                  className="text-gray-600 hover:text-darkColor text-sm font-medium hoverEffect"
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-darkColor mb-4">Categorías</h3>
            <div className="flex flex-col gap-3">
              {categoriesData?.map((item) => (
                <Link
                  key={item?.title}
                  href={`/category${item?.href}`}
                  className="text-gray-600 hover:text-darkColor text-sm font-medium hoverEffect"
                >
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-darkColor mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Suscríbase a nuestro boletín para recibir actualizaciones y
              ofertas exclusivas.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button
                type="submit"
                className="w-full bg-darkColor text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Joyas Sol. Todos los derechos
            reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
