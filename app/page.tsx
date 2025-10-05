import Minesweeper from "@/components/minesweeper"
import AdsenseAd from "@/components/adsense-ad"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <header className="text-center max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-3 text-balance">Play Minesweeper Online Free</h1>
      </header>

      <div className="w-full max-w-4xl flex justify-center">
        <div className="hidden md:block">
          <AdsenseAd adSlot="5750387915" />
        </div>
        <div className="block md:hidden">
          <AdsenseAd adSlot="5750387915" />
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="hidden lg:block sticky top-4">
          <AdsenseAd adSlot="5567497039" />
        </div>

        <main>
          <Minesweeper />
        </main>

        <div className="hidden lg:block sticky top-4">
          <AdsenseAd adSlot="5567497039" />
        </div>
      </div>

      <div className="block lg:hidden">
        <AdsenseAd adSlot="5567497039" />
      </div>

      <article className="max-w-3xl px-4 mt-8 space-y-6 text-center">
        <section>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Challenge yourself with the classic Minesweeper puzzle game. Click to reveal cells, flag potential mines,
            and clear the board without detonating any bombs. Choose from three difficulty levels and compete for the
            highest score!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">How to Play Minesweeper</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>
              <strong>Left Click:</strong> Reveal a cell. If it contains a mine, you lose! Numbers indicate how many
              mines are adjacent to that cell.
            </p>
            <p>
              <strong>Right Click:</strong> Place or remove a flag to mark potential mine locations. Use flags
              strategically to track dangerous cells.
            </p>
            <p>
              <strong>Goal:</strong> Reveal all cells that don't contain mines. Win by clearing the entire board safely!
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Scoring System</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>
              Earn <strong>2 points</strong> for each cell you click that doesn't contain a mine.
            </p>
            <p>
              Earn <strong>1 point</strong> for each cell that auto-reveals when you click an empty cell.
            </p>
            <p>
              At game end, earn <strong>5 points</strong> for each correctly placed flag and lose{" "}
              <strong>10 points</strong> for each incorrectly placed flag.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Difficulty Levels</h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>
              <strong>Easy:</strong> 16×16 grid with 40 mines - Perfect for beginners learning Minesweeper strategy.
            </p>
            <p>
              <strong>Medium:</strong> 16×16 grid with 60 mines - Balanced challenge for intermediate players.
            </p>
            <p>
              <strong>Hard:</strong> 16×16 grid with 80 mines - Expert level difficulty for Minesweeper veterans.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">About Minesweeper</h2>
          <p className="text-muted-foreground leading-relaxed">
            Minesweeper is a classic logic puzzle game that has entertained millions since its introduction in the
            1960s. Made famous by Microsoft Windows, this timeless brain teaser challenges players to use deductive
            reasoning and strategic thinking. Our free online version brings the nostalgic gameplay to your browser with
            a modern interface, scoring system, and multiple difficulty levels. Whether you're a Minesweeper expert or
            trying it for the first time, enjoy this addictive puzzle game anytime, anywhere!
          </p>
        </section>
      </article>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2025 Minesweeper Online - Free Classic Puzzle Game</p>
      </footer>
    </div>
  )
}
