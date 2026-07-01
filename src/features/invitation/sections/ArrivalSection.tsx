import Image from "next/image";
import { InvitationPage } from "@/features/invitation/components/InvitationPage";
import { Icon } from "@/shared/ui/Icon";
import { withBasePath } from "@/utils/assets/withBasePath";

export function ArrivalSection() {
  // Para añadir la ecografía real: coloca el archivo en public/assets/photos/
  // y escribe la ruta aquí (ej: "/assets/photos/ecografia.jpg").
  // Si queda vacío se muestra un marco decorativo de respaldo.
  const ultrasoundSrc = "";

  return (
    <InvitationPage id="llegada" wash="parents" align="center" tone="page-arrival">
      <p className="page-eyebrow" data-reveal>
        <Icon name="sparkle" /> Un adelanto
      </p>
      <h2 className="page-heading" data-reveal>
        ¡Abran paso, que estoy llegando!
      </h2>
      <figure className="ultrasound" data-reveal>
        <div className="ultrasound-frame">
          {ultrasoundSrc ? (
            <Image
              src={withBasePath(ultrasoundSrc)}
              alt="Ecografía de la bebé"
              fill
              sizes="11rem"
            />
          ) : (
            <Icon name="heart" aria-hidden="true" />
          )}
        </div>
        <figcaption>Nuestra primera fotito</figcaption>
      </figure>
    </InvitationPage>
  );
}
