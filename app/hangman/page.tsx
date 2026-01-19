"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import AdsenseAd from "@/components/adsense-ad"

const Hangman = dynamic(() => import("@/components/hangman"), { ssr: false })

export default function HangmanPage() {
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
        <Link href="/hangman" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Hangman
        </Link>
        <Link href="/wordle" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Wordle
        </Link>
      </nav>

      <header className="text-center max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-3 text-balance">Play Hangman Online Free</h1>
        <p className="text-muted-foreground">The classic word guessing game - guess the word before the hangman is complete!</p>
      </header>

      <div className="w-full max-w-4xl flex justify-center">
        <AdsenseAd adSlot="5750387915" />
      </div>

      <main>
        <Hangman />
      </main>

      <div className="w-full max-w-4xl flex justify-center">
        <AdsenseAd adSlot="5750387915" />
      </div>

      <article className="max-w-3xl px-4 mt-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">How to Play Hangman</h2>
          <p className="text-muted-foreground">
            Hangman is a classic word guessing game. A random word is chosen from a category, and you must guess
            the letters one at a time. Each correct guess reveals the letter in the word. Each wrong guess adds
            a body part to the hangman. You have 6 wrong guesses before the game is over. Try to guess the word
            before the hangman is complete!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Game Features</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Multiple word categories: Animals, Countries, Foods, Objects, Nature, Sports</li>
            <li>On-screen keyboard for mouse/touch input</li>
            <li>Physical keyboard support - just type letters to guess</li>
            <li>Win/loss tracking and current streak display</li>
            <li>Category hints to help guide your guesses</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Tips for Winning</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Start with common vowels: E, A, I, O, U</li>
            <li>Try common consonants next: R, S, T, L, N</li>
            <li>Use the category hint to narrow down possibilities</li>
            <li>Look for common word patterns as letters are revealed</li>
            <li>Avoid guessing uncommon letters like Q, X, Z early</li>
          </ul>
        </section>
      </article>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2025 Classic Games Online - Free Puzzle Games</p>
        <nav className="flex gap-4 justify-center mt-3 flex-wrap">
          <Link href="/" className="text-primary hover:underline">
            Minesweeper
          </Link>
          <Link href="/solitaire" className="text-primary hover:underline">
            Solitaire
          </Link>
          <Link href="/sudoku" className="text-primary hover:underline">
            Sudoku
          </Link>
          <Link href="/2048" className="text-primary hover:underline">
            2048
          </Link>
          <Link href="/hangman" className="text-primary hover:underline">
            Hangman
          </Link>
          <Link href="/wordle" className="text-primary hover:underline">
            Wordle
          </Link>
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
