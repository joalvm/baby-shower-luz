import Image from "next/image";
import type { CSSProperties } from "react";
import { Countdown } from "./countdown";

const ASSETS = {
  washes: {
    opening: "/assets/optimized/story/opening-wash.webp",
    hero: "/assets/optimized/story/hero-wash.webp",
    parents: "/assets/optimized/story/parents-wash.webp",
    details: "/assets/optimized/story/details-wash.webp",
    rsvp: "/assets/optimized/story/rsvp-wash.webp",
    final: "/assets/optimized/story/final-wash.webp",
  },
  sprites: {
    envelope: "/assets/optimized/sprites/envelope.webp",
    shrub: "/assets/optimized/sprites/shrub.webp",
    grass: "/assets/optimized/sprites/grass.webp",
    butterfly: "/assets/optimized/sprites/butterfly.webp",
    fairy: "/assets/optimized/sprites/fairy.webp",
    cottage: "/assets/optimized/sprites/cottage.webp",
    flowerClosed: "/assets/optimized/sprites/flower-closed.webp",
    flowerOpen: "/assets/optimized/sprites/flower-open.webp",
    babySleeping: "/assets/optimized/sprites/baby-sleeping.webp",
    bigSister: "/assets/optimized/sprites/big-sister.webp",
  },
};

const eventDate = process.env.EVENT_DATE ?? "2026-07-18";
const eventDateTime = `${eventDate}T16:00:00-05:00`;
const babyName = process.env.BABY_NAME ?? "Amber Eileen";
const motherName = process.env.MOTHER_NAME ?? "Aurora";
const fatherName = process.env.FATHER_NAME ?? "Luis";
const address =
  process.env.ADDRESS ?? "Villa Hermosa MZ. M LT. 09 - Calle las Begonias";
const coordinates = process.env.ADDRESS_COORDINATES ?? "-5.173020,-80.690175";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  coordinates,
)}`;
const rsvpMessage = encodeURIComponent(
  `Confirmo mi asistencia al Baby Shower de ${babyName}.`,
);

function formatEventDate(date: string) {
  const parsed = new Date(`${date}T12:00:00-05:00`);
  const formatted = new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(parsed);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function FloatingButterflies({ variant = "soft" }: { variant?: "soft" | "wide" }) {
  const butterflies = variant === "wide" ? ["a", "b", "c", "d"] : ["a", "b", "c"];

  return (
    <div className={`butterflies butterflies-${variant}`} aria-hidden="true">
      {butterflies.map((item, index) => (
        <span className={`butterfly-path butterfly-${item}`} key={item}>
          <Image
            src={ASSETS.sprites.butterfly}
            alt=""
            width={130}
            height={110}
            className="butterfly-wing"
            priority={index === 0}
          />
        </span>
      ))}
    </div>
  );
}

function FallingLeaves() {
  return (
    <div className="falling-leaves" aria-hidden="true">
      {Array.from({ length: 16 }, (_, index) => (
        <span key={index} style={{ "--leaf-index": index } as CSSProperties} />
      ))}
    </div>
  );
}

function GroundLayers({ dense = false }: { dense?: boolean }) {
  return (
    <div className={`ground-layers ${dense ? "ground-layers-dense" : ""}`} aria-hidden="true">
      <Image
        src={ASSETS.sprites.grass}
        alt=""
        width={520}
        height={250}
        className="grass grass-left"
      />
      <Image
        src={ASSETS.sprites.grass}
        alt=""
        width={520}
        height={250}
        className="grass grass-right"
      />
      <Image
        src={ASSETS.sprites.shrub}
        alt=""
        width={520}
        height={420}
        className="shrub shrub-left"
      />
      <Image
        src={ASSETS.sprites.shrub}
        alt=""
        width={520}
        height={420}
        className="shrub shrub-right"
      />
    </div>
  );
}

function PhotoCard({
  name,
  role,
  initial,
  tilt,
}: {
  name: string;
  role: string;
  initial: string;
  tilt: "left" | "right";
}) {
  return (
    <figure className={`photo-card photo-card-${tilt}`}>
      <div className="photo-card-image">
        <span>{initial}</span>
      </div>
      <figcaption>
        <span>{role}</span>
        <strong>{name}</strong>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const eventDateLabel = formatEventDate(eventDate);

  return (
    <main className="story-shell">
      <div className="paper-grain" aria-hidden="true" />
      <FallingLeaves />
      <FloatingButterflies variant="wide" />

      <section className="chapter chapter-opening" id="abrir">
        <div className="wash-layer wash-opening" aria-hidden="true">
          <Image src={ASSETS.washes.opening} alt="" fill sizes="100vw" priority />
        </div>
        <div className="opening-copy">
          <p className="soft-kicker">Baby Shower</p>
          <h1>Una invitación pintada para {babyName}</h1>
          <a className="open-invitation" href="#inicio" aria-label="Abrir invitación">
            <Image
              src={ASSETS.sprites.envelope}
              alt=""
              width={420}
              height={320}
              className="envelope-sprite"
              priority
            />
            <span>Abrir invitación</span>
          </a>
        </div>
        <GroundLayers />
      </section>

      <section className="chapter chapter-hero" id="inicio">
        <div className="wash-layer wash-hero" aria-hidden="true">
          <Image src={ASSETS.washes.hero} alt="" fill sizes="100vw" priority />
        </div>
        <div className="hero-copy scroll-reveal">
          <p className="soft-kicker">Con mucho amor</p>
          <h2>Un pequeño milagro está por llegar</h2>
          <p>
            El bosque se prepara con flores, mariposas y hojas suaves para celebrar
            la dulce espera de nuestra niña.
          </p>
        </div>
        <Image
          src={ASSETS.sprites.cottage}
          alt=""
          width={480}
          height={430}
          className="cottage-sprite parallax-sprite"
          aria-hidden="true"
        />
        <Image
          src={ASSETS.sprites.fairy}
          alt=""
          width={180}
          height={220}
          className="fairy-sprite parallax-sprite"
          aria-hidden="true"
        />
        <GroundLayers dense />
      </section>

      <section className="flower-story" id="nombre">
        <div className="flower-stage">
          <div className="flower-sky" aria-hidden="true" />
          <FloatingButterflies />
          <div className="flower-copy">
            <p className="soft-kicker">La flor del bosque</p>
            <h2>{babyName}</h2>
            <p>
              Su hermana la espera con una flor entre las manos. Al abrirse el
              jardín, aparece el regalo más tierno.
            </p>
          </div>
          <div className="flower-scene" aria-label={`Revelación animada de ${babyName}`}>
            <Image
              src={ASSETS.sprites.bigSister}
              alt="Hermana mayor esperando frente a la flor"
              width={310}
              height={450}
              className="big-sister"
            />
            <div className="flower-wrap" aria-hidden="true">
              <Image
                src={ASSETS.sprites.flowerOpen}
                alt=""
                width={560}
                height={430}
                className="flower-open"
              />
              <Image
                src={ASSETS.sprites.babySleeping}
                alt=""
                width={360}
                height={240}
                className="baby-sleeping"
              />
              <Image
                src={ASSETS.sprites.flowerClosed}
                alt=""
                width={440}
                height={560}
                className="flower-closed"
              />
            </div>
          </div>
          <GroundLayers dense />
        </div>
      </section>

      <section className="chapter chapter-parents" id="familia">
        <div className="wash-layer wash-parents" aria-hidden="true">
          <Image src={ASSETS.washes.parents} alt="" fill sizes="100vw" />
        </div>
        <div className="parents-grid scroll-reveal">
          <div>
            <p className="soft-kicker">Sus papis</p>
            <h2>{motherName} y {fatherName}</h2>
            <p>
              Viven una etapa llena de amor y desean compartir este momento tan
              especial con las personas que más quieren.
            </p>
          </div>
          <div className="photo-stack" aria-label="Fotos de los padres">
            <PhotoCard name={motherName} role="Mamá" initial={motherName.charAt(0)} tilt="left" />
            <PhotoCard name={fatherName} role="Papá" initial={fatherName.charAt(0)} tilt="right" />
          </div>
        </div>
        <GroundLayers />
      </section>

      <section className="chapter chapter-countdown" id="cuenta">
        <div className="countdown-panel scroll-reveal">
          <p className="soft-kicker">¿Cuánto falta?</p>
          <h2>El día se acerca</h2>
          <Countdown targetDate={eventDateTime} />
        </div>
        <Image
          src={ASSETS.sprites.fairy}
          alt=""
          width={170}
          height={220}
          className="countdown-fairy"
          aria-hidden="true"
        />
        <GroundLayers dense />
      </section>

      <section className="chapter chapter-details" id="datos">
        <div className="wash-layer wash-details" aria-hidden="true">
          <Image src={ASSETS.washes.details} alt="" fill sizes="100vw" />
        </div>
        <div className="details-layout scroll-reveal">
          <div className="date-glyph">
            <span>{eventDateLabel.split(" ")[0]}</span>
            <strong>{eventDateLabel.match(/\d+/)?.[0] ?? "18"}</strong>
            <span>{eventDateLabel.split(" ").slice(-1)[0]}</span>
          </div>
          <div className="details-copy">
            <p className="soft-kicker">Datos del encuentro</p>
            <h2>{eventDateLabel}</h2>
            <p className="event-time">4:00 PM</p>
            <p>{address}</p>
            <a className="story-button" href={mapsUrl} target="_blank" rel="noreferrer">
              Ver ubicación
            </a>
          </div>
        </div>
        <Image
          src={ASSETS.sprites.cottage}
          alt=""
          width={430}
          height={390}
          className="details-cottage"
          aria-hidden="true"
        />
        <GroundLayers />
      </section>

      <section className="chapter chapter-rsvp" id="confirmar">
        <div className="wash-layer wash-rsvp" aria-hidden="true">
          <Image src={ASSETS.washes.rsvp} alt="" fill sizes="100vw" />
        </div>
        <div className="rsvp-card scroll-reveal">
          <p className="soft-kicker">Confirmación</p>
          <h2>Nos encantará saber que nos acompañas</h2>
          <p>
            Tu presencia es lo más importante. Si deseas obsequiar algo, la lluvia
            de sobres será recibida con todo el corazón.
          </p>
          <a
            className="story-button"
            href={`https://wa.me/?text=${rsvpMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            Confirmar asistencia
          </a>
        </div>
        <GroundLayers dense />
      </section>

      <section className="chapter chapter-final" id="final">
        <div className="wash-layer wash-final" aria-hidden="true">
          <Image src={ASSETS.washes.final} alt="" fill sizes="100vw" />
        </div>
        <div className="final-copy scroll-reveal">
          <p className="soft-kicker">Te esperamos</p>
          <h2>Con mucho amor</h2>
          <p>{motherName}, {fatherName} y {babyName}</p>
        </div>
        <Image
          src={ASSETS.sprites.bigSister}
          alt=""
          width={230}
          height={340}
          className="final-sister"
          aria-hidden="true"
        />
        <Image
          src={ASSETS.sprites.cottage}
          alt=""
          width={520}
          height={470}
          className="final-cottage"
          aria-hidden="true"
        />
        <GroundLayers dense />
      </section>
    </main>
  );
}
