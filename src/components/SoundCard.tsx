"use client";

import { SoundConfig } from "@/data/sounds";

interface SoundCardProps {
  sound: SoundConfig;
  isActive: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

export default function SoundCard({
  sound,
  isActive,
  volume,
  onToggle,
  onVolumeChange,
}: SoundCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 select-none
        ${
          isActive
            ? "ring-2 ring-white/20 shadow-lg scale-[1.02]"
            : "hover:scale-[1.02] hover:shadow-md"
        }`}
      style={{
        backgroundColor: isActive ? sound.color : "#1e1e2e",
        boxShadow: isActive ? `0 0 30px ${sound.color}40` : undefined,
      }}
      onClick={onToggle}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="text-4xl" role="img" aria-label={sound.name}>
          {sound.icon}
        </span>
        <span
          className={`text-sm font-medium tracking-wide ${
            isActive ? "text-white" : "text-gray-400"
          }`}
        >
          {sound.name}
        </span>
      </div>

      {isActive && (
        <div
          className="mt-4 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-white
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/30"
          />
        </div>
      )}
    </div>
  );
}
