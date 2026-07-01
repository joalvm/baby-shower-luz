"use client";

import Image from "next/image";
import { InvitationPage } from "@/features/invitation/components/InvitationPage";
import { useInvitation } from "@/features/invitation/hooks/useInvitation";
import { withBasePath } from "@/utils/assets/withBasePath";

export function FamilySection() {
  const { fatherName, motherName, sisterName } = useInvitation();

  // Para añadir las fotos reales: coloca los archivos en public/assets/photos/
  // y escribe la ruta en `src` (ej: "/assets/photos/mama.jpg").
  // Si `src` queda vacío se muestra la inicial del nombre como respaldo.
  const photos = [
    { role: "Mamá", name: motherName, src: "/assets/photos/mama.jpeg" },
    { role: "Papá", name: fatherName, src: "/assets/photos/papa.jpeg" },
    { role: "Hermana", name: sisterName, src: "/assets/photos/hermana.jpeg" },
  ];

  return (
    <InvitationPage id="familia" wash="name" align="center" tone="page-family">
      <p className="page-eyebrow" data-reveal>
        CON TODO EL AMOR E ILUSIÓN
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
                <Image
                  src={withBasePath(person.src)}
                  alt={`${person.role}: ${person.name}`}
                  fill
                  sizes="6rem"
                />
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
