import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeProducts from "@/components/Product/HomeProducts";

export default function Home() {
  return (
    <div>
      <Container className="py-10">
        <HomeBanner />
        <HomeProducts />
      </Container>
    </div>
  );
}
