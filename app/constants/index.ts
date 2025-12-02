export const logoName = "Joyas Sol";
export const getProductUrl = (slug: string | undefined) => {
  return `/product/${slug}`;
};
export const getCategoryUrl = (slug: string | undefined) => {
  return `/category/${slug}`;
};
export const searchTextIsTooLong = (searchLength: number) => searchLength > 60;

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
  { title: "Men", href: getCategoryUrl("men-s-fashion") },
  { title: "Woman", href: getCategoryUrl("woman") },
  { title: "Kids", href: getCategoryUrl("kids") },
  { title: "Others", href: getCategoryUrl("others") },
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
