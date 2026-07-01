"use client";

import { useAmbientAudio } from "@/features/invitation/hooks/useAmbientAudio";
import { Icon } from "@/shared/ui/Icon";

/** Small floating control to silence / restore the ambience after the intro. */
export function SoundToggle() {
  const { started, muted, toggleMute } = useAmbientAudio();

  if (!started) return null;

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggleMute}
      aria-pressed={muted}
      aria-label={muted ? "Activar sonido" : "Silenciar sonido"}
      title={muted ? "Activar sonido" : "Silenciar sonido"}
    >
      <Icon name={muted ? "sound-off" : "sound-on"} />
    </button>
  );
}
