import Image from "next/image";
import type { CSSProperties } from "react";

const DIMENSIONS: Record<string, { w: number; h: number }> = {
  butterfly: { w: 1254, h: 1254 },
  cottage: { w: 1254, h: 1254 },
  fairy: { w: 1254, h: 1254 },
  "baby-sleeping": { w: 1536, h: 1024 },
  "big-sister": { w: 1054, h: 1492 },
  "flower-closed": { w: 1065, h: 1477 },
  "flower-open": { w: 1085, h: 1449 },
  envelope: { w: 1399, h: 1124 },
  grass: { w: 1681, h: 936 },
  shrub: { w: 1402, h: 1122 },
};

type SpriteProps = {
  name: keyof typeof DIMENSIONS;
  /** CSS width, e.g. "22%" or "6rem" */
  width: string;
  /** absolute placement inside the positioned parent */
  style?: CSSProperties;
  className?: string;
  /** parallax depth for scroll drift (data-drift) */
  drift?: number;
  /** idle bob amplitude in px (data-float) */
  float?: number;
  opacity?: number;
};

export function Sprite({ name, width, style, className, drift, float, opacity }: SpriteProps) {
  const { w, h } = DIMENSIONS[name];

  return (
    <span
      className={`sprite${className ? ` ${className}` : ""}`}
      style={{ width, aspectRatio: `${w} / ${h}`, opacity, ...style }}
      data-drift={drift}
      data-float={float}
      aria-hidden="true"
    >
      <Image
        src={`/assets/optimized/sprites/${name}.webp`}
        alt=""
        fill
        sizes={width}
        className="sprite-img"
        draggable={false}
      />
    </span>
  );
}
