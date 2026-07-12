import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

/** Explicit consent placeholder for the layered sound design; never autoplay. */
export function SoundControl() {
  const [enabled, setEnabled] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => setEnabled((value) => !value)}
      className="cinematic-sound-control"
    >
      {enabled ? (
        <Volume2 className="size-3.5" />
      ) : (
        <VolumeX className="size-3.5" />
      )}
      <span>Son {enabled ? 'activé' : 'désactivé'}</span>
    </button>
  );
}
