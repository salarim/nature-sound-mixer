# Nature Sound - Ambient Sound Mixer

A web app that lets you mix ambient sounds to create your perfect environment for focus, relaxation, or sleep. Built with Next.js, React, and the Web Audio API.

## Features

- **10 ambient sounds** — Rain, Thunder, Wind, Birds, Ocean, Fire, Stream, Night Crickets, Coffee Shop, Leaves
- **Individual volume control** — Adjust each sound independently
- **Master volume** — Control overall mix level
- **Gapless looping** — Seamless audio loops via Web Audio API
- **Pause / Stop all** — Global playback controls
- **Click-free transitions** — Fade in/out ramps prevent audio pops
- **Dark theme** — Color-coded sound cards with glow effects
- **Responsive** — 2-5 column grid adapts to screen size

## Tech Stack

- **Next.js 14** (App Router)
- **React** with custom hooks
- **Tailwind CSS**
- **Web Audio API** for mixing and looping

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles + range slider styling
├── components/
│   ├── SoundBoard.tsx      # Grid of sound cards
│   ├── SoundCard.tsx       # Individual sound toggle + volume
│   └── MasterControls.tsx  # Play/pause, stop all, master volume
├── hooks/
│   └── useAudioEngine.ts   # Web Audio API hook for mixing
└── data/
    └── sounds.ts           # Sound metadata (name, icon, file, color)
```

## Audio Sources

All sounds are sourced from [Mixkit](https://mixkit.co/free-sound-effects/) under the Mixkit License (free for commercial and personal use).

## License

MIT
