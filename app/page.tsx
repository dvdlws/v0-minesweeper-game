"use client"

import { useEffect } from "react"
import Minesweeper from "@/components/minesweeper"
import Link from "next/link"

export default function Home() {
  useEffect(() => {
    // Initialize all AdSense ads on the page
    try {
      const ads = document.querySelectorAll(".adsbygoogle")
      ads.forEach(() => {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      })
    } catch (e) {
      console.error("AdSense error:", e)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <nav className="w-full max-w-4xl flex justify-center gap-2 flex-wrap">
        <Link href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
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
        <Link href="/wordle" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Wordle
        </Link>
      </nav>

      <header className="text-center max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-3 text-balance">Play Minesweeper Online Free</h1>
      </header>

      <div className="w-full max-w-4xl flex justify-center">
        <div className="hidden md:block">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3252021796682458"
            data-ad-slot="5750387915"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
        <div className="block md:hidden">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3252021796682458"
            data-ad-slot="5750387915"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="hidden lg:block sticky top-4">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3252021796682458"
            data-ad-slot="5567497039"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        <main>
          <Minesweeper />
        </main>

        <div className="hidden lg:block sticky top-4">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3252021796682458"
            data-ad-slot="5567497039"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>

      <div className="block lg:hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3252021796682458"
          data-ad-slot="5567497039"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <article className="max-w-3xl px-4 mt-8 space-y-6 text-center">
        <section>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Challenge yourself with the classic Minesweeper puzzle game. Click to reveal cells, flag potential mines,
            and clear the board without detonating any bombs. Choose from three difficulty levels and compete for the
            highest score!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Quick Start</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>
              <strong>Left Click:</strong> Reveal cells. Numbers show adjacent mines.
            </p>
            <p>
              <strong>Right Click:</strong> Flag potential mines.
            </p>
            <p>
              <strong>Goal:</strong> Clear all safe cells without hitting a mine!
            </p>
            <p className="mt-4">
              <Link href="/how-to-play" className="text-primary hover:underline font-semibold">
                Read the complete guide →
              </Link>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Scoring System</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>
              Earn <strong>2 points</strong> for each cell you click that doesn't contain a mine.
            </p>
            <p>
              Earn <strong>1 point</strong> for each cell that auto-reveals when you click an empty cell.
            </p>
            <p>
              At game end, earn <strong>5 points</strong> for each correctly placed flag and lose{" "}
              <strong>10 points</strong> for each incorrectly placed flag.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Difficulty Levels</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>
              <strong>Easy:</strong> 16×16 grid with 40 mines - Perfect for beginners learning Minesweeper strategy.
            </p>
            <p>
              <strong>Medium:</strong> 16×16 grid with 60 mines - Balanced challenge for intermediate players.
            </p>
            <p>
              <strong>Hard:</strong> 16×16 grid with 80 mines - Expert level difficulty for Minesweeper veterans.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">About Minesweeper</h2>
          <p className="text-muted-foreground leading-relaxed">
            Minesweeper is a classic logic puzzle game that has entertained millions since its introduction in the
            1960s. Made famous by Microsoft Windows, this timeless brain teaser challenges players to use deductive
            reasoning and strategic thinking. Our free online version brings the nostalgic gameplay to your browser with
            a modern interface, scoring system, and multiple difficulty levels. Whether you're a Minesweeper expert or
            trying it for the first time, enjoy this addictive puzzle game anytime, anywhere!
          </p>
        </section>
      </article>

      <section className="max-w-4xl px-4 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">More Classic Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link href="/solitaire" className="block p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-center">
            <h3 className="font-bold text-lg">Solitaire</h3>
            <p className="text-sm text-muted-foreground">The classic card game</p>
          </Link>
          <Link href="/sudoku" className="block p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-center">
            <h3 className="font-bold text-lg">Sudoku</h3>
            <p className="text-sm text-muted-foreground">Number puzzle challenge</p>
          </Link>
          <Link href="/2048" className="block p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-center">
            <h3 className="font-bold text-lg">2048</h3>
            <p className="text-sm text-muted-foreground">Slide and merge tiles</p>
          </Link>
          <Link href="/hangman" className="block p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-center">
            <h3 className="font-bold text-lg">Hangman</h3>
            <p className="text-sm text-muted-foreground">Word guessing game</p>
          </Link>
          <Link href="/wordle" className="block p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-center">
            <h3 className="font-bold text-lg">Wordle</h3>
            <p className="text-sm text-muted-foreground">5-letter word puzzle</p>
          </Link>
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2025 Classic Games Online - Free Puzzle Games</p>
        <nav className="flex gap-4 justify-center mt-3 flex-wrap">
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
          <Link href="/tools" className="text-primary hover:underline">
            Tools
          </Link>
          <Link href="/how-to-play" className="text-primary hover:underline">
            How to Play
          </Link>
          <Link href="/strategy" className="text-primary hover:underline">
            Strategy Guide
          </Link>
          <Link href="/history" className="text-primary hover:underline">
            History
          </Link>
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
