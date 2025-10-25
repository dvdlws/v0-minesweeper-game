"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCcw, Trophy, Clock, Zap } from "lucide-react"

type GameMode = "classic" | "speed" | "custom"
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

const CUSTOM_SIZES = {
  small: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  large: { rows: 30, cols: 16, mines: 99 },
}

export default function Minesweeper() {
  const [gameMode, setGameMode] = useState<GameMode>("classic")
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [customSize, setCustomSize] = useState<keyof typeof CUSTOM_SIZES>("medium")
  const [board, setBoard] = useState<Cell[][]>([])
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [flagCount, setFlagCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [speedTimeLimit, setSpeedTimeLimit] = useState(60)

  const config = gameMode === "custom" ? CUSTOM_SIZES[customSize] : DIFFICULTIES[difficulty]

  const getCellSize = () => {
    if (gameMode === "custom" && customSize === "small") return "w-8 h-8 text-sm"
    if (gameMode === "custom" && customSize === "large") return "w-5 h-5 text-xs"
    return "w-6 h-6 text-xs"
  }

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

    let minesPlaced = 0
    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.rows)
      const col = Math.floor(Math.random() * config.cols)
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }

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
    if (gameMode === "speed") {
      setSpeedTimeLimit(difficulty === "easy" ? 90 : difficulty === "medium" ? 60 : 45)
    }
  }, [config.rows, config.cols, config.mines, gameMode, difficulty])

  useEffect(() => {
    initializeBoard()
  }, [initializeBoard])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && gameStatus === "playing") {
      interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev + 1
          if (gameMode === "speed" && newTime >= speedTimeLimit) {
            setGameStatus("lost")
            setIsTimerRunning(false)
            return speedTimeLimit
          }
          return Math.min(newTime, 999)
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, gameStatus, gameMode, speedTimeLimit])

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
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
      <Card className="p-3 sm:p-6 shadow-2xl border-4 border-primary/20 w-full max-w-full sm:max-w-none">
        <div className="flex flex-col items-center gap-3 sm:gap-6">
          <div className="flex gap-2 flex-wrap justify-center w-full">
            <Button
              variant={gameMode === "classic" ? "default" : "outline"}
              size="sm"
              onClick={() => setGameMode("classic")}
              className="font-mono flex-1 sm:flex-none min-w-[100px]"
            >
              <Clock className="w-4 h-4 mr-2" />
              Classic
            </Button>
            <Button
              variant={gameMode === "speed" ? "default" : "outline"}
              size="sm"
              onClick={() => setGameMode("speed")}
              className="font-mono flex-1 sm:flex-none min-w-[100px]"
            >
              <Zap className="w-4 h-4 mr-2" />
              Speed Mode
            </Button>
            <Button
              variant={gameMode === "custom" ? "default" : "outline"}
              size="sm"
              onClick={() => setGameMode("custom")}
              className="font-mono flex-1 sm:flex-none min-w-[100px]"
            >
              Custom Size
            </Button>
          </div>

          {gameMode === "custom" ? (
            <div className="flex gap-2 w-full sm:w-auto">
              {(["small", "medium", "large"] as const).map((size) => (
                <Button
                  key={size}
                  variant={customSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCustomSize(size)}
                  className="font-mono uppercase flex-1 sm:flex-none"
                >
                  {size}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex gap-2 w-full sm:w-auto">
              {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                <Button
                  key={diff}
                  variant={difficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty(diff)}
                  className="font-mono uppercase flex-1 sm:flex-none"
                >
                  {diff}
                </Button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-8 bg-muted p-3 sm:p-4 rounded-lg border-2 border-border w-full max-w-md justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl">💣</span>
              <span className="font-mono text-lg sm:text-xl font-bold min-w-[3ch] text-center">
                {config.mines - flagCount}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={initializeBoard}
              className="rounded-full bg-transparent h-8 w-8 sm:h-10 sm:w-10"
            >
              {gameStatus === "won" ? (
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              ) : gameStatus === "lost" ? (
                <span className="text-lg sm:text-xl">💀</span>
              ) : (
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>

            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-mono text-lg sm:text-xl font-bold min-w-[3ch] text-center">
                {timer.toString().padStart(3, "0")}
              </span>
              <span className="text-muted-foreground text-xs sm:text-base">s</span>
            </div>
          </div>

          {gameMode === "speed" && gameStatus === "playing" && (
            <div className="bg-yellow-500/10 border-2 border-yellow-500/30 p-3 rounded-lg w-full max-w-md">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-mono text-yellow-600">Time Remaining: {speedTimeLimit - timer}s</span>
              </div>
            </div>
          )}

          <div className="bg-muted p-2 sm:p-3 rounded-lg border-2 border-border w-full max-w-md">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs sm:text-sm font-mono text-muted-foreground">SCORE:</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-primary">{score}</span>
            </div>
          </div>

          <div className="w-full flex justify-center">
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
                        ${getCellSize()} flex items-center justify-center font-mono font-bold flex-shrink-0
                        border border-border/20
                        ${
                          cell.isRevealed
                            ? "bg-muted cursor-default"
                            : "bg-background hover:bg-muted/50 cursor-pointer shadow-[inset_1px_1px_0_rgba(255,255,255,0.3),inset_-1px_-1px_0_rgba(0,0,0,0.3)]"
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
          </div>

          {gameStatus !== "playing" && (
            <div className="text-center px-4">
              <p className="text-xl sm:text-2xl font-bold font-mono">
                {gameStatus === "won" ? (
                  <span className="text-yellow-600">🎉 YOU WIN! 🎉</span>
                ) : (
                  <span className="text-red-600">💥 GAME OVER 💥</span>
                )}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Click the reset button to play again</p>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center max-w-md font-mono px-4">
            <p>Left-click to reveal • Right-click to flag</p>
            <p className="mt-1">
              {gameMode === "speed"
                ? "Beat the clock! Clear the board before time runs out!"
                : "Find all mines without clicking on them!"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
