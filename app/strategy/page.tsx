"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Strategy() {
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
        <h1 className="text-4xl font-bold mb-6">Minesweeper Strategy Guide</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Advanced Techniques</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Once you've mastered the basics, these advanced strategies will help you solve even the most challenging
            Minesweeper boards efficiently and accurately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Pattern Recognition</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-2">The 1-2-1 Pattern</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                When you see a horizontal or vertical sequence of 1-2-1, the mines are always on the sides of the "2",
                never in line with the pattern. This is one of the most common and useful patterns in Minesweeper.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Example: If you see 1-2-1 horizontally, the two mines are above and below the "2", and the cells in line
                with the pattern are safe.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-2">The 1-2-2-1 Pattern</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                This pattern indicates that mines are located at the ends and in the middle. The cells adjacent to the
                "1"s (but not touching the "2"s) are safe to click.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-2">Corner Patterns</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Corners are easier to solve because they have fewer neighbors. A "1" in a corner with two unrevealed
                cells means you need more information. A "2" in a corner with two unrevealed cells means both are mines.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-2">Edge Patterns</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Cells on the edge have fewer neighbors (5 instead of 8), making them easier to analyze. Look for edge
                patterns first when you're stuck, as they often provide the breakthrough you need.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Probability and Guessing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            While most Minesweeper boards can be solved with pure logic, sometimes you'll encounter situations where you
            must make an educated guess. Here's how to maximize your chances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Count remaining mines:</strong> Keep track of how many mines are left. This helps you calculate
              probabilities in uncertain situations.
            </li>
            <li>
              <strong>Choose cells with lower probability:</strong> If you must guess, click cells that have fewer
              possible mine configurations around them.
            </li>
            <li>
              <strong>Avoid corners when guessing:</strong> Corners and edges statistically have higher mine density in
              many Minesweeper implementations.
            </li>
            <li>
              <strong>Look for the safest option:</strong> Compare multiple uncertain areas and choose the one with the
              lowest calculated risk.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Efficient Solving Techniques</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Chord Clicking (Advanced)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Some Minesweeper versions allow "chording" - clicking both mouse buttons simultaneously on a number that
                has the correct number of flags around it. This reveals all remaining adjacent cells instantly, saving
                time for speed players.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Work in Sections</h3>
              <p className="text-muted-foreground leading-relaxed">
                Don't jump around the board randomly. Complete one section at a time, fully analyzing all numbers before
                moving to a new area. This systematic approach reduces mistakes and improves solving speed.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Flag Discipline</h3>
              <p className="text-muted-foreground leading-relaxed">
                Only place flags when you're 100% certain a cell contains a mine. Incorrect flags can confuse you later
                and lead to mistakes. If you're unsure, leave the cell unmarked until you have more information.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mental Strategies</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Stay calm:</strong> Rushing leads to mistakes. Take your time to analyze each situation carefully.
            </li>
            <li>
              <strong>Double-check before clicking:</strong> Before revealing a cell, verify your logic one more time. A
              single mistake ends the game.
            </li>
            <li>
              <strong>Learn from losses:</strong> When you hit a mine, review what happened. Did you make a logical
              error, or was it an unavoidable guess?
            </li>
            <li>
              <strong>Practice regularly:</strong> Like any skill, Minesweeper improves with practice. Play daily to
              sharpen your pattern recognition and logical thinking.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Speed Solving Tips</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For players aiming to beat their best times or compete on leaderboards:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Memorize common patterns so you can recognize them instantly</li>
            <li>Use keyboard shortcuts if available for faster flag placement</li>
            <li>Develop muscle memory for mouse movements between cells</li>
            <li>Start with corners and edges to open up the board quickly</li>
            <li>Don't overthink obvious moves - trust your pattern recognition</li>
            <li>Practice the same difficulty level repeatedly to optimize your strategy</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Master Your Skills</h2>
          <p className="text-muted-foreground mb-4">
            Apply these advanced strategies in your next game and watch your Minesweeper skills improve dramatically.
            Remember, becoming a Minesweeper expert takes practice, patience, and pattern recognition!
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Practice Now
          </a>
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
