"use client";

import { useInvitation } from "@/hooks/useInvitation";

export function FarewellSection() {
  const { babyName, fatherName, motherName } = useInvitation();

  return (
    <section className="segment segment-farewell" data-section id="despedida">
      <div className="segment-inner farewell-inner">
        <p className="script-kicker" data-reveal>
          Te esperamos
        </p>
        <h2 data-reveal>Gracias por acompañar esta espera</h2>
        <p className="body-copy" data-reveal>
          Con mucho amor, {motherName}, {fatherName} y {babyName}.
        </p>
      </div>
    </section>
  );
}