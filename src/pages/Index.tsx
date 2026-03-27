import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";
import GraffitiCanvas from "@/components/GraffitiCanvas";
import DexScreenerEmbed from "@/components/DexScreenerEmbed";
import bannerImg from "@/assets/banner.png";
import pfpImg from "@/assets/pfp.png";

const CONTRACT = "3dEogRBU7uxY9AMxXq55pbVrmjBxX2VGKeMGjUCApump";

const Index = () => {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen wall-bg">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 border-b-2 border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={pfpImg}
              alt="Graffitification"
              className="h-9 w-9 rounded-full border-2 border-primary object-cover"
            />
            <span className="font-spray text-2xl text-foreground">$GRAFFITI</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/i/communities/2035698120374526352"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border-2 border-foreground/10 px-3 py-1.5 font-hand text-sm text-foreground transition-colors hover:bg-muted"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="hidden sm:inline">Community</span>
            </a>
            <a
              href={`https://dexscreener.com/solana/${CONTRACT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 font-graffiti text-sm text-primary-foreground transition-opacity hover:opacity-85"
            >
              BUY <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="relative overflow-hidden">
        <img
          src={bannerImg}
          alt="Graffitification Banner"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </section>

      {/* Hero */}
      <section className="container mx-auto px-4 -mt-8 relative z-10 pb-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-spray text-6xl text-spray-gradient drip-text md:text-8xl lg:text-9xl leading-tight">
            GRAFFITIFICATION
          </h1>
          <p className="mt-3 font-hand text-xl text-muted-foreground md:text-2xl">
            The OG street art memecoin — spray your mark on Solana 🎨
          </p>
        </motion.div>

        {/* CA */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-lg"
        >
          <button
            onClick={copyCA}
            className="group flex w-full items-center justify-between gap-2 splatter-border bg-card px-4 py-3 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted paint-shadow sm:text-sm"
          >
            <span className="truncate">{CONTRACT}</span>
            {copied ? (
              <Check className="h-4 w-4 shrink-0 text-secondary" />
            ) : (
              <Copy className="h-4 w-4 shrink-0 text-foreground group-hover:text-primary" />
            )}
          </button>
          <p className="mt-1 text-center font-hand text-xs text-muted-foreground">
            {copied ? "Copied! 🎉" : "Click to copy CA"}
          </p>
        </motion.div>
      </section>

      {/* Drawing Board */}
      <section className="container mx-auto px-4 pb-14">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="text-3xl">🧱</span>
            <h2 className="font-spray text-4xl text-foreground md:text-5xl">
              TAG THE WALL
            </h2>
          </div>
          <GraffitiCanvas />
        </motion.div>
      </section>

      {/* Chart */}
      <section className="container mx-auto px-4 pb-14">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="text-3xl">📈</span>
            <h2 className="font-spray text-4xl text-foreground md:text-5xl">
              CHART
            </h2>
          </div>
          <div className="paint-shadow rounded-lg overflow-hidden">
            <DexScreenerEmbed />
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section className="container mx-auto px-4 pb-14">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="splatter-border bg-card p-8 paint-shadow"
        >
          <h2 className="mb-4 font-spray text-4xl text-spray-gradient md:text-5xl">
            WTF IS $GRAFFITI?
          </h2>
          <div className="space-y-3 font-hand text-lg text-muted-foreground md:text-xl">
            <p>
              <span className="font-graffiti text-primary">$GRAFFITI</span> aka{" "}
              <span className="font-graffiti text-spray-purple">Graffitification</span> — an
              OG memecoin built for the culture.
            </p>
            <p>
              Street art meets blockchain. Grab a can, spray your tag, and leave
              your mark forever. This is the people's wall. 🧱✨
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground/10 bg-card/50 py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4">
          <img
            src={pfpImg}
            alt=""
            className="h-10 w-10 rounded-full border-2 border-primary object-cover"
          />
          <p className="font-spray text-xl text-spray-gradient">$GRAFFITI</p>
          <p className="font-hand text-sm text-muted-foreground">
            © 2026 Graffitification — Spray responsibly 🎨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
