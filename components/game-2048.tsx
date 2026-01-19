"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Board = number[][]

const GRID_SIZE = 4

const getTileColor = (value: number): string => {
  const colors: Record<number, string> = {
    0: "bg-muted/30",
    2: "bg-amber-100 text-amber-900",
    4: "bg-amber-200 text-amber-900",
    8: "bg-orange-300 text-white",
    16: "bg-orange-400 text-white",
    32: "bg-orange-500 text-white",
    64: "bg-red-500 text-white",
    128: "bg-yellow-400 text-white",
    256: "bg-yellow-500 text-white",
    512: "bg-yellow-600 text-white",
    1024: "bg-yellow-700 text-white",
    2048: "bg-yellow-800 text-white",
  }
  return colors[value] || "bg-purple-600 text-white"
}

const getFontSize = (value: number): string => {
  if (value >= 1000) return "text-lg sm:text-xl"
  if (value >= 100) return "text-xl sm:text-2xl"
  return "text-2xl sm:text-3xl"
}

export default function Game2048() {
  const [board, setBoard] = useState<Board>([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [continueAfterWin, setContinueAfterWin] = useState(false)

  const createEmptyBoard = useCallback((): Board => {
    return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
  }, [])

  const addRandomTile = useCallback((board: Board): Board => {
    const newBoard = board.map(row => [...row])
    const emptyCells: [number, number][] = []
    
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (newBoard[i][j] === 0) {
          emptyCells.push([i, j])
        }
      }
    }
    
    if (emptyCells.length === 0) return newBoard
    
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    newBoard[row][col] = Math.random() < 0.9 ? 2 : 4
    
    return newBoard
  }, [])

  const initializeGame = useCallback(() => {
    let newBoard = createEmptyBoard()
    newBoard = addRandomTile(newBoard)
    newBoard = addRandomTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
    setWon(false)
    setContinueAfterWin(false)
  }, [createEmptyBoard, addRandomTile])

  useEffect(() => {
    initializeGame()
    const savedBest = localStorage.getItem("2048-best-score")
    if (savedBest) setBestScore(parseInt(savedBest))
  }, [initializeGame])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("2048-best-score", score.toString())
    }
  }, [score, bestScore])

  const canMove = useCallback((board: Board): boolean => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (board[i][j] === 0) return true
        if (j < GRID_SIZE - 1 && board[i][j] === board[i][j + 1]) return true
        if (i < GRID_SIZE - 1 && board[i][j] === board[i + 1][j]) return true
      }
    }
    return false
  }, [])

  const slideRow = (row: number[]): { newRow: number[], points: number } => {
    let points = 0
    const filtered = row.filter(x => x !== 0)
    const newRow: number[] = []
    
    let i = 0
    while (i < filtered.length) {
      if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
        const merged = filtered[i] * 2
        newRow.push(merged)
        points += merged
        i += 2
      } else {
        newRow.push(filtered[i])
        i++
      }
    }
    
    while (newRow.length < GRID_SIZE) {
      newRow.push(0)
    }
    
    return { newRow, points }
  }

  const move = useCallback((direction: "up" | "down" | "left" | "right") => {
    if (gameOver) return

    let newBoard = board.map(row => [...row])
    let totalPoints = 0
    let moved = false

    if (direction === "left") {
      for (let i = 0; i < GRID_SIZE; i++) {
        const { newRow, points } = slideRow(newBoard[i])
        if (newRow.join(",") !== newBoard[i].join(",")) moved = true
        newBoard[i] = newRow
        totalPoints += points
      }
    } else if (direction === "right") {
      for (let i = 0; i < GRID_SIZE; i++) {
        const { newRow, points } = slideRow([...newBoard[i]].reverse())
        const reversed = newRow.reverse()
        if (reversed.join(",") !== newBoard[i].join(",")) moved = true
        newBoard[i] = reversed
        totalPoints += points
      }
    } else if (direction === "up") {
      for (let j = 0; j < GRID_SIZE; j++) {
        const col = newBoard.map(row => row[j])
        const { newRow, points } = slideRow(col)
        if (newRow.join(",") !== col.join(",")) moved = true
        for (let i = 0; i < GRID_SIZE; i++) {
          newBoard[i][j] = newRow[i]
        }
        totalPoints += points
      }
    } else if (direction === "down") {
      for (let j = 0; j < GRID_SIZE; j++) {
        const col = newBoard.map(row => row[j]).reverse()
        const { newRow, points } = slideRow(col)
        const reversed = newRow.reverse()
        const originalCol = newBoard.map(row => row[j])
        if (reversed.join(",") !== originalCol.join(",")) moved = true
        for (let i = 0; i < GRID_SIZE; i++) {
          newBoard[i][j] = reversed[i]
        }
        totalPoints += points
      }
    }

    if (moved) {
      newBoard = addRandomTile(newBoard)
      setBoard(newBoard)
      setScore(s => s + totalPoints)

      if (!continueAfterWin && !won) {
        for (let i = 0; i < GRID_SIZE; i++) {
          for (let j = 0; j < GRID_SIZE; j++) {
            if (newBoard[i][j] === 2048) {
              setWon(true)
              return
            }
          }
        }
      }

      if (!canMove(newBoard)) {
        setGameOver(true)
      }
    }
  }, [board, gameOver, won, continueAfterWin, addRandomTile, canMove])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (won && !continueAfterWin) return
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault()
          move("up")
          break
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault()
          move("down")
          break
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault()
          move("left")
          break
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault()
          move("right")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [move, won, continueAfterWin])

  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (won && !continueAfterWin) return
      
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const dx = touchEndX - touchStartX
      const dy = touchEndY - touchStartY
      const minSwipeDistance = 30

      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > minSwipeDistance) {
          move(dx > 0 ? "right" : "left")
        }
      } else {
        if (Math.abs(dy) > minSwipeDistance) {
          move(dy > 0 ? "down" : "up")
        }
      }
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [move, won, continueAfterWin])

  const handleContinue = () => {
    setContinueAfterWin(true)
    setWon(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <CardTitle className="text-xl sm:text-2xl">2048</CardTitle>
          <div className="flex gap-4">
            <div className="text-center px-3 py-1 bg-muted rounded">
              <div className="text-xs text-muted-foreground">Score</div>
              <div className="font-bold">{score}</div>
            </div>
            <div className="text-center px-3 py-1 bg-muted rounded">
              <div className="text-xs text-muted-foreground">Best</div>
              <div className="font-bold">{bestScore}</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="grid grid-cols-4 gap-2 p-2 bg-muted/50 rounded-lg">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center font-bold ${getTileColor(cell)} ${getFontSize(cell)} transition-all select-none`}
                >
                  {cell !== 0 ? cell : ""}
                </div>
              ))
            )}
          </div>

          {(gameOver || won) && (
            <div className="absolute inset-0 bg-background/80 rounded-lg flex flex-col items-center justify-center gap-4">
              <p className={`text-2xl font-bold ${won ? "text-green-500" : "text-red-500"}`}>
                {won ? "You Win!" : "Game Over!"}
              </p>
              <p className="text-lg">Score: {score}</p>
              <div className="flex gap-2">
                <Button onClick={initializeGame}>New Game</Button>
                {won && (
                  <Button variant="outline" onClick={handleContinue}>
                    Keep Playing
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Use arrow keys or WASD to move. Swipe on mobile.
        </div>

        <div className="flex justify-center">
          <Button onClick={initializeGame} variant="outline">New Game</Button>
        </div>
      </CardContent>
    </Card>
  )
}
