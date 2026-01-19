"use client"

import { useEffect } from "react"
import Solitaire from "@/components/solitaire"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SolitairePage() {
  useEffect(() => {
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
    <div className="min-h-screen flex flex-col items-center gap-6 p-4">
      <nav className="w-full max-w-4xl flex justify-center gap-2 flex-wrap">
        <Link href="/" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Minesweeper
        </Link>
        <Link href="/solitaire" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
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
        <h1 className="text-4xl font-bold mb-3 text-balance">Play Solitaire Online Free</h1>
        <p className="text-muted-foreground">The classic card game - arrange cards in descending order and build up the foundations!</p>
      </header>

      <div className="w-full max-w-4xl flex justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3252021796682458"
          data-ad-slot="5750387915"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <main>
        <Solitaire />
      </main>

      <article className="max-w-3xl px-4 mt-8 space-y-6 text-center">
        <section>
          <h2 className="text-2xl font-bold mb-3">How to Play Solitaire</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p><strong>Goal:</strong> Move all cards to the four foundation piles, sorted by suit from Ace to King.</p>
            <p><strong>Tableau:</strong> Build columns in descending order, alternating colors (red on black, black on red).</p>
            <p><strong>Stock:</strong> Click the deck to draw cards to the waste pile.</p>
            <p><strong>Moving Cards:</strong> Click a card to select it, then click a valid destination to move.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Solitaire Tips</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>Always move Aces and Twos to foundations immediately.</p>
            <p>Try to expose face-down cards as quickly as possible.</p>
            <p>Keep columns balanced - avoid emptying one column while another grows too long.</p>
            <p>Use the Auto Move button to quickly move cards to foundations.</p>
          </div>
        </section>
      </article>

      <div className="w-full max-w-4xl flex justify-center mt-6">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3252021796682458"
          data-ad-slot="5750387915"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2025 Classic Games Online</p>
        <nav className="flex gap-4 justify-center mt-3 flex-wrap">
          <Link href="/" className="text-primary hover:underline">Minesweeper</Link>
          <Link href="/sudoku" className="text-primary hover:underline">Sudoku</Link>
          <Link href="/2048" className="text-primary hover:underline">2048</Link>
          <Link href="/hangman" className="text-primary hover:underline">Hangman</Link>
          <Link href="/wordle" className="text-primary hover:underline">Wordle</Link>
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  )
}
