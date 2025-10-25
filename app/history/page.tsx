"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function History() {
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
        <h1 className="text-4xl font-bold mb-6">The History of Minesweeper</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Origins and Early Development</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Minesweeper's origins trace back to the 1960s and 1970s, when early mainframe computer games explored
            similar mine-detection concepts. However, the game as we know it today was created in the early 1980s.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            The first documented version of Minesweeper was written by Robert Donner in 1989. Donner, who was working at
            Microsoft at the time, created the game as a way to learn Windows programming. His version was included in
            the Microsoft Entertainment Pack in 1990.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">The Microsoft Windows Era</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Minesweeper achieved worldwide fame when Microsoft included it as a standard game in Windows 3.1 in 1992.
            This decision transformed Minesweeper from an obscure puzzle game into a global phenomenon, introducing
            millions of people to the addictive gameplay.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            The game was designed to help users become comfortable with mouse operations, particularly left-clicking and
            right-clicking. Its simple interface and challenging gameplay made it perfect for teaching these fundamental
            computer skills while providing entertainment during work breaks.
          </p>
          <div className="bg-muted p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-3">Windows Versions Timeline</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>1990:</strong> Microsoft Entertainment Pack 1
              </li>
              <li>
                <strong>1992:</strong> Windows 3.1 (first bundled version)
              </li>
              <li>
                <strong>1995:</strong> Windows 95 (updated graphics)
              </li>
              <li>
                <strong>2001:</strong> Windows XP (refined interface)
              </li>
              <li>
                <strong>2012:</strong> Windows 8 (removed from default installation)
              </li>
              <li>
                <strong>2012:</strong> Microsoft Minesweeper (modern remake for Windows 8/10)
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cultural Impact</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Minesweeper became more than just a game - it became a cultural icon of the personal computer era. Office
            workers worldwide spent countless hours playing Minesweeper, often disguising it as "work" due to its
            simple, spreadsheet-like appearance.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            The game's popularity led to the development of competitive Minesweeper communities, with players competing
            for world records in solving speed. International Minesweeper competitions emerged, with players achieving
            solve times under 1 second for beginner boards and under 40 seconds for expert boards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Game Design and Logic</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Minesweeper is based on mathematical logic and probability theory. Each number provides information about
            the surrounding cells, creating a constraint satisfaction problem that players must solve through deduction.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            The game's elegant design lies in its simplicity - just two actions (reveal and flag) combined with
            numerical clues create an infinitely replayable puzzle. This minimalist approach influenced countless puzzle
            games that followed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Variations and Adaptations</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Over the decades, Minesweeper has inspired numerous variations and adaptations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>
              <strong>3D Minesweeper:</strong> Extending the gameplay into three dimensions
            </li>
            <li>
              <strong>Hexagonal Minesweeper:</strong> Using hexagonal grids instead of squares
            </li>
            <li>
              <strong>Multiplayer Minesweeper:</strong> Competitive and cooperative versions
            </li>
            <li>
              <strong>Themed Versions:</strong> Different graphics and themes while maintaining core gameplay
            </li>
            <li>
              <strong>Mobile Adaptations:</strong> Touch-optimized versions for smartphones and tablets
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">World Records and Competitive Play</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Competitive Minesweeper has developed its own community and record-keeping systems. The Authoritative
            Minesweeper website tracks world records across different board sizes and rule variations.
          </p>
          <div className="bg-muted p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-3">Approximate World Record Times</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>Beginner (9×9, 10 mines):</strong> Under 1 second
              </li>
              <li>
                <strong>Intermediate (16×16, 40 mines):</strong> Around 8-10 seconds
              </li>
              <li>
                <strong>Expert (30×16, 99 mines):</strong> Around 30-40 seconds
              </li>
            </ul>
            <p className="text-sm mt-4 italic">
              Note: Records are constantly being broken as players develop new techniques and strategies.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Modern Era and Online Play</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            With the rise of web browsers and mobile devices, Minesweeper has found new life online. Countless web-based
            versions allow players to enjoy the game without installing software, while mobile apps bring Minesweeper to
            smartphones and tablets.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Modern versions often include features like daily challenges, leaderboards, achievements, and social
            sharing, adding new dimensions to the classic gameplay while preserving what made the original so
            compelling.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Educational Value</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Beyond entertainment, Minesweeper has proven educational value. The game teaches:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Logical reasoning and deductive thinking</li>
            <li>Pattern recognition skills</li>
            <li>Probability and risk assessment</li>
            <li>Spatial reasoning and visualization</li>
            <li>Patience and methodical problem-solving</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Legacy and Influence</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Minesweeper's influence extends far beyond its own gameplay. It demonstrated that simple, elegant game
            design could create deeply engaging experiences. The game's success inspired developers to create other
            logic-based puzzle games and proved that casual gaming could appeal to a massive audience.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-4">
            Today, more than three decades after its creation, Minesweeper remains popular worldwide. Its timeless
            gameplay continues to challenge and entertain new generations of players, cementing its place as one of the
            most iconic computer games ever created.
          </p>
        </section>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Be Part of Minesweeper History</h2>
          <p className="text-muted-foreground mb-4">
            Join millions of players worldwide who have enjoyed this classic puzzle game. Whether you're a nostalgic
            veteran or discovering Minesweeper for the first time, the challenge awaits!
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Play Minesweeper
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
