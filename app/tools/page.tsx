"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Grid3x3, Lightbulb } from "lucide-react"

export default function ToolsPage() {
  const [gridSize, setGridSize] = useState(3)
  const [mineCount, setMineCount] = useState(1)
  const [revealedCells, setRevealedCells] = useState(0)

  const totalCells = gridSize * gridSize
  const safeCells = totalCells - mineCount
  const probability = revealedCells < safeCells ? ((mineCount / (totalCells - revealedCells)) * 100).toFixed(2) : "0.00"

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
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost">← Back to Game</Button>
          </Link>
        </div>

        <div className="mb-6">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3252021796682458"
            data-ad-slot="5750387915"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          ></ins>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Minesweeper Tools</h1>
          <p className="text-muted-foreground">Helpful calculators and guides to improve your Minesweeper skills</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Probability Calculator
              </CardTitle>
              <CardDescription>Calculate the probability of hitting a mine on your next click</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grid Size (per side)</label>
                <input
                  type="number"
                  value={gridSize}
                  onChange={(e) => setGridSize(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                  min="1"
                  max="30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Total Mines</label>
                <input
                  type="number"
                  value={mineCount}
                  onChange={(e) =>
                    setMineCount(Math.max(0, Math.min(totalCells - 1, Number.parseInt(e.target.value) || 0)))
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                  min="0"
                  max={totalCells - 1}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cells Already Revealed</label>
                <input
                  type="number"
                  value={revealedCells}
                  onChange={(e) =>
                    setRevealedCells(Math.max(0, Math.min(safeCells, Number.parseInt(e.target.value) || 0)))
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                  min="0"
                  max={safeCells}
                />
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Mine Probability</p>
                <p className="text-3xl font-bold text-primary">{probability}%</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {totalCells - revealedCells} unrevealed cells remaining
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5" />
                Common Patterns Guide
              </CardTitle>
              <CardDescription>Learn to recognize these patterns for faster solving</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">1-2-1 Pattern</h3>
                  <p className="text-sm text-muted-foreground">
                    When you see 1-2-1 in a row, the mines are always on the sides of the 2, never in the middle.
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">1-2-2-1 Pattern</h3>
                  <p className="text-sm text-muted-foreground">
                    This pattern indicates mines are in the corners. The middle cells between the 2s are safe.
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Corner 1s</h3>
                  <p className="text-sm text-muted-foreground">
                    A 1 in the corner with only 3 possible mine locations is easier to solve than a 1 in the middle with
                    8 possibilities.
                  </p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Edge Strategy</h3>
                  <p className="text-sm text-muted-foreground">
                    Start from edges and corners where there are fewer possible mine locations, making deduction easier.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Advanced Tips & Tricks
              </CardTitle>
              <CardDescription>Pro strategies to improve your Minesweeper game</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Chord Clicking</h3>
                    <p className="text-sm text-muted-foreground">
                      Click both mouse buttons on a revealed number to auto-reveal surrounding cells if you've flagged
                      the correct number of mines.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Flag Efficiency</h3>
                    <p className="text-sm text-muted-foreground">
                      Only flag mines when it helps you solve adjacent cells. Unnecessary flagging wastes time.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">First Click Strategy</h3>
                    <p className="text-sm text-muted-foreground">
                      Your first click is always safe. Start in a corner or edge to maximize the area revealed.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Counting Technique</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep track of total mines vs. flags placed. This helps identify when remaining unrevealed cells
                      must all be mines.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Probability Thinking</h3>
                    <p className="text-sm text-muted-foreground">
                      When forced to guess, choose cells with lower mine probability based on surrounding numbers.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Pattern Recognition</h3>
                    <p className="text-sm text-muted-foreground">
                      The more you play, the faster you'll recognize common patterns and solve them automatically.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3252021796682458"
            data-ad-slot="5750387915"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          ></ins>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button size="lg">Play Minesweeper</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
