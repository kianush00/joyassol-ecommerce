import Link from "next/link";

interface Props {
  title: string;
  links: { title: string; href: string }[];
}

const FooterLinkColumn = ({ title, links }: Props) => {
  return (
    <div>
      <h3 className="font-semibold text-darkColor mb-4">{title}</h3>
      <div className="flex flex-col gap-3">
        {links.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="text-gray-600 hover:text-darkColor text-sm font-medium hoverEffect"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinkColumn;
