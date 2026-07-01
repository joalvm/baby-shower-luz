"use client";

import { useInvitation } from "@/hooks/useInvitation";

export function FamilySection() {
  const { fatherName, motherName, sisterName } = useInvitation();

  return (
    <section className="segment segment-family" data-section id="familia">
      <div className="segment-inner family-inner">
        <div className="family-copy" data-drift="0.6">
          <p className="script-kicker" data-reveal>
            Con amor
          </p>
          <h2 data-reveal>La esperan con el corazón lleno</h2>
          <p className="body-copy" data-reveal>
            Sus papás y su hermana mayor quieren celebrar esta dulce espera con
            quienes acompañan su historia.
          </p>
        </div>

        <dl className="family-roles" data-reveal data-drift="1.1">
          <div>
            <dt>Mamá</dt>
            <dd>{motherName}</dd>
          </div>
          <div>
            <dt>Papá</dt>
            <dd>{fatherName}</dd>
          </div>
          <div>
            <dt>Hermana</dt>
            <dd>{sisterName}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}