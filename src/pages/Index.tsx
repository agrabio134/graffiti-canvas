import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";
import GraffitiCanvas from "@/components/GraffitiCanvas";
import DexScreenerEmbed from "@/components/DexScreenerEmbed";

const CONTRACT = "3dEogRBU7uxY9AMxXq55pbVrmjBxX2VGKeMGjUCApump";

const Index = () => {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen brick-bg">
      {/* Header */}
      <header className="relative overflow-hidden border-b-2 border-border">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="font-graffiti text-2xl text-spray"
            >
              $GRAFFITI
            </motion.h2>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/i/communities/2035698120374526352"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-card px-3 py-2 font-hand text-sm text-foreground transition-colors hover:bg-muted"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Community
              </a>
              <a
                href={`https://dexscreener.com/solana/${CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-hand text-sm text-primary-foreground transition-opacity hover:opacity-80"
              >
                Buy <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-graffiti text-6xl text-spray drip-shadow md:text-8xl lg:text-9xl">
            GRAFFITIFICATION
          </h1>
          <p className="mt-4 font-hand text-xl text-muted-foreground md:text-2xl">
            OG project from the <span className="text-accent">$CHIBI</span> dev — spray your mark on Solana
          </p>
        </motion.div>

        {/* Contract Address */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-xl"
        >
          <button
            onClick={copyCA}
            className="group flex w-full items-center justify-between gap-2 rounded-lg border-2 border-border bg-card px-4 py-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary sm:text-sm"
          >
            <span className="truncate">{CONTRACT}</span>
            {copied ? (
              <Check className="h-4 w-4 shrink-0 text-secondary" />
            ) : (
              <Copy className="h-4 w-4 shrink-0 text-foreground group-hover:text-primary" />
            )}
          </button>
          <p className="mt-1 font-hand text-xs text-muted-foreground">
            Click to copy contract address
          </p>
        </motion.div>
      </section>

      {/* Drawing Board */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-6 font-graffiti text-3xl text-foreground neon-glow md:text-4xl">
            🎨 TAG THE WALL
          </h2>
          <GraffitiCanvas />
        </motion.div>
      </section>

      {/* Chart */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="mb-6 font-graffiti text-3xl text-foreground neon-glow md:text-4xl">
            📈 CHART
          </h2>
          <DexScreenerEmbed />
        </motion.div>
      </section>

      {/* About */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="rounded-lg border-2 border-border bg-card p-8"
        >
          <h2 className="mb-4 font-graffiti text-3xl text-spray md:text-4xl">
            WTF IS $GRAFFITI?
          </h2>
          <div className="space-y-4 font-hand text-lg text-muted-foreground md:text-xl">
            <p>
              <span className="text-accent font-graffiti">$GRAFFITI</span> aka{" "}
              <span className="text-primary font-graffiti">Graffitification</span> is one of
              the OG projects from the legendary{" "}
              <span className="text-secondary">$CHIBI dev</span>.
            </p>
            <p>
              This ain't your regular memecoin — this is street art meets crypto.
              Grab a can, spray your tag, and leave your mark on the blockchain.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-graffiti text-lg text-spray">$GRAFFITI</p>
          <p className="mt-2 font-hand text-sm text-muted-foreground">
            © 2025 Graffitification — Spray responsibly 🎨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
