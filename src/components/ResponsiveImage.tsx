import { getImageProps, type ImageProps } from "next/image";
import type { ImageAsset } from "@/types";

type ResponsiveImageProps = Omit<ImageProps, "src" | "alt"> & {
  image: ImageAsset;
};

export function ResponsiveImage({ image, ...props }: ResponsiveImageProps) {
  const desktop = getImageProps({
    ...props,
    src: image.src,
    alt: image.alt,
  }).props;

  if (!image.mobileSrc?.trim()) {
    return <img {...desktop} alt={image.alt} />;
  }

  const mobile = getImageProps({
    ...props,
    src: image.mobileSrc,
    alt: image.alt,
  }).props;

  return (
    <picture>
      <source media="(max-width: 639px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
      <img {...desktop} alt={image.alt} />
    </picture>
  );
}
