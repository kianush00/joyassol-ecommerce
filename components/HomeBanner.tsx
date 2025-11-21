import Title from "./Title";

const HomeBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Title className="text-3xl md:text-4xl uppercase font-bold text-center">
        Joyas Caseras Únicas
      </Title>
      <p className="text-sm text-center text-lightColor/80 font-medium max-w-[480px]">
        Descubre las mejores joyas caseras en Joyas Sol, con estilos únicos y
        precios accesibles. ¡Explora nuestra colección y encuentra las joyas
        perfectas para tu estilo!
      </p>
    </div>
  );
};

export default HomeBanner;
