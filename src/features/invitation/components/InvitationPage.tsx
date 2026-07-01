import Image from "next/image";
import type { ReactNode } from "react";
import { withBasePath } from "@/utils/assets/withBasePath";

type WashName =
  | "hero"
  | "opening"
  | "name"
  | "parents"
  | "details"
  | "rsvp"
  | "final"
  | "goodbye";

type InvitationPageProps = {
  id?: string;
  wash: WashName;
  /** vertical placement of the content within the card */
  align?: "top" | "center";
  /** extra class on the section for per-page tuning */
  tone?: string;
  /** floating sprites / decorative layer, rendered above the wash, below content */
  decor?: ReactNode;
  /** eager-load the wash (hero only) */
  priority?: boolean;
  children: ReactNode;
};

export function InvitationPage({
  id,
  wash,
  align = "top",
  tone,
  decor,
  priority = false,
  children,
}: InvitationPageProps) {
  return (
    <section
      className={`invite-page${tone ? ` ${tone}` : ""}`}
      data-section
      id={id}
    >
      <article className="invite-card">
        <div className="invite-wash" data-drift="0.35">
          <Image
            src={withBasePath(`/assets/optimized/story/${wash}-wash.webp`)}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 480px) 92vw, 27rem"
            className="invite-wash-img"
          />
        </div>
        <div className={`invite-scrim invite-scrim-${align}`} aria-hidden="true" />
        {decor ? <div className="invite-decor">{decor}</div> : null}
        <div className={`invite-content invite-content-${align}`}>{children}</div>
      </article>
    </section>
  );
}
