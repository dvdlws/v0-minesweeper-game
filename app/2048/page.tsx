"use client"

import { useEffect } from "react"
import Game2048 from "@/components/game-2048"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Game2048Page() {
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
        <Link href="/solitaire" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Solitaire
        </Link>
        <Link href="/sudoku" className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium">
          Sudoku
        </Link>
        <Link href="/2048" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
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
        <h1 className="text-4xl font-bold mb-3 text-balance">Play 2048 Online Free</h1>
        <p className="text-muted-foreground">The addictive number puzzle - slide tiles and combine them to reach 2048!</p>
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
        <Game2048 />
      </main>

      <article className="max-w-3xl px-4 mt-8 space-y-6 text-center">
        <section>
          <h2 className="text-2xl font-bold mb-3">How to Play 2048</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p><strong>Goal:</strong> Combine tiles to create a tile with the number 2048.</p>
            <p><strong>Controls:</strong> Use arrow keys (or WASD) to slide all tiles in that direction.</p>
            <p><strong>Combining:</strong> When two tiles with the same number touch, they merge into one with their sum.</p>
            <p><strong>Scoring:</strong> Your score increases by the value of each merged tile.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">2048 Strategy Tips</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>Keep your highest tile in a corner and never move it away.</p>
            <p>Try to keep tiles organized in descending order along one edge.</p>
            <p>Avoid moving up if your strategy uses the bottom-left corner.</p>
            <p>Plan several moves ahead - think about where new tiles will appear.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">About 2048</h2>
          <p className="text-muted-foreground leading-relaxed">
            2048 was created by Italian web developer Gabriele Cirulli in 2014. The game quickly went viral and became 
            one of the most popular puzzle games on the internet. Its simple mechanics but deep strategy make it 
            endlessly replayable. Can you reach the elusive 2048 tile? Some players have even reached 4096, 8192, and beyond!
          </p>
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
          <Link href="/solitaire" className="text-primary hover:underline">Solitaire</Link>
          <Link href="/sudoku" className="text-primary hover:underline">Sudoku</Link>
          <Link href="/hangman" className="text-primary hover:underline">Hangman</Link>
          <Link href="/wordle" className="text-primary hover:underline">Wordle</Link>
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  )
}
