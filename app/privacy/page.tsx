import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Privacy Policy - Minesweeper Online",
  description: "Privacy policy for Minesweeper Online, including information about cookies, ads, and data collection.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost">← Back to Game</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              Welcome to Minesweeper Online (classicminesweeper.com). We respect your privacy and are committed to
              protecting your personal data. This privacy policy explains how we collect, use, and protect your
              information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="mb-4">When you visit our website, we may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Automatically Collected Information:</strong> We collect information about your device, browser
                type, IP address, and how you interact with our website through cookies and similar technologies.
              </li>
              <li>
                <strong>Game Data:</strong> Your game scores and preferences are stored locally in your browser and are
                not transmitted to our servers.
              </li>
              <li>
                <strong>Analytics Data:</strong> We use Vercel Analytics to understand how visitors use our site,
                including page views and user interactions.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to improve your experience on our website. Cookies are
              small text files stored on your device that help us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your game preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Deliver personalized advertisements through Google AdSense</li>
            </ul>
            <p className="mt-4">
              You can control cookies through your browser settings. However, disabling cookies may affect the
              functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">Google AdSense</h3>
            <p className="mb-4">
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and similar
              technologies to serve ads based on your prior visits to our website or other websites. Google's use of
              advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other
              sites on the Internet.
            </p>
            <p className="mb-4">
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Google Ads Settings
              </a>
              . Alternatively, you can opt out of third-party vendor's use of cookies for personalized advertising by
              visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                www.aboutads.info
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">Vercel Analytics</h3>
            <p>
              We use Vercel Analytics to collect anonymous usage statistics to help us improve our website. Vercel
              Analytics does not use cookies and does not collect personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our game service</li>
              <li>Improve and optimize our website performance</li>
              <li>Understand how users interact with our website</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Detect and prevent technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Storage and Security</h2>
            <p>
              Your game data (scores, preferences) is stored locally in your browser using localStorage and is not
              transmitted to our servers. We implement reasonable security measures to protect the information we
              collect, but no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p>
              Our website is intended for general audiences and does not knowingly collect personal information from
              children under 13 years of age. If you believe we have collected information from a child under 13, please
              contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of personalized advertising</li>
              <li>Control cookies through your browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page with an
              updated revision date. We encourage you to review this privacy policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us through
              our website.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Minesweeper Online - Free Classic Puzzle Game</p>
        </div>
      </footer>
    </div>
  )
}
