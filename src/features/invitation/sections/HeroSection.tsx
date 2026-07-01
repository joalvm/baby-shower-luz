"use client";

import { Fragment } from "react";
import { InvitationPage } from "@/features/invitation/components/InvitationPage";
import { useInvitation } from "@/features/invitation/hooks/useInvitation";
import { Icon } from "@/shared/ui/Icon";

export function HeroSection() {
  const { babyName } = useInvitation();
  const words = babyName.split(" ");

  return (
    <InvitationPage id="inicio" wash="hero" align="center" tone="page-hero" priority>
      <p className="page-eyebrow" data-reveal>
        <Icon name="sparkle" /> My Baby Shower
      </p>
      <h1 className="page-title" data-hero-title aria-label={babyName}>
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 ? " " : null}
            <span className="hero-word">
              {word.split("").map((ch, ci) => (
                <span className="hero-letter" key={ci} aria-hidden="true">
                  {ch}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </h1>
      <p className="page-lead" data-reveal>
        Un rinconcito del bosque encantado para celebrar su dulce llegada.
      </p>
      <button
        type="button"
        className="scroll-cue"
        data-reveal
        data-scroll-to="#familia"
        aria-label="Ver la invitación"
      >
        <Icon name="chevron-down" />
      </button>
    </InvitationPage>
  );
}
