"use client";

import { useContext } from "react";
import { AmbientAudioContext } from "@/features/invitation/providers/AmbientAudioProvider";

export function useAmbientAudio() {
  const audio = useContext(AmbientAudioContext);

  if (audio === null) {
    throw new Error("useAmbientAudio debe usarse dentro de AmbientAudioProvider.");
  }

  return audio;
}
