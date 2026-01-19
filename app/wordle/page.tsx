"use client"

import Link from "next/link"
import { useEffect } from "react"
import Wordle from "@/components/wordle"
import AdsenseAd from "@/components/adsense-ad"

export default function WordlePage() {
  useEffect(() => {
    document.title = "Play Wordle Online Free - Classic Word Puzzle Game"
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-4">
      <nav className="w-full max-w-4xl flex justify-center gap-2 flex-wrap">
        <Link href="/" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Minesweeper
        </Link>
        <Link href="/solitaire" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Solitaire
        </Link>
        <Link href="/sudoku" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Sudoku
        </Link>
        <Link href="/2048" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          2048
        </Link>
        <Link href="/hangman" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Hangman
        </Link>
        <Link href="/wordle" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Wordle
        </Link>
      </nav>

      <header className="text-center max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-3 text-balance">Play Wordle Online Free</h1>
        <p className="text-muted-foreground">Guess the 5-letter word in 6 tries - Green means correct, Yellow means wrong position!</p>
      </header>

      {/* Top Ad */}
      <div className="w-full max-w-3xl">
        <AdsenseAd adSlot="5750387915" adFormat="horizontal" />
      </div>

      {/* Game */}
      <Wordle />

      {/* How to Play */}
      <section className="max-w-2xl mt-6 px-4">
        <h2 className="text-xl font-bold mb-3">How to Play</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Guess the hidden 5-letter word in 6 attempts</li>
          <li><span className="inline-block w-4 h-4 bg-green-500 rounded-sm align-middle mr-1"></span> Green = Letter is correct and in the right position</li>
          <li><span className="inline-block w-4 h-4 bg-yellow-500 rounded-sm align-middle mr-1"></span> Yellow = Letter is in the word but wrong position</li>
          <li><span className="inline-block w-4 h-4 bg-zinc-500 rounded-sm align-middle mr-1"></span> Gray = Letter is not in the word</li>
          <li>Use the on-screen keyboard or type with your physical keyboard</li>
          <li>Press Enter to submit your guess, Backspace to delete</li>
        </ul>
      </section>

      {/* Bottom Ad */}
      <div className="w-full max-w-3xl mt-4">
        <AdsenseAd adSlot="5750387915" adFormat="horizontal" />
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Classic Games Online - Free Puzzle Games</p>
        <nav className="flex gap-4 justify-center mt-3 flex-wrap">
          <Link href="/" className="text-primary hover:underline">Minesweeper</Link>
          <Link href="/solitaire" className="text-primary hover:underline">Solitaire</Link>
          <Link href="/sudoku" className="text-primary hover:underline">Sudoku</Link>
          <Link href="/2048" className="text-primary hover:underline">2048</Link>
          <Link href="/hangman" className="text-primary hover:underline">Hangman</Link>
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  )
}
