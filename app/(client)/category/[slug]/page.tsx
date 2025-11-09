import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { getAllCategories } from "@/sanity/helpers/queries";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  const categories = await getAllCategories();

  return (
    <Container className="py-10">
      <Title className="text-xl">
        Products by Category{" "}
        <span className="font-bold text-green-600 capitalize tracking-wide">
          {slug}
        </span>
      </Title>
      <CategoryProducts categories={categories} slug={slug} />
    </Container>
  );
};

export default CategoryPage;
