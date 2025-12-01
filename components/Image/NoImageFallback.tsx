"use client";

import { cn } from "@/lib/utils";

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const NoImageFallback = ({ width, height, className }: Props) => {
  const widthClass = width ? `w-[${width}px]` : "w-full";
  const heightClass = height ? `h-[${height}px]` : "h-full";

  return (
    <div
      className={cn(
        `${widthClass} ${heightClass} bg-gray-200 flex items-center justify-center text-center overflow-hidden`,
        className
      )}
    >
      <span className="text-gray-400 text-xs max-w-full wrap-break-word whitespace-normal">
        Sin imagen
      </span>
    </div>
  );
};

export default NoImageFallback;
