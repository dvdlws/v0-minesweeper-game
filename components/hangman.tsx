"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type WordLength = "short" | "medium" | "long"
type Guesses = "forgiving" | "normal" | "strict"

const GUESS_CONFIG: Record<Guesses, number> = {
  forgiving: 8,
  normal: 6,
  strict: 4
}

const ALL_WORDS: Record<string, string[]> = {
  "Animals": [
    // Short (3-5 letters)
    "cat", "dog", "bird", "fish", "frog", "bear", "lion", "wolf", "deer", "duck", "goat", "horse", "snake", "tiger", "zebra", "seal", "crab", "moth", "wasp", "ant", "bat", "bee", "cow", "eel", "elk", "fox", "hen", "owl", "pig", "rat",
    // Medium (6-8 letters)
    "penguin", "dolphin", "giraffe", "elephant", "kangaroo", "squirrel", "hamster", "parrot", "lobster", "buffalo", "panther", "leopard", "cheetah", "raccoon", "badger", "beaver", "otter", "falcon", "vulture", "pigeon", "peacock", "pelican", "gazelle", "antelope", "mongoose",
    // Long (9+ letters)
    "hippopotamus", "rhinoceros", "salamander", "chameleon", "porcupine", "armadillo", "wolverine", "alligator", "crocodile", "jellyfish", "tarantula", "orangutan", "chimpanzee", "chinchilla", "anteater", "albatross", "barracuda", "centipede", "dragonfly", "grasshopper", "hummingbird", "nightingale", "woodpecker", "caterpillar"
  ],
  "Countries": [
    // Short
    "peru", "cuba", "chad", "mali", "fiji", "iran", "iraq", "oman", "laos", "togo",
    // Medium
    "canada", "mexico", "brazil", "france", "germany", "sweden", "norway", "finland", "ireland", "poland", "ukraine", "austria", "belgium", "vietnam", "thailand", "malaysia", "morocco", "egypt", "kenya", "jamaica", "japan", "china", "india", "russia", "spain", "italy", "greece", "turkey", "israel", "chile",
    // Long
    "switzerland", "netherlands", "philippines", "indonesia", "argentina", "venezuela", "madagascar", "mozambique", "afghanistan", "azerbaijan", "bangladesh", "kazakhstan", "liechtenstein", "luxembourg", "zimbabwe", "cambodia", "mauritania", "botswana", "nicaragua", "guatemala"
  ],
  "Foods": [
    // Short
    "cake", "soup", "rice", "meat", "egg", "pear", "plum", "lime", "corn", "bean", "milk", "bread", "pizza", "taco", "wrap", "chip", "jam", "pie", "ham", "nut", "bun", "fig", "yam", "oat", "tea",
    // Medium
    "pancakes", "waffles", "lasagna", "burrito", "brownie", "avocado", "mushroom", "cucumber", "broccoli", "zucchini", "eggplant", "mango", "papaya", "honeydew", "raspberry", "macaroni", "ravioli", "pretzel", "biscuit", "muffin", "omelette", "sandwich", "noodles", "dumpling", "sausage",
    // Long
    "quesadilla", "guacamole", "prosciutto", "mozzarella", "artichoke", "asparagus", "cantaloupe", "watermelon", "blackberry", "strawberry", "cheesecake", "croissant", "cappuccino", "bruschetta", "fettuccine", "carbonara", "ratatouille", "chimichanga", "pumpernickel", "sourdough"
  ],
  "Objects": [
    // Short
    "book", "lamp", "desk", "door", "cup", "bowl", "fork", "bed", "rug", "vase", "box", "pen", "bag", "hat", "key", "map", "net", "pot", "toy", "fan", "jar", "lid", "mat", "mop", "pan",
    // Medium
    "computer", "umbrella", "keyboard", "backpack", "bookshelf", "wardrobe", "toaster", "scissors", "stapler", "envelope", "suitcase", "lunchbox", "lantern", "compass", "pendulum", "notebook", "calendar", "camera", "speaker", "charger", "monitor", "printer", "scanner", "lighter", "whistle",
    // Long
    "refrigerator", "dishwasher", "thermometer", "loudspeaker", "chandelier", "binoculars", "microscope", "calculator", "screwdriver", "wheelbarrow", "trampoline", "flashlight", "nightstand", "windshield", "skateboard"
  ],
  "Nature": [
    // Short
    "tree", "lake", "hill", "rock", "sand", "rain", "snow", "wind", "sun", "moon", "star", "leaf", "pond", "cave", "wave", "fog", "dew", "ice", "mud", "bush", "bay", "log", "oak", "sky", "elm",
    // Medium
    "mountain", "waterfall", "rainbow", "volcano", "glacier", "tornado", "blizzard", "monsoon", "drought", "meadow", "prairie", "tundra", "wetland", "canyon", "cavern", "geyser", "lagoon", "estuary", "plateau", "shoreline", "orchard", "desert", "forest", "island", "valley",
    // Long
    "avalanche", "earthquake", "hurricane", "thunderstorm", "archipelago", "peninsula", "rainforest", "atmosphere", "wildfire", "riverbank", "marshland", "coastline", "streambed", "watershed", "tributary"
  ],
  "Professions": [
    // Short
    "chef", "cook", "maid", "aide", "dean", "boss",
    // Medium
    "teacher", "doctor", "lawyer", "artist", "driver", "author", "farmer", "singer", "writer", "dancer", "tailor", "barber", "butler", "waiter", "banker", "broker", "sailor", "pilot", "nurse", "coach",
    // Long
    "anesthesiologist", "archaeologist", "administrator", "mathematician", "psychiatrist", "psychologist", "veterinarian", "chiropractor", "nutritionist", "radiologist", "dermatologist", "ophthalmologist", "cardiologist", "neurologist", "pediatrician", "pharmacist", "entrepreneur", "cinematographer", "choreographer", "meteorologist"
  ],
  "Music": [
    // Short
    "band", "song", "note", "beat", "drum", "harp", "bass", "jazz", "rock", "folk",
    // Medium
    "guitar", "violin", "trumpet", "clarinet", "trombone", "saxophone", "orchestra", "symphony", "melody", "harmony", "rhythm", "tempo", "chorus", "ballad", "reggae", "country", "gospel",
    // Long
    "xylophone", "tambourine", "synthesizer", "harpsichord", "accordion", "crescendo", "diminuendo", "fortissimo", "pianissimo", "percussion", "composition", "improvisation", "counterpoint", "harmonica", "metronome"
  ]
}

const getWordsByLength = (length: WordLength): Record<string, string[]> => {
  const result: Record<string, string[]> = {}
  const ranges = {
    short: { min: 3, max: 5 },
    medium: { min: 6, max: 8 },
    long: { min: 9, max: 100 }
  }
  const { min, max } = ranges[length]
  
  for (const [category, words] of Object.entries(ALL_WORDS)) {
    const filtered = words.filter(w => w.length >= min && w.length <= max)
    if (filtered.length > 0) {
      result[category] = filtered
    }
  }
  return result
}

export default function Hangman() {
  const [wordLength, setWordLength] = useState<WordLength>("medium")
  const [guesses, setGuesses] = useState<Guesses>("normal")
  const [word, setWord] = useState("")
  const [category, setCategory] = useState("")
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [streak, setStreak] = useState(0)

  const maxWrong = GUESS_CONFIG[guesses]

  const initGame = useCallback((newWordLength?: WordLength) => {
    const length = newWordLength || wordLength
    const wordPool = getWordsByLength(length)
    const categories = Object.keys(wordPool)
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const categoryWords = wordPool[randomCategory]
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)]
    
    setWord(randomWord.toUpperCase())
    setCategory(randomCategory)
    setGuessedLetters(new Set())
    setWrongGuesses(0)
    setGameStatus("playing")
  }, [wordLength])

  useEffect(() => {
    initGame()
  }, [])

  const handleWordLengthChange = (newLength: WordLength) => {
    setWordLength(newLength)
    initGame(newLength)
  }

  const handleGuessesChange = (newGuesses: Guesses) => {
    setGuesses(newGuesses)
    // Don't restart game, just change difficulty
  }

  useEffect(() => {
    if (!word || gameStatus !== "playing") return

    const wordLetters = new Set(word.split(""))
    const allLettersGuessed = [...wordLetters].every(letter => guessedLetters.has(letter))
    
    if (allLettersGuessed) {
      setGameStatus("won")
      setWins(w => w + 1)
      setStreak(s => s + 1)
    } else if (wrongGuesses >= maxWrong) {
      setGameStatus("lost")
      setLosses(l => l + 1)
      setStreak(0)
    }
  }, [word, guessedLetters, wrongGuesses, gameStatus, maxWrong])

  const handleGuess = useCallback((letter: string) => {
    if (gameStatus !== "playing" || guessedLetters.has(letter)) return

    const newGuessedLetters = new Set(guessedLetters)
    newGuessedLetters.add(letter)
    setGuessedLetters(newGuessedLetters)

    if (!word.includes(letter)) {
      setWrongGuesses(w => w + 1)
    }
  }, [gameStatus, guessedLetters, word])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== "playing") return
      const key = e.key.toUpperCase()
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameStatus, handleGuess])

  const renderWord = () => {
    return word.split("").map((letter, index) => (
      <span
        key={index}
        className="inline-flex items-center justify-center w-6 h-8 sm:w-8 sm:h-10 border-b-4 border-foreground mx-0.5 sm:mx-1 text-xl sm:text-2xl font-bold"
      >
        {guessedLetters.has(letter) || gameStatus === "lost" ? (
          <span className={!guessedLetters.has(letter) && gameStatus === "lost" ? "text-destructive" : ""}>
            {letter}
          </span>
        ) : (
          ""
        )}
      </span>
    ))
  }

  const renderHangman = () => {
    const partsToShow = Math.ceil((wrongGuesses / maxWrong) * 6)
    
    return (
      <svg viewBox="0 0 200 250" className="w-32 h-40 sm:w-40 sm:h-48">
        <line x1="20" y1="230" x2="100" y2="230" stroke="currentColor" strokeWidth="4" />
        <line x1="60" y1="230" x2="60" y2="20" stroke="currentColor" strokeWidth="4" />
        <line x1="60" y1="20" x2="140" y2="20" stroke="currentColor" strokeWidth="4" />
        <line x1="140" y1="20" x2="140" y2="50" stroke="currentColor" strokeWidth="4" />
        
        {partsToShow >= 1 && <circle cx="140" cy="70" r="20" stroke="currentColor" strokeWidth="4" fill="none" />}
        {partsToShow >= 2 && <line x1="140" y1="90" x2="140" y2="150" stroke="currentColor" strokeWidth="4" />}
        {partsToShow >= 3 && <line x1="140" y1="110" x2="110" y2="130" stroke="currentColor" strokeWidth="4" />}
        {partsToShow >= 4 && <line x1="140" y1="110" x2="170" y2="130" stroke="currentColor" strokeWidth="4" />}
        {partsToShow >= 5 && <line x1="140" y1="150" x2="110" y2="190" stroke="currentColor" strokeWidth="4" />}
        {partsToShow >= 6 && <line x1="140" y1="150" x2="170" y2="190" stroke="currentColor" strokeWidth="4" />}
      </svg>
    )
  }

  const renderKeyboard = () => {
    const rows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"]
    ]

    return (
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map(letter => {
              const isGuessed = guessedLetters.has(letter)
              const isCorrect = isGuessed && word.includes(letter)
              const isWrong = isGuessed && !word.includes(letter)
              
              return (
                <Button
                  key={letter}
                  onClick={() => handleGuess(letter)}
                  disabled={isGuessed || gameStatus !== "playing"}
                  variant={isCorrect ? "default" : isWrong ? "destructive" : "outline"}
                  className={`w-7 h-9 sm:w-9 sm:h-11 p-0 text-sm sm:text-base font-semibold ${
                    isCorrect ? "bg-green-600 hover:bg-green-600" : ""
                  }`}
                >
                  {letter}
                </Button>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1 text-center">Word Length</p>
            <div className="flex justify-center gap-2">
              {(["short", "medium", "long"] as WordLength[]).map((length) => (
                <Button
                  key={length}
                  variant={wordLength === length ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleWordLengthChange(length)}
                  className="capitalize text-xs"
                >
                  {length === "short" ? "Short (3-5)" : length === "medium" ? "Medium (6-8)" : "Long (9+)"}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 text-center">Allowed Guesses</p>
            <div className="flex justify-center gap-2">
              {(["forgiving", "normal", "strict"] as Guesses[]).map((g) => (
                <Button
                  key={g}
                  variant={guesses === g ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGuessesChange(g)}
                  className="capitalize text-xs"
                >
                  {g === "forgiving" ? "8 guesses" : g === "normal" ? "6 guesses" : "4 guesses"}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">
            <span className="text-green-600 font-semibold">Wins: {wins}</span>
            <span className="mx-2">|</span>
            <span className="text-red-600 font-semibold">Losses: {losses}</span>
          </div>
          <div className="text-sm font-semibold">
            Streak: {streak}
          </div>
        </div>

        <div className="text-center mb-4">
          <span className="text-sm text-muted-foreground">Category:</span>
          <span className="ml-2 font-semibold">{category}</span>
        </div>

        <div className="flex justify-center mb-4">
          {renderHangman()}
        </div>

        <div className="text-center mb-2">
          <span className="text-sm text-muted-foreground">
            Wrong guesses: {wrongGuesses} / {maxWrong}
          </span>
        </div>

        <div className="flex justify-center flex-wrap mb-6">
          {renderWord()}
        </div>

        {gameStatus === "playing" ? (
          renderKeyboard()
        ) : (
          <div className="text-center">
            <p className={`text-2xl font-bold mb-4 ${gameStatus === "won" ? "text-green-600" : "text-red-600"}`}>
              {gameStatus === "won" ? "You Won!" : "Game Over!"}
            </p>
            {gameStatus === "lost" && (
              <p className="text-muted-foreground mb-4">
                The word was: <span className="font-bold">{word}</span>
              </p>
            )}
            <Button onClick={() => initGame()} size="lg">
              Play Again
            </Button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Type letters on your keyboard or click the buttons to guess
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
