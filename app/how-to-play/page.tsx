"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowToPlay() {
  useEffect(() => {
    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error("AdSense error:", e)
    }
  }, [])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto mb-6">
        <Link href="/">
          <Button variant="ghost">← Back to Game</Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3252021796682458"
          data-ad-slot="5750387915"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">How to Play Minesweeper</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Game Objective</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            The goal of Minesweeper is to clear a rectangular board containing hidden mines without detonating any of
            them. You must use clues about the number of neighboring mines in each field to determine where the mines
            are located.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Basic Controls</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-2">Left Click</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reveals what's under a cell. If it's a mine, the game ends. If it's a number, that tells you how many
                mines are touching that cell (including diagonally). If it's empty, it will automatically reveal all
                adjacent empty cells until it reaches numbered cells.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-2">Right Click</h3>
              <p className="text-muted-foreground leading-relaxed">
                Places or removes a flag on a cell. Use flags to mark cells where you believe mines are located. This
                helps you keep track of dangerous areas and plan your next moves safely.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Understanding the Numbers</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            When you reveal a cell, you'll see a number from 1 to 8. This number indicates how many mines are in the
            eight cells surrounding that number (horizontally, vertically, and diagonally).
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>1</strong> means one mine is touching that cell
            </li>
            <li>
              <strong>2</strong> means two mines are touching that cell
            </li>
            <li>
              <strong>3</strong> means three mines are touching that cell
            </li>
            <li>
              And so on up to <strong>8</strong> (all surrounding cells contain mines)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Step-by-Step Guide for Beginners</h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li className="leading-relaxed">
              <strong>Start anywhere:</strong> Your first click is always safe. Click any cell to begin revealing the
              board.
            </li>
            <li className="leading-relaxed">
              <strong>Look for patterns:</strong> Find cells with numbers and count the surrounding unrevealed cells. If
              a "1" has only one unrevealed neighbor, that neighbor must be a mine.
            </li>
            <li className="leading-relaxed">
              <strong>Flag the mines:</strong> Right-click to place flags on cells you've determined contain mines. This
              helps you visualize the board and avoid clicking them accidentally.
            </li>
            <li className="leading-relaxed">
              <strong>Use process of elimination:</strong> If a "2" has two flags around it, all other surrounding cells
              are safe to click.
            </li>
            <li className="leading-relaxed">
              <strong>Work methodically:</strong> Don't rush. Take your time to analyze each number and its surroundings
              before making your next move.
            </li>
            <li className="leading-relaxed">
              <strong>Clear the board:</strong> Continue revealing safe cells and flagging mines until all non-mine
              cells are revealed. You win!
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Common Beginner Mistakes</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Clicking randomly without analyzing the numbers first</li>
            <li>Forgetting that numbers count diagonal neighbors too</li>
            <li>Not using flags to mark known mines</li>
            <li>Rushing through the game instead of thinking carefully</li>
            <li>Giving up too early when the solution requires logical deduction</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tips for Success</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Start with the corners and edges - they have fewer neighbors to consider</li>
            <li>Look for "1-2-1" patterns which often indicate specific mine locations</li>
            <li>When stuck, look for cells with the most information around them</li>
            <li>Practice on Easy difficulty before moving to Medium or Hard</li>
            <li>Remember: every puzzle is solvable with logic - no guessing required!</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-muted-foreground mb-4">
            Now that you understand the basics, it's time to put your skills to the test! Start with Easy mode to
            practice the fundamentals, then challenge yourself with Medium and Hard difficulties.
          </p>
          <Link href="/">
            <Button
              variant="default"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Play Minesweeper Now
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3252021796682458"
            data-ad-slot="5750387915"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </div>
  )
}
