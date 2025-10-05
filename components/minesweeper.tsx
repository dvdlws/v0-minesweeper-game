"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCcw, Trophy, X } from "lucide-react"
import AdsenseAd from "./adsense-ad"

type Difficulty = "easy" | "medium" | "hard"

interface Cell {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborMines: number
}

const DIFFICULTIES = {
  easy: { rows: 16, cols: 16, mines: 40 },
  medium: { rows: 16, cols: 16, mines: 60 },
  hard: { rows: 16, cols: 16, mines: 80 },
}

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [board, setBoard] = useState<Cell[][]>([])
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [flagCount, setFlagCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [gamesSinceLastAd, setGamesSinceLastAd] = useState(0)
  const [showInterstitial, setShowInterstitial] = useState(false)

  const config = DIFFICULTIES[difficulty]

  const getCellSize = () => "w-6 h-6 text-xs"

  const initializeBoard = useCallback(() => {
    const newBoard: Cell[][] = Array(config.rows)
      .fill(null)
      .map(() =>
        Array(config.cols)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          })),
      )

    // Place mines randomly
    let minesPlaced = 0
    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.rows)
      const col = Math.floor(Math.random() * config.cols)
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }

    // Calculate neighbor mines
    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr
              const newCol = col + dc
              if (
                newRow >= 0 &&
                newRow < config.rows &&
                newCol >= 0 &&
                newCol < config.cols &&
                newBoard[newRow][newCol].isMine
              ) {
                count++
              }
            }
          }
          newBoard[row][col].neighborMines = count
        }
      }
    }

    setBoard(newBoard)
    setGameStatus("playing")
    setFlagCount(0)
    setTimer(0)
    setIsTimerRunning(false)
    setScore(0)
  }, [config.rows, config.cols, config.mines])

  useEffect(() => {
    initializeBoard()
  }, [initializeBoard])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && gameStatus === "playing") {
      interval = setInterval(() => {
        setTimer((prev) => Math.min(prev + 1, 999))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, gameStatus])

  useEffect(() => {
    if (gameStatus !== "playing") {
      const newGamesPlayed = gamesPlayed + 1
      const newGamesSinceLastAd = gamesSinceLastAd + 1

      setGamesPlayed(newGamesPlayed)
      setGamesSinceLastAd(newGamesSinceLastAd)

      // Show interstitial if at least 3 games have passed and random chance (50%)
      if (newGamesSinceLastAd >= 3 && Math.random() < 0.5) {
        setShowInterstitial(true)
        setGamesSinceLastAd(0)
      }
    }
  }, [gameStatus])

  const revealCell = useCallback(
    (row: number, col: number) => {
      if (
        gameStatus !== "playing" ||
        row < 0 ||
        row >= config.rows ||
        col < 0 ||
        col >= config.cols ||
        !board[row] ||
        !board[row][col] ||
        board[row][col].isRevealed ||
        board[row][col].isFlagged
      ) {
        return
      }

      if (!isTimerRunning) {
        setIsTimerRunning(true)
      }

      const newBoard = board.map((r) => r.map((c) => ({ ...c })))
      let clickedCell = true
      let pointsEarned = 0

      const reveal = (r: number, c: number) => {
        if (
          r < 0 ||
          r >= config.rows ||
          c < 0 ||
          c >= config.cols ||
          newBoard[r][c].isRevealed ||
          newBoard[r][c].isFlagged
        ) {
          return
        }

        newBoard[r][c].isRevealed = true

        if (newBoard[r][c].isMine) {
          setGameStatus("lost")
          setIsTimerRunning(false)
          let correctFlags = 0
          let wrongFlags = 0
          for (let i = 0; i < config.rows; i++) {
            for (let j = 0; j < config.cols; j++) {
              if (newBoard[i][j].isFlagged) {
                if (newBoard[i][j].isMine) {
                  correctFlags++
                } else {
                  wrongFlags++
                }
              }
              if (newBoard[i][j].isMine) {
                newBoard[i][j].isRevealed = true
              }
            }
          }
          setScore((prev) => prev + correctFlags * 5 - wrongFlags * 10)
          return
        }

        if (clickedCell) {
          pointsEarned += 2
          clickedCell = false
        } else {
          pointsEarned += 1
        }

        if (newBoard[r][c].neighborMines === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              reveal(r + dr, c + dc)
            }
          }
        }
      }

      reveal(row, col)
      setScore((prev) => prev + pointsEarned)
      setBoard(newBoard)

      // Check win condition
      const revealedCount = newBoard.flat().filter((c) => c.isRevealed).length
      if (revealedCount === config.rows * config.cols - config.mines) {
        setGameStatus("won")
        setIsTimerRunning(false)
        let correctFlags = 0
        let wrongFlags = 0
        for (let i = 0; i < config.rows; i++) {
          for (let j = 0; j < config.cols; j++) {
            if (newBoard[i][j].isFlagged) {
              if (newBoard[i][j].isMine) {
                correctFlags++
              } else {
                wrongFlags++
              }
            }
          }
        }
        setScore((prev) => prev + correctFlags * 5 - wrongFlags * 10)
      }
    },
    [board, gameStatus, isTimerRunning, config.rows, config.cols, config.mines],
  )

  const toggleFlag = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      e.preventDefault()
      if (
        gameStatus !== "playing" ||
        row < 0 ||
        row >= config.rows ||
        col < 0 ||
        col >= config.cols ||
        !board[row] ||
        !board[row][col] ||
        board[row][col].isRevealed
      ) {
        return
      }

      if (!isTimerRunning) {
        setIsTimerRunning(true)
      }

      const newBoard = board.map((r) => r.map((c) => ({ ...c })))
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged

      setBoard(newBoard)
      setFlagCount((prev) => (newBoard[row][col].isFlagged ? prev + 1 : prev - 1))
    },
    [board, gameStatus, isTimerRunning, config.rows, config.cols],
  )

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return "text-foreground"
    const colors = [
      "",
      "text-blue-600",
      "text-green-600",
      "text-red-600",
      "text-blue-800",
      "text-red-800",
      "text-cyan-600",
      "text-gray-800",
      "text-gray-600",
    ]
    return colors[cell.neighborMines] || ""
  }

  if (board.length === 0 || board.length !== config.rows || board[0]?.length !== config.cols) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="p-8">
          <p className="text-lg font-mono">Loading game...</p>
        </Card>
      </div>
    )
  }

  return (
    <>
      {showInterstitial && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative bg-background rounded-lg p-8 max-w-2xl w-full shadow-2xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInterstitial(false)}
              className="absolute top-4 right-4 hover:bg-muted"
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="flex flex-col items-center gap-6">
              <AdsenseAd adSlot="2278988712" />
              <Button onClick={() => setShowInterstitial(false)} size="lg" className="mt-2">
                Continue Playing
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="p-6 shadow-2xl border-4 border-primary/20">
          <div className="flex flex-col items-center gap-6">
            {/* Difficulty Selector */}
            <div className="flex gap-2">
              {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                <Button
                  key={diff}
                  variant={difficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty(diff)}
                  className="font-mono uppercase"
                >
                  {diff}
                </Button>
              ))}
            </div>

            {/* Game Stats */}
            <div className="flex items-center gap-4 sm:gap-8 bg-muted p-4 rounded-lg border-2 border-border w-full max-w-md justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💣</span>
                <span className="font-mono text-xl font-bold min-w-[3ch] text-center">{config.mines - flagCount}</span>
              </div>

              <Button variant="outline" size="icon" onClick={initializeBoard} className="rounded-full bg-transparent">
                {gameStatus === "won" ? (
                  <Trophy className="w-5 h-5 text-yellow-500" />
                ) : gameStatus === "lost" ? (
                  <span className="text-xl">💀</span>
                ) : (
                  <RotateCcw className="w-5 h-5" />
                )}
              </Button>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-bold min-w-[3ch] text-center">
                  {timer.toString().padStart(3, "0")}
                </span>
                <span className="text-muted-foreground">s</span>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg border-2 border-border w-full max-w-md">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-mono text-muted-foreground">SCORE:</span>
                <span className="font-mono text-2xl font-bold text-primary">{score}</span>
              </div>
            </div>

            {/* Game Board */}
            <div className="overflow-auto max-w-full max-h-[600px]">
              <div
                className="inline-grid gap-0 border-4 border-primary/30 shadow-lg bg-muted/30"
                style={{
                  gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
                }}
              >
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => revealCell(rowIndex, colIndex)}
                      onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
                      disabled={gameStatus !== "playing"}
                      className={`
                        ${getCellSize()} flex items-center justify-center font-mono font-bold
                        transition-all duration-100 border border-border/20
                        ${
                          cell.isRevealed
                            ? "bg-muted cursor-default"
                            : "bg-background hover:bg-muted/50 active:bg-muted cursor-pointer shadow-[inset_2px_2px_0_rgba(255,255,255,0.3),inset_-2px_-2px_0_rgba(0,0,0,0.3)]"
                        }
                        ${cell.isMine && cell.isRevealed && gameStatus === "lost" ? "bg-red-500/20" : ""}
                      `}
                    >
                      {cell.isFlagged ? (
                        <span>🚩</span>
                      ) : cell.isRevealed ? (
                        cell.isMine ? (
                          <span>💣</span>
                        ) : cell.neighborMines > 0 ? (
                          <span className={getCellColor(cell)}>{cell.neighborMines}</span>
                        ) : null
                      ) : null}
                    </button>
                  )),
                )}
              </div>
            </div>

            {/* Game Status Message */}
            {gameStatus !== "playing" && (
              <div className="text-center">
                <p className="text-2xl font-bold font-mono">
                  {gameStatus === "won" ? (
                    <span className="text-yellow-600">🎉 YOU WIN! 🎉</span>
                  ) : (
                    <span className="text-red-600">💥 GAME OVER 💥</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Click the reset button to play again</p>
              </div>
            )}

            {/* Instructions */}
            <div className="text-xs text-muted-foreground text-center max-w-md font-mono">
              <p>Left-click to reveal • Right-click to flag</p>
              <p className="mt-1">Find all mines without clicking on them!</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
