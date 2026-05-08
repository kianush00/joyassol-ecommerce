"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import NoImagesFallback from "./NoImagesFallback";

export type SanityImage = {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: "image";
  _key: string;
};

interface Props {
  images: SanityImage[];
}

const ImageView = ({ images }: Props) => {
  const firstImage = images?.[0] ?? null;
  const [active, setActive] = useState<SanityImage | null>(firstImage);

  const mainUrl = useMemo(() => {
    if (!active) return "";
    return urlFor(active)
      .width(1200)
      .fit("max")
      .auto("format")
      .quality(85)
      .url();
  }, [active]);

  const thumbUrls = useMemo(
    () =>
      images?.map((img) =>
        urlFor(img).width(200).fit("crop").auto("format").quality(70).url(),
      ) ?? [],
    [images],
  );

  // Fallback if no images
  if (!images?.length) {
    return <NoImagesFallback />;
  }

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key ?? "default"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="w-full max-h-[550px] min-h-[450px] border rounded-md group overflow-hidden"
        >
          {mainUrl && (
            <Image
              src={mainUrl}
              width={700}
              height={700}
              alt={`Image ${active?._key ?? "product"}`}
              priority
              className="w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md"
            />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
        {images.map((image, index) => (
          <button
            key={image._key}
            onMouseEnter={() => setActive(image)}
            onClick={() => setActive(image)}
            className={`border rounded-md overflow-hidden ${
              active?._key === image._key ? "ring-1 ring-darkColor" : ""
            }`}
          >
            <Image
              src={thumbUrls[index]}
              alt={`Thumbnail ${image._key}`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
