import Container from "../Container";
import FooterTop from "./FooterTop";
import Logo from "../Logo";
import SocialMedia from "../SocialMedia";
import { Input } from "../ui/input";
import { categoriesData, quickLinksData } from "@/app/constants";
import { logoName } from "../../app/constants/index";
import FooterLinkColumn from "./FooterLinkColumn";
import { CopyrightYear } from "./CopyrightYear";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        {/* Top section with contact info */}
        <FooterTop />

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
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

          {/* Quick links and categories */}
          <FooterLinkColumn title="Enlaces rápidos" links={quickLinksData} />
          <FooterLinkColumn title="Categorías" links={categoriesData} />

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-darkColor mb-4">Boletín</h3>
            <p className="text-gray-600 text-sm mb-4">
              Suscríbase a nuestro boletín para recibir actualizaciones y
              ofertas exclusivas.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Ingrese su correo electrónico"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button
                type="submit"
                className="w-full bg-darkColor text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <p>
            © <CopyrightYear /> Joyas Sol. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
