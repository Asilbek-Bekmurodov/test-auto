import { images } from "../../assets/images";
import type { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  name: keyof typeof images;
  fallback?: string;
}

export default function Image({ name, fallback, ...rest }: Props) {
  const src = images[name] || fallback;

  return <img src={src} {...rest} />;
}
