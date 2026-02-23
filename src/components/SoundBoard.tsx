"use client";

import { sounds } from "@/data/sounds";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import MasterControls from "./MasterControls";
import SoundCard from "./SoundCard";

export default function SoundBoard() {
  const {
    activeSounds,
    volumes,
    masterVolume,
    isGloballyPaused,
    toggleSound,
    setSoundVolume,
    setMasterVolumeLevel,
    stopAll,
    togglePauseAll,
  } = useAudioEngine();

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sounds.map((sound) => (
          <SoundCard
            key={sound.id}
            sound={sound}
            isActive={activeSounds.has(sound.id)}
            volume={volumes.get(sound.id) ?? 0.7}
            onToggle={() => toggleSound(sound.id, sound.file)}
            onVolumeChange={(v) => setSoundVolume(sound.id, v)}
          />
        ))}
      </div>

      <MasterControls
        masterVolume={masterVolume}
        isGloballyPaused={isGloballyPaused}
        hasActiveSounds={activeSounds.size > 0}
        onMasterVolumeChange={setMasterVolumeLevel}
        onTogglePause={togglePauseAll}
        onStopAll={stopAll}
      />
    </div>
  );
}
