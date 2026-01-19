"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Difficulty = "easy" | "medium" | "hard"
type Board = (number | null)[][]

const DIFFICULTY_CELLS: Record<Difficulty, number> = {
  easy: 38,
  medium: 30,
  hard: 24,
}

export default function Sudoku() {
  const [board, setBoard] = useState<Board>([])
  const [solution, setSolution] = useState<Board>([])
  const [initialBoard, setInitialBoard] = useState<Board>([])
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [timer, setTimer] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [errors, setErrors] = useState<Set<string>>(new Set())
  const [notes, setNotes] = useState<Map<string, Set<number>>>(new Map())
  const [notesMode, setNotesMode] = useState(false)

  const generateSolvedBoard = useCallback((): Board => {
    const board: Board = Array(9).fill(null).map(() => Array(9).fill(null))
    
    const isValid = (board: Board, row: number, col: number, num: number): boolean => {
      for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false
      }
      for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false
      }
      const startRow = Math.floor(row / 3) * 3
      const startCol = Math.floor(col / 3) * 3
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num) return false
        }
      }
      return true
    }

    const fillBoard = (board: Board): boolean => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === null) {
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
            for (const num of nums) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num
                if (fillBoard(board)) return true
                board[row][col] = null
              }
            }
            return false
          }
        }
      }
      return true
    }

    fillBoard(board)
    return board
  }, [])

  const createPuzzle = useCallback((solvedBoard: Board, cellsToKeep: number): Board => {
    const puzzle = solvedBoard.map(row => [...row])
    const positions: [number, number][] = []
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        positions.push([i, j])
      }
    }
    
    positions.sort(() => Math.random() - 0.5)
    
    const cellsToRemove = 81 - cellsToKeep
    for (let i = 0; i < cellsToRemove; i++) {
      const [row, col] = positions[i]
      puzzle[row][col] = null
    }
    
    return puzzle
  }, [])

  const initializeGame = useCallback((diff: Difficulty = difficulty) => {
    const solved = generateSolvedBoard()
    const puzzle = createPuzzle(solved, DIFFICULTY_CELLS[diff])
    
    setSolution(solved)
    setBoard(puzzle.map(row => [...row]))
    setInitialBoard(puzzle.map(row => [...row]))
    setSelectedCell(null)
    setTimer(0)
    setGameStarted(false)
    setGameWon(false)
    setErrors(new Set())
    setNotes(new Map())
    setNotesMode(false)
  }, [difficulty, generateSolvedBoard, createPuzzle])

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !gameWon) {
      interval = setInterval(() => setTimer(t => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameWon])

  useEffect(() => {
    if (board.length === 0) return
    
    const isComplete = board.every((row, i) =>
      row.every((cell, j) => cell === solution[i]?.[j])
    )
    
    if (isComplete && gameStarted) {
      setGameWon(true)
    }
  }, [board, solution, gameStarted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleCellClick = (row: number, col: number) => {
    if (!gameStarted) setGameStarted(true)
    if (initialBoard[row]?.[col] !== null) return
    setSelectedCell({ row, col })
  }

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return
    if (!gameStarted) setGameStarted(true)
    
    const { row, col } = selectedCell
    if (initialBoard[row][col] !== null) return

    if (notesMode) {
      const key = `${row}-${col}`
      const newNotes = new Map(notes)
      const cellNotes = newNotes.get(key) || new Set()
      
      if (cellNotes.has(num)) {
        cellNotes.delete(num)
      } else {
        cellNotes.add(num)
      }
      
      if (cellNotes.size === 0) {
        newNotes.delete(key)
      } else {
        newNotes.set(key, cellNotes)
      }
      
      setNotes(newNotes)
    } else {
      const newBoard = board.map(r => [...r])
      newBoard[row][col] = num
      setBoard(newBoard)
      
      const key = `${row}-${col}`
      const newNotes = new Map(notes)
      newNotes.delete(key)
      setNotes(newNotes)

      const newErrors = new Set(errors)
      if (num !== solution[row][col]) {
        newErrors.add(key)
      } else {
        newErrors.delete(key)
      }
      setErrors(newErrors)
    }
  }

  const handleClear = () => {
    if (!selectedCell) return
    const { row, col } = selectedCell
    if (initialBoard[row][col] !== null) return
    
    const newBoard = board.map(r => [...r])
    newBoard[row][col] = null
    setBoard(newBoard)
    
    const key = `${row}-${col}`
    const newErrors = new Set(errors)
    newErrors.delete(key)
    setErrors(newErrors)
    
    const newNotes = new Map(notes)
    newNotes.delete(key)
    setNotes(newNotes)
  }

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff)
    initializeGame(diff)
  }

  const getCellStyle = (row: number, col: number) => {
    const isSelected = selectedCell?.row === row && selectedCell?.col === col
    const isInitial = initialBoard[row]?.[col] !== null
    const hasError = errors.has(`${row}-${col}`)
    const isHighlighted = selectedCell && (
      selectedCell.row === row || 
      selectedCell.col === col ||
      (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
       Math.floor(selectedCell.col / 3) === Math.floor(col / 3))
    )
    const sameNumber = selectedCell && board[row][col] !== null && 
                       board[row][col] === board[selectedCell.row][selectedCell.col]

    let className = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-lg font-medium cursor-pointer select-none border border-border transition-colors "
    
    if (isSelected) {
      className += "bg-primary/30 "
    } else if (sameNumber) {
      className += "bg-primary/20 "
    } else if (isHighlighted) {
      className += "bg-muted/50 "
    } else {
      className += "bg-card "
    }
    
    if (hasError) {
      className += "text-red-500 "
    } else if (isInitial) {
      className += "text-foreground font-bold "
    } else {
      className += "text-primary "
    }
    
    if (col % 3 === 2 && col !== 8) className += "border-r-2 border-r-foreground/30 "
    if (row % 3 === 2 && row !== 8) className += "border-b-2 border-b-foreground/30 "
    
    return className
  }

  const renderCellContent = (row: number, col: number) => {
    const value = board[row]?.[col]
    if (value !== null) return value

    const key = `${row}-${col}`
    const cellNotes = notes.get(key)
    if (!cellNotes || cellNotes.size === 0) return null

    return (
      <div className="grid grid-cols-3 gap-0 text-[6px] sm:text-[8px] text-muted-foreground w-full h-full p-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <span key={n} className="flex items-center justify-center">
            {cellNotes.has(n) ? n : ""}
          </span>
        ))}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <CardTitle className="text-xl sm:text-2xl">Sudoku</CardTitle>
          <div className="flex gap-4 text-sm">
            <span>Time: {formatTime(timer)}</span>
            <span>Errors: {errors.size}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {gameWon && (
          <div className="text-center p-4 bg-green-500/20 rounded-lg">
            <p className="text-xl font-bold text-green-500">Congratulations! Puzzle Solved!</p>
            <p className="text-muted-foreground">Time: {formatTime(timer)}</p>
          </div>
        )}

        <div className="flex gap-2 justify-center">
          {(["easy", "medium", "hard"] as Difficulty[]).map(diff => (
            <Button
              key={diff}
              variant={difficulty === diff ? "default" : "outline"}
              size="sm"
              onClick={() => handleDifficultyChange(diff)}
              className="capitalize"
            >
              {diff}
            </Button>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="border-2 border-foreground/30 rounded overflow-hidden">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={getCellStyle(rowIndex, colIndex)}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {renderCellContent(rowIndex, colIndex)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1 justify-center flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <Button
                key={num}
                variant="outline"
                className="w-8 h-8 sm:w-10 sm:h-10 p-0 bg-transparent"
                onClick={() => handleNumberInput(num)}
              >
                {num}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button 
              variant={notesMode ? "default" : "outline"} 
              size="sm" 
              onClick={() => setNotesMode(!notesMode)}
            >
              Notes {notesMode ? "ON" : "OFF"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => initializeGame()}>
              New Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
