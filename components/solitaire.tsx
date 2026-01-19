"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Suit = "hearts" | "diamonds" | "clubs" | "spades"
type CardType = {
  suit: Suit
  value: number
  faceUp: boolean
  id: string
}

type Pile = CardType[]

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"]
const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

const getSuitSymbol = (suit: Suit) => {
  switch (suit) {
    case "hearts": return "♥"
    case "diamonds": return "♦"
    case "clubs": return "♣"
    case "spades": return "♠"
  }
}

const getSuitColor = (suit: Suit) => {
  return suit === "hearts" || suit === "diamonds" ? "text-red-500" : "text-foreground"
}

const getValueDisplay = (value: number) => {
  switch (value) {
    case 1: return "A"
    case 11: return "J"
    case 12: return "Q"
    case 13: return "K"
    default: return value.toString()
  }
}

const isRed = (suit: Suit) => suit === "hearts" || suit === "diamonds"

export default function Solitaire() {
  const [tableau, setTableau] = useState<Pile[]>([[], [], [], [], [], [], []])
  const [foundations, setFoundations] = useState<Pile[]>([[], [], [], []])
  const [stock, setStock] = useState<Pile>([])
  const [waste, setWaste] = useState<Pile>([])
  const [selectedCards, setSelectedCards] = useState<{ cards: CardType[], source: string, index: number } | null>(null)
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const createDeck = useCallback((): CardType[] => {
    const deck: CardType[] = []
    for (const suit of SUITS) {
      for (const value of VALUES) {
        deck.push({ suit, value, faceUp: false, id: `${suit}-${value}` })
      }
    }
    return deck
  }, [])

  const shuffleDeck = useCallback((deck: CardType[]): CardType[] => {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  const initializeGame = useCallback(() => {
    const deck = shuffleDeck(createDeck())
    const newTableau: Pile[] = [[], [], [], [], [], [], []]
    let cardIndex = 0

    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        const card = { ...deck[cardIndex], faceUp: j === i }
        newTableau[j].push(card)
        cardIndex++
      }
    }

    const remainingCards = deck.slice(cardIndex).map(c => ({ ...c, faceUp: false }))

    setTableau(newTableau)
    setFoundations([[], [], [], []])
    setStock(remainingCards)
    setWaste([])
    setSelectedCards(null)
    setMoves(0)
    setTimer(0)
    setGameStarted(false)
    setGameWon(false)
  }, [createDeck, shuffleDeck])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !gameWon) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameWon])

  useEffect(() => {
    const won = foundations.every(f => f.length === 13)
    if (won && gameStarted) {
      setGameWon(true)
    }
  }, [foundations, gameStarted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const drawFromStock = () => {
    if (!gameStarted) setGameStarted(true)
    
    if (stock.length === 0) {
      setStock(waste.map(c => ({ ...c, faceUp: false })).reverse())
      setWaste([])
    } else {
      const card = { ...stock[stock.length - 1], faceUp: true }
      setStock(stock.slice(0, -1))
      setWaste([...waste, card])
    }
    setSelectedCards(null)
  }

  const canPlaceOnTableau = (card: CardType, pile: Pile): boolean => {
    if (pile.length === 0) {
      return card.value === 13
    }
    const topCard = pile[pile.length - 1]
    return topCard.faceUp && 
           topCard.value === card.value + 1 && 
           isRed(card.suit) !== isRed(topCard.suit)
  }

  const canPlaceOnFoundation = (card: CardType, foundation: Pile): boolean => {
    if (foundation.length === 0) {
      return card.value === 1
    }
    const topCard = foundation[foundation.length - 1]
    return topCard.suit === card.suit && topCard.value === card.value - 1
  }

  const handleCardClick = (source: string, pileIndex: number, cardIndex: number) => {
    if (!gameStarted) setGameStarted(true)

    let pile: Pile
    if (source === "tableau") {
      pile = tableau[pileIndex]
    } else if (source === "waste") {
      pile = waste
    } else if (source === "foundation") {
      pile = foundations[pileIndex]
    } else {
      return
    }

    const card = pile[cardIndex]
    if (!card) return

    // If card is face down, flip it if it's the last card in tableau
    if (!card.faceUp) {
      if (source === "tableau" && cardIndex === pile.length - 1) {
        const newTableau = [...tableau]
        newTableau[pileIndex] = [...newTableau[pileIndex]]
        newTableau[pileIndex][cardIndex] = { ...card, faceUp: true }
        setTableau(newTableau)
      }
      return
    }

    if (selectedCards) {
      // If clicking on a tableau pile, try to move there
      if (source === "tableau") {
        // Check if we can place the selected cards on this pile
        if (canPlaceOnTableau(selectedCards.cards[0], pile)) {
          // Move cards to target pile
          const newTableau = [...tableau]
          newTableau[pileIndex] = [...newTableau[pileIndex], ...selectedCards.cards]
          
          // Remove cards from source
          if (selectedCards.source === "tableau") {
            newTableau[selectedCards.index] = newTableau[selectedCards.index].slice(0, -selectedCards.cards.length)
            // Flip the new last card if face down
            if (newTableau[selectedCards.index].length > 0) {
              const lastCard = newTableau[selectedCards.index][newTableau[selectedCards.index].length - 1]
              if (!lastCard.faceUp) {
                newTableau[selectedCards.index][newTableau[selectedCards.index].length - 1] = { ...lastCard, faceUp: true }
              }
            }
          }
          setTableau(newTableau)
          
          if (selectedCards.source === "waste") {
            setWaste(prev => prev.slice(0, -selectedCards.cards.length))
          } else if (selectedCards.source === "foundation") {
            const newFoundations = [...foundations]
            newFoundations[selectedCards.index] = newFoundations[selectedCards.index].slice(0, -selectedCards.cards.length)
            setFoundations(newFoundations)
          }
          
          setMoves(m => m + 1)
          setSelectedCards(null)
          return
        }
      }
      // If clicking on a foundation, try to move there
      if (source === "foundation") {
        if (selectedCards.cards.length === 1 && canPlaceOnFoundation(selectedCards.cards[0], foundations[pileIndex])) {
          const newFoundations = [...foundations]
          newFoundations[pileIndex] = [...newFoundations[pileIndex], selectedCards.cards[0]]
          setFoundations(newFoundations)
          
          if (selectedCards.source === "tableau") {
            const newTableau = [...tableau]
            newTableau[selectedCards.index] = newTableau[selectedCards.index].slice(0, -1)
            if (newTableau[selectedCards.index].length > 0) {
              const lastCard = newTableau[selectedCards.index][newTableau[selectedCards.index].length - 1]
              if (!lastCard.faceUp) {
                newTableau[selectedCards.index][newTableau[selectedCards.index].length - 1] = { ...lastCard, faceUp: true }
              }
            }
            setTableau(newTableau)
          } else if (selectedCards.source === "waste") {
            setWaste(prev => prev.slice(0, -1))
          }
          
          setMoves(m => m + 1)
          setSelectedCards(null)
          return
        }
      }
      // Otherwise, select new cards (or deselect if clicking same cards)
      if (source === selectedCards.source && pileIndex === selectedCards.index && cardIndex === pile.length - selectedCards.cards.length) {
        setSelectedCards(null)
        return
      }
      const cards = pile.slice(cardIndex)
      setSelectedCards({ cards, source, index: pileIndex })
    } else {
      const cards = pile.slice(cardIndex)
      setSelectedCards({ cards, source, index: pileIndex })
    }
  }

  const tryMoveCards = (targetIndex: number, toFoundation: boolean = false) => {
    if (!selectedCards) return

    const { cards, source, index: sourceIndex } = selectedCards

    if (toFoundation) {
      if (cards.length !== 1) {
        setSelectedCards(null)
        return
      }

      const card = cards[0]
      if (canPlaceOnFoundation(card, foundations[targetIndex])) {
        const newFoundations = [...foundations]
        newFoundations[targetIndex] = [...newFoundations[targetIndex], card]
        setFoundations(newFoundations)

        removeCardsFromSource(source, sourceIndex, 1)
        setMoves(m => m + 1)
      }
    } else {
      if (canPlaceOnTableau(cards[0], tableau[targetIndex])) {
        const newTableau = [...tableau]
        newTableau[targetIndex] = [...newTableau[targetIndex], ...cards]
        setTableau(newTableau)

        removeCardsFromSource(source, sourceIndex, cards.length)
        setMoves(m => m + 1)
      }
    }

    setSelectedCards(null)
  }

  const removeCardsFromSource = (source: string, sourceIndex: number, count: number) => {
    if (source === "tableau") {
      const newTableau = [...tableau]
      newTableau[sourceIndex] = newTableau[sourceIndex].slice(0, -count)
      if (newTableau[sourceIndex].length > 0 && !newTableau[sourceIndex][newTableau[sourceIndex].length - 1].faceUp) {
        newTableau[sourceIndex][newTableau[sourceIndex].length - 1].faceUp = true
      }
      setTableau(newTableau)
    } else if (source === "waste") {
      setWaste(waste.slice(0, -count))
    } else if (source === "foundation") {
      const newFoundations = [...foundations]
      newFoundations[sourceIndex] = newFoundations[sourceIndex].slice(0, -count)
      setFoundations(newFoundations)
    }
  }

  const handleEmptyPileClick = (pileIndex: number) => {
    if (!selectedCards) return
    if (!gameStarted) setGameStarted(true)
    
    // Only kings can be placed on empty tableau piles
    if (selectedCards.cards[0].value !== 13) {
      setSelectedCards(null)
      return
    }
    
    const newTableau = [...tableau]
    newTableau[pileIndex] = [...selectedCards.cards]
    
    if (selectedCards.source === "tableau") {
      newTableau[selectedCards.index] = newTableau[selectedCards.index].slice(0, -selectedCards.cards.length)
      if (newTableau[selectedCards.index].length > 0) {
        const lastCard = newTableau[selectedCards.index][newTableau[selectedCards.index].length - 1]
        if (!lastCard.faceUp) {
          newTableau[selectedCards.index][newTableau[selectedCards.index].length - 1] = { ...lastCard, faceUp: true }
        }
      }
    }
    setTableau(newTableau)
    
    if (selectedCards.source === "waste") {
      setWaste(prev => prev.slice(0, -selectedCards.cards.length))
    } else if (selectedCards.source === "foundation") {
      const newFoundations = [...foundations]
      newFoundations[selectedCards.index] = newFoundations[selectedCards.index].slice(0, -selectedCards.cards.length)
      setFoundations(newFoundations)
    }
    
    setMoves(m => m + 1)
    setSelectedCards(null)
  }

  const handleFoundationClick = (foundationIndex: number) => {
    if (!selectedCards) return
    if (!gameStarted) setGameStarted(true)
    
    if (selectedCards.cards.length !== 1) {
      setSelectedCards(null)
      return
    }
    
    const card = selectedCards.cards[0]
    if (!canPlaceOnFoundation(card, foundations[foundationIndex])) {
      setSelectedCards(null)
      return
    }
    
    const newFoundations = [...foundations]
    newFoundations[foundationIndex] = [...newFoundations[foundationIndex], card]
    setFoundations(newFoundations)
    
    if (selectedCards.source === "tableau") {
      const newTableau = [...tableau]
      newTableau[selectedCards.index] = newTableau[selectedCards.index].slice(0, -1)
      if (newTableau[selectedCards.index].length > 0) {
        const lastCard = newTableau[selectedCards.index][newTableau[selectedCards.index].length - 1]
        if (!lastCard.faceUp) {
          newTableau[selectedCards.index][newTableau[selectedCards.index].length - 1] = { ...lastCard, faceUp: true }
        }
      }
      setTableau(newTableau)
    } else if (selectedCards.source === "waste") {
      setWaste(prev => prev.slice(0, -1))
    }
    
    setMoves(m => m + 1)
    setSelectedCards(null)
  }

  const autoMoveToFoundation = () => {
    for (let i = 0; i < tableau.length; i++) {
      const pile = tableau[i]
      if (pile.length === 0) continue
      const card = pile[pile.length - 1]
      if (!card.faceUp) continue

      for (let j = 0; j < foundations.length; j++) {
        if (canPlaceOnFoundation(card, foundations[j])) {
          setSelectedCards({ cards: [card], source: "tableau", index: i })
          setTimeout(() => tryMoveCards(j, true), 0)
          return true
        }
      }
    }

    if (waste.length > 0) {
      const card = waste[waste.length - 1]
      for (let j = 0; j < foundations.length; j++) {
        if (canPlaceOnFoundation(card, foundations[j])) {
          setSelectedCards({ cards: [card], source: "waste", index: 0 })
          setTimeout(() => tryMoveCards(j, true), 0)
          return true
        }
      }
    }

    return false
  }

  const renderCard = (card: CardType, onClick: () => void, isSelected: boolean = false, stackOffset: number = 0) => {
    if (!card.faceUp) {
      return (
        <div
          className={`w-12 h-16 sm:w-14 sm:h-20 rounded border-2 border-border bg-primary/20 cursor-pointer flex items-center justify-center ${isSelected ? "ring-2 ring-primary" : ""}`}
          style={{ marginTop: stackOffset > 0 ? "-48px" : 0 }}
          onClick={onClick}
        >
          <div className="w-8 h-12 sm:w-10 sm:h-14 border border-primary/40 rounded" />
        </div>
      )
    }

    return (
      <div
        className={`w-12 h-16 sm:w-14 sm:h-20 rounded border-2 border-border bg-card cursor-pointer flex flex-col items-center justify-between p-1 ${isSelected ? "ring-2 ring-primary" : ""} ${getSuitColor(card.suit)}`}
        style={{ marginTop: stackOffset > 0 ? "-48px" : 0 }}
        onClick={onClick}
      >
        <div className="text-xs sm:text-sm font-bold self-start">{getValueDisplay(card.value)}</div>
        <div className="text-lg sm:text-xl">{getSuitSymbol(card.suit)}</div>
        <div className="text-xs sm:text-sm font-bold self-end rotate-180">{getValueDisplay(card.value)}</div>
      </div>
    )
  }

  const renderEmptyPile = (onClick: () => void) => (
    <div
      className="w-12 h-16 sm:w-14 sm:h-20 rounded border-2 border-dashed border-muted-foreground/30 cursor-pointer"
      onClick={onClick}
    />
  )

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <CardTitle className="text-xl sm:text-2xl">Solitaire</CardTitle>
          <div className="flex gap-4 text-sm">
            <span>Time: {formatTime(timer)}</span>
            <span>Moves: {moves}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {gameWon && (
          <div className="text-center p-4 bg-green-500/20 rounded-lg">
            <p className="text-xl font-bold text-green-500">Congratulations! You Won!</p>
            <p className="text-muted-foreground">Time: {formatTime(timer)} | Moves: {moves}</p>
          </div>
        )}

        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className="flex gap-2">
            <div onClick={drawFromStock} className="cursor-pointer">
              {stock.length > 0 ? (
                <div className="w-12 h-16 sm:w-14 sm:h-20 rounded border-2 border-border bg-primary/20 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">{stock.length}</span>
                </div>
              ) : (
                <div className="w-12 h-16 sm:w-14 sm:h-20 rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <span className="text-2xl text-muted-foreground/50">↻</span>
                </div>
              )}
            </div>
            <div>
              {waste.length > 0 ? (
                renderCard(
                  waste[waste.length - 1],
                  () => handleCardClick("waste", 0, waste.length - 1),
                  selectedCards?.source === "waste"
                )
              ) : (
                renderEmptyPile(() => {})
              )}
            </div>
          </div>

          <div className="flex gap-1 sm:gap-2">
            {foundations.map((foundation, i) => (
              <div key={i} onClick={() => handleFoundationClick(i)}>
                {foundation.length > 0 ? (
                  renderCard(
                    foundation[foundation.length - 1],
                    () => handleCardClick("foundation", i, foundation.length - 1),
                    selectedCards?.source === "foundation" && selectedCards.index === i
                  )
                ) : (
                  <div className="w-12 h-16 sm:w-14 sm:h-20 rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <span className="text-lg text-muted-foreground/50">{getSuitSymbol(SUITS[i])}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 sm:gap-2 justify-center overflow-x-auto pb-2">
          {tableau.map((pile, pileIndex) => (
            <div key={pileIndex} className="flex flex-col min-w-[48px] sm:min-w-[56px]">
              {pile.length === 0 ? (
                <div onClick={() => handleEmptyPileClick(pileIndex)}>
                  {renderEmptyPile(() => handleEmptyPileClick(pileIndex))}
                </div>
              ) : (
                pile.map((card, cardIndex) => (
                  <div key={card.id} style={{ marginTop: cardIndex > 0 ? (card.faceUp ? "-48px" : "-56px") : 0 }}>
                    {renderCard(
                      card,
                      () => handleCardClick("tableau", pileIndex, cardIndex),
                      selectedCards?.source === "tableau" &&
                        selectedCards.index === pileIndex &&
                        cardIndex >= pile.length - selectedCards.cards.length,
                      0
                    )}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          <Button onClick={initializeGame} variant="outline">New Game</Button>
          <Button onClick={autoMoveToFoundation} variant="outline">Auto Move</Button>
        </div>
      </CardContent>
    </Card>
  )
}
