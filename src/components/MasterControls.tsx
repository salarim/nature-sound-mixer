"use client";

interface MasterControlsProps {
  masterVolume: number;
  isGloballyPaused: boolean;
  hasActiveSounds: boolean;
  onMasterVolumeChange: (volume: number) => void;
  onTogglePause: () => void;
  onStopAll: () => void;
}

export default function MasterControls({
  masterVolume,
  isGloballyPaused,
  hasActiveSounds,
  onMasterVolumeChange,
  onTogglePause,
  onStopAll,
}: MasterControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-6">
      {hasActiveSounds && (
        <>
          <button
            onClick={onTogglePause}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20
              text-white text-sm font-medium transition-all duration-200"
          >
            {isGloballyPaused ? (
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
            {isGloballyPaused ? "Resume" : "Pause"}
          </button>

          <button
            onClick={onStopAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-red-500/50
              text-white text-sm font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
            Stop All
          </button>

          <div className="flex items-center gap-3">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) =>
                onMasterVolumeChange(parseFloat(e.target.value))
              }
              className="w-28 h-1.5 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/30"
            />
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
