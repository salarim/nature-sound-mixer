"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SoundNode {
  source: AudioBufferSourceNode;
  gain: GainNode;
  buffer: AudioBuffer;
}

export function useAudioEngine() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const soundNodesRef = useRef<Map<string, SoundNode>>(new Map());
  const buffersRef = useRef<Map<string, AudioBuffer>>(new Map());

  const [activeSounds, setActiveSounds] = useState<Set<string>>(new Set());
  const [volumes, setVolumes] = useState<Map<string, number>>(new Map());
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [isGloballyPaused, setIsGloballyPaused] = useState(false);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.gain.value = masterVolume;
      masterGainRef.current.connect(audioContextRef.current.destination);
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, [masterVolume]);

  const loadSound = useCallback(
    async (id: string, url: string): Promise<AudioBuffer> => {
      const cached = buffersRef.current.get(id);
      if (cached) return cached;

      const ctx = getAudioContext();
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      buffersRef.current.set(id, audioBuffer);
      return audioBuffer;
    },
    [getAudioContext]
  );

  const startSound = useCallback(
    (id: string, buffer: AudioBuffer) => {
      const ctx = getAudioContext();
      const masterGain = masterGainRef.current!;

      // Stop existing if any
      const existing = soundNodesRef.current.get(id);
      if (existing) {
        existing.source.stop();
        existing.gain.disconnect();
      }

      const gain = ctx.createGain();
      const currentVolume = volumes.get(id) ?? 0.7;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(currentVolume, ctx.currentTime + 0.1);
      gain.connect(masterGain);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      source.start(0);

      soundNodesRef.current.set(id, { source, gain, buffer });
    },
    [getAudioContext, volumes]
  );

  const toggleSound = useCallback(
    async (id: string, fileUrl: string) => {
      const ctx = getAudioContext();

      if (activeSounds.has(id)) {
        // Fade out and stop
        const node = soundNodesRef.current.get(id);
        if (node) {
          node.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
          setTimeout(() => {
            node.source.stop();
            node.gain.disconnect();
            soundNodesRef.current.delete(id);
          }, 150);
        }
        setActiveSounds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } else {
        const buffer = await loadSound(id, fileUrl);
        startSound(id, buffer);
        setActiveSounds((prev) => new Set(prev).add(id));
        if (!volumes.has(id)) {
          setVolumes((prev) => new Map(prev).set(id, 0.7));
        }
      }
    },
    [activeSounds, getAudioContext, loadSound, startSound, volumes]
  );

  const setSoundVolume = useCallback(
    (id: string, volume: number) => {
      setVolumes((prev) => new Map(prev).set(id, volume));
      const node = soundNodesRef.current.get(id);
      if (node && audioContextRef.current) {
        node.gain.gain.linearRampToValueAtTime(
          volume,
          audioContextRef.current.currentTime + 0.05
        );
      }
    },
    []
  );

  const setMasterVolumeLevel = useCallback((volume: number) => {
    setMasterVolume(volume);
    if (masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(
        volume,
        audioContextRef.current.currentTime + 0.05
      );
    }
  }, []);

  const stopAll = useCallback(() => {
    const ctx = audioContextRef.current;
    soundNodesRef.current.forEach((node) => {
      if (ctx) {
        node.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      }
      setTimeout(() => {
        node.source.stop();
        node.gain.disconnect();
      }, 150);
    });
    soundNodesRef.current.clear();
    setActiveSounds(new Set());
    setIsGloballyPaused(false);
  }, []);

  const togglePauseAll = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (isGloballyPaused) {
      ctx.resume();
      setIsGloballyPaused(false);
    } else {
      ctx.suspend();
      setIsGloballyPaused(true);
    }
  }, [isGloballyPaused]);

  // Cleanup on unmount
  useEffect(() => {
    const nodes = soundNodesRef.current;
    return () => {
      nodes.forEach((node) => {
        try {
          node.source.stop();
          node.gain.disconnect();
        } catch {
          // ignore
        }
      });
      audioContextRef.current?.close();
    };
  }, []);

  return {
    activeSounds,
    volumes,
    masterVolume,
    isGloballyPaused,
    toggleSound,
    setSoundVolume,
    setMasterVolumeLevel,
    stopAll,
    togglePauseAll,
  };
}
