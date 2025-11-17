import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import {
  CATEGORIES_QUERYResult,
  MY_ORDERS_QUERYResult,
  PRODUCT_BY_SLUG_QUERYResult,
  PRODUCT_SEARCH_QUERYResult,
  PRODUCTS_BY_CATEGORY_QUERYResult,
  PRODUCTS_QUERYResult,
  SALE_QUERYResult,
} from "@/sanity.types";

export const getAllProducts = async (): Promise<PRODUCTS_QUERYResult> => {
  const PRODUCTS_QUERY = defineQuery(`*[_type=="product"] | order(name asc)`);
  try {
    const products = await sanityFetch({
      query: PRODUCTS_QUERY,
    });
    return products?.data || [];
  } catch (error) {
    console.log("Error fetching all products:", error);
    return [];
  }
};

export const getProductBySlug = async (
  slug: string
): Promise<PRODUCT_BY_SLUG_QUERYResult | undefined> => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
  );
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return product?.data || undefined;
  } catch (error) {
    console.error("Error fetching product by Slug:", error);
  }
};

export const getAllCategories = async (): Promise<CATEGORIES_QUERYResult> => {
  const CATEGORIES_QUERY = defineQuery(
    `*[_type == "category"] | order(name asc)`
  );
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories?.data || [];
  } catch (error) {
    console.error("Error fetching all categories", error);
    return [];
  }
};

export const searchProductsByName = async (
  searchParam: string
): Promise<PRODUCT_SEARCH_QUERYResult> => {
  const PRODUCT_SEARCH_QUERY = defineQuery(
    `*[_type == "product" && name match $searchParam] | order(name asc)`
  );

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}`,
      },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
};

export const getProductsByCategory = async (
  categorySlug: string
): Promise<PRODUCTS_BY_CATEGORY_QUERYResult> => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(
    `*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`
  );
  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const getSale = async (): Promise<SALE_QUERYResult> => {
  const SALE_QUERY = defineQuery(`*[_type == 'sale'] | order(name asc)`);
  try {
    const products = await sanityFetch({
      query: SALE_QUERY,
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by sale:", error);
    return [];
  }
};

export const getMyOrders = async (
  userId: string
): Promise<MY_ORDERS_QUERYResult> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const MY_ORDERS_QUERY =
    defineQuery(`*[_type == "order" && clerkUserId == $userId] | order(orderData desc){
    ...,products[]{
      ...,product->
    }
    }`);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
