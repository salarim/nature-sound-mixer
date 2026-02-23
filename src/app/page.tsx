import SoundBoard from "@/components/SoundBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          Nature Sound
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Mix ambient sounds for focus, relaxation, or sleep
        </p>
      </header>

      <SoundBoard />
    </main>
  );
}
