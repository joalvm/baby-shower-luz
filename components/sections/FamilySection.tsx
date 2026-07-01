"use client";

import Image from "next/image";
import { InvitationPage } from "@/components/InvitationPage";
import { useInvitation } from "@/hooks/useInvitation";

export function FamilySection() {
  const { fatherName, motherName, sisterName } = useInvitation();

  // Para añadir las fotos reales: coloca los archivos en public/assets/photos/
  // y escribe la ruta en `src` (ej: "/assets/photos/mama.jpg").
  // Si `src` queda vacío se muestra la inicial del nombre como respaldo.
  const photos = [
    { role: "Mamá", name: motherName, src: "" },
    { role: "Papá", name: fatherName, src: "" },
    { role: "Hermana", name: sisterName, src: "" },
  ];

  return (
    <InvitationPage id="familia" wash="name" align="center" tone="page-family">
      <p className="page-eyebrow" data-reveal>
        Con todo el amor
      </p>
      <dl className="family-roles" data-reveal>
        <div>
          <dt>Sus papás</dt>
          <dd>
            {motherName} &amp; {fatherName}
          </dd>
        </div>
        <div>
          <dt>Su hermana mayor</dt>
          <dd>{sisterName}</dd>
        </div>
      </dl>

      <div className="family-photos" data-reveal>
        {photos.map((person) => (
          <figure className="photo-card" data-sway key={person.role}>
            <span className="photo-pin" aria-hidden="true" />
            <div className="photo-frame">
              {person.src ? (
                <Image src={person.src} alt={`${person.role}: ${person.name}`} fill sizes="6rem" />
              ) : (
                <span aria-hidden="true">{person.name.charAt(0)}</span>
              )}
            </div>
            <figcaption>{person.role}</figcaption>
          </figure>
        ))}
      </div>
    </InvitationPage>
  );
}
