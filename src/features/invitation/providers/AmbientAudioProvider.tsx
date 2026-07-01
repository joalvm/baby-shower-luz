"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { withBasePath } from "@/utils/assets/withBasePath";

/** Bed volume for the forest ambience — barely perceptible under the music. */
const FOREST_VOLUME = 0.05;
/** Predominant volume for the music soundtrack. */
const MUSIC_VOLUME = 0.3;

type AmbientAudioValue = {
  started: boolean;
  muted: boolean;
  /** Layer the music on top of the forest. Call from a user gesture (seal tap). */
  start: () => void;
  toggleMute: () => void;
};

export const AmbientAudioContext = createContext<AmbientAudioValue | null>(null);

export function AmbientAudioProvider({ children }: { children: ReactNode }) {
  const forestRef = useRef<HTMLAudioElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const forestStartedRef = useRef(false);
  const musicStartedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  // Forest is the constant ambience. Try to begin it as early as the browser
  // allows; the volume only swells in once playback is actually accepted.
  const startForest = useCallback(() => {
    const forest = forestRef.current;
    if (!forest || forestStartedRef.current) return;

    const swellIn = () => {
      if (forestStartedRef.current) return;
      forestStartedRef.current = true;
      gsap.to(forest, { volume: FOREST_VOLUME, duration: 2.4, ease: "sine.out" });
    };

    forest.volume = 0;
    const played = forest.play();
    if (played && typeof played.then === "function") {
      // Ignore autoplay rejections — a later gesture retries this.
      played.then(swellIn, () => {});
    } else {
      swellIn();
    }
  }, []);

  // Music layers on top when the invitation is opened (the seal tap gesture,
  // which also guarantees the forest is unlocked if autoplay was blocked).
  const start = useCallback(() => {
    startForest();
    const music = musicRef.current;
    if (!music || musicStartedRef.current) return;

    musicStartedRef.current = true;
    setStarted(true);
    music.volume = 0;
    void music.play().catch(() => {});
    gsap.to(music, { volume: MUSIC_VOLUME, duration: 3.6, ease: "sine.out" });
  }, [startForest]);

  // Attempt forest autoplay on mount; if the browser blocks it (no gesture
  // yet), start it on the first interaction anywhere so it's "always" present.
  useEffect(() => {
    startForest();

    const kick = () => startForest();
    const opts = { capture: true, passive: true } as const;
    window.addEventListener("pointerdown", kick, opts);
    window.addEventListener("touchstart", kick, opts);
    window.addEventListener("keydown", kick, opts);
    return () => {
      window.removeEventListener("pointerdown", kick, opts);
      window.removeEventListener("touchstart", kick, opts);
      window.removeEventListener("keydown", kick, opts);
    };
  }, [startForest]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (forestRef.current) forestRef.current.muted = next;
      if (musicRef.current) musicRef.current.muted = next;
      return next;
    });
  }, []);

  return (
    <AmbientAudioContext.Provider value={{ started, muted, start, toggleMute }}>
      {children}
      <audio ref={forestRef} loop preload="auto" aria-hidden="true">
        <source src={withBasePath("/assets/sounds/forest.opus")} type="audio/ogg; codecs=opus" />
        <source src={withBasePath("/assets/sounds/forest.m4a")} type="audio/mp4" />
      </audio>
      <audio ref={musicRef} loop preload="auto" aria-hidden="true">
        <source src={withBasePath("/assets/sounds/music.opus")} type="audio/ogg; codecs=opus" />
        <source src={withBasePath("/assets/sounds/music.m4a")} type="audio/mp4" />
      </audio>
    </AmbientAudioContext.Provider>
  );
}
