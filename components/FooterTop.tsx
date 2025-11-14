import { MapPin, Phone } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: Props[] = [
  {
    title: "Visitanos",
    subtitle: "Temuco, Chile",
    icon: (
      <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Llamanos",
    subtitle: "+56 9 8733 4343",
    icon: (
      <Phone className="text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Horas de trabajo",
    subtitle: "Lun - Dom: 10:00 - 19:00",
    icon: (
      <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
  {
    title: "Mandanos Email",
    subtitle: "esoliso74@gmail.com",
    icon: (
      <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {data?.map((item) => (
        <ContactItem
          key={item?.title}
          icon={item?.icon}
          title={item?.title}
          subtitle={item?.subtitle}
        />
      ))}
    </div>
  );
};

const ContactItem = ({ icon, title, subtitle }: Props) => {
  return (
    <div className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors">
      {icon}
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-darkColor transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 transition-colors">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default FooterTop;
