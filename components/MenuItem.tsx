"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  title: string;
  hasUnderlineEffect?: boolean; // Determines whether <span> tags should be rendered for the underline effect (main header only)
  backgroundIsLightColor?: boolean;
  className?: string;
  onClick?: () => void;
}

const MenuItem = ({
  href,
  title,
  hasUnderlineEffect = false,
  className,
  backgroundIsLightColor = true,
  onClick,
}: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const baseTextColor = backgroundIsLightColor ? "lightColor" : "white/70";
  const activeTextColor = backgroundIsLightColor ? "darkColor" : "white";
  // Base class that includes hover handling and active state
  const baseClasses = cn(
    `text-${baseTextColor} hover:text-${activeTextColor} hoverEffect relative group ${
      isActive && `text-${activeTextColor}`
    }`,
    className
  );

  // Classes for the underline effect
  const underlineClasses = `absolute -bottom-0.5 w-0 h-0.5 bg-${activeTextColor} hoverEffect group-hover:w-1/2 ${
    isActive && "w-1/2"
  }`;

  return (
    <Link href={href} className={baseClasses} onClick={onClick}>
      {title}
      {hasUnderlineEffect && (
        <>
          {/* Left underline */}
          <span className={`${underlineClasses} left-1/2 group-hover:left-0`} />
          {/* Right underline */}
          <span
            className={`${underlineClasses} right-1/2 group-hover:right-0`}
          />
        </>
      )}
    </Link>
  );
};

export default MenuItem;
