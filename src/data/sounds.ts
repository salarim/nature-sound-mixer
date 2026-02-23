export interface SoundConfig {
  id: string;
  name: string;
  file: string;
  icon: string;
  color: string;
}

export const sounds: SoundConfig[] = [
  {
    id: "rain",
    name: "Rain",
    file: "/sounds/rain.mp3",
    icon: "🌧️",
    color: "#4A90D9",
  },
  {
    id: "thunder",
    name: "Thunder",
    file: "/sounds/thunder.mp3",
    icon: "⛈️",
    color: "#6B5B95",
  },
  {
    id: "wind",
    name: "Wind",
    file: "/sounds/wind.mp3",
    icon: "💨",
    color: "#88B04B",
  },
  {
    id: "birds",
    name: "Birds",
    file: "/sounds/birds.mp3",
    icon: "🐦",
    color: "#F7CAC9",
  },
  {
    id: "ocean",
    name: "Ocean",
    file: "/sounds/ocean.mp3",
    icon: "🌊",
    color: "#45B8AC",
  },
  {
    id: "fire",
    name: "Fire",
    file: "/sounds/fire.mp3",
    icon: "🔥",
    color: "#DD4124",
  },
  {
    id: "stream",
    name: "Stream",
    file: "/sounds/stream.mp3",
    icon: "🏞️",
    color: "#5B9BD5",
  },
  {
    id: "night",
    name: "Night",
    file: "/sounds/night.mp3",
    icon: "🦗",
    color: "#2E4057",
  },
  {
    id: "coffee",
    name: "Coffee Shop",
    file: "/sounds/coffee.mp3",
    icon: "☕",
    color: "#A0522D",
  },
  {
    id: "leaves",
    name: "Leaves",
    file: "/sounds/leaves.mp3",
    icon: "🍃",
    color: "#7CB342",
  },
];
