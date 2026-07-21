import Image from 'next/image';

/**
 * Fox Haven Group mark — the sitting fox from the 2026 brand sheet
 * (reversed/bone version; the site chrome is always on dark).
 * Source art: public/images/brand/fox-white.png (169x257).
 * `size` is the rendered height; width keeps the native aspect.
 */
export default function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <Image
      src="/images/brand/fox-white.png"
      width={Math.round((size * 169) / 257)}
      height={size}
      alt=""
      aria-hidden="true"
      priority
    />
  );
}
