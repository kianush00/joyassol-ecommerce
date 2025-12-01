export const logoName = "Joyas Sol";
export const getProductUrl = (slug: string | undefined) => {
  return `/product/${slug}`;
};
export const searchTextIsTooLong = (searchLength: number) => searchLength > 60;

export const headerData = [
  { title: "Home", href: "/" },
  { title: "Men", href: "/men-s-fashion" },
  { title: "Woman", href: "/woman" },
  { title: "Kids", href: "/kids" },
  { title: "New", href: "/new" },
  { title: "Featured", href: "/featured" },
  { title: "Gift", href: "/gift" },
];

export const productType = [
  { title: "Tshirt" },
  { title: "Jacket" },
  { title: "Pants" },
  { title: "Hoodie" },
  { title: "Short" },
];

export const quickLinksData = [
  { title: "About us", href: "/about" },
  { title: "Contact us", href: "/contact" },
  { title: "Terms & Conditions", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "FAQs", href: "/faqs" },
];

export const categoriesData = [
  { title: "Men", href: "/category/men-s-fashion" },
  { title: "Woman", href: "/category/woman" },
  { title: "Kids", href: "/category/kids" },
  { title: "Others", href: "/category/others" },
];

export const faqsData = [
  {
    question: `What services does ${logoName} offer?`,
    answer: `{logoName} offers a wide range of technology solutions including custom software development, cloud services, and digital transformation consulting.`,
  },
  {
    question: `How can I get support for ${logoName} products?`,
    answer:
      "You can reach our support team through our contact page or by emailing esoliso74@gmail.com.",
  },
  {
    question: `Does ${logoName} offer training for its products?`,
    answer:
      "Yes, we offer comprehensive training programs for all our products and services. Please contact our sales team for more information.",
  },
  {
    question: `What industries does ${logoName} serve?`,
    answer: `${logoName} serves a wide range of industries including finance, healthcare, retail, and manufacturing.`,
  },
  {
    question: `How does ${logoName} ensure data security?`,
    answer:
      "We employ industry-standard security measures and comply with all relevant data protection regulations to ensure the security of our clients' data.",
  },
];
