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
    <div className="min-h-screen brick-bg">
      {/* Banner */}
      <div className="relative w-full overflow-hidden">
        <img
          src={bannerImg}
          alt="Graffitification Banner"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Nav overlapping banner bottom */}
      <header className="relative -mt-16 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between rounded-2xl border border-border bg-card/80 backdrop-blur-xl px-5 py-3 card-glow">
            <div className="flex items-center gap-3">
              <img
                src={pfpImg}
                alt="Graffitification"
                className="h-10 w-10 rounded-full border-2 border-primary object-cover"
              />
              <span className="font-graffiti text-xl text-spray">$GRAFFITI</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/i/communities/2035698120374526352"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 font-hand text-sm text-foreground transition-colors hover:bg-border"
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
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-graffiti text-sm text-primary-foreground transition-opacity hover:opacity-80"
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
          <h1 className="font-graffiti text-5xl text-graffiti-title drip-shadow md:text-7xl lg:text-8xl tracking-wider">
            GRAFFITIFICATION
          </h1>
          <p className="mt-4 font-hand text-xl text-muted-foreground md:text-2xl">
            OG project from the <span className="text-accent font-graffiti">$CHIBI</span> dev — spray your mark on Solana 🌃
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
            className="group flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-card/60 backdrop-blur-sm px-4 py-3 font-mono text-xs text-muted-foreground transition-all hover:border-primary hover:card-glow sm:text-sm"
          >
            <span className="truncate">{CONTRACT}</span>
            {copied ? (
              <Check className="h-4 w-4 shrink-0 text-secondary" />
            ) : (
              <Copy className="h-4 w-4 shrink-0 text-foreground group-hover:text-primary" />
            )}
          </button>
          <p className="mt-1.5 font-hand text-xs text-muted-foreground">
            Click to copy CA
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
          <h2 className="mb-6 font-graffiti text-3xl text-foreground neon-glow-cyan md:text-4xl">
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
          className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-8 card-glow"
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
              Grab a can, spray your tag, and leave your mark on the blockchain. 🌃🎨
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <img src={pfpImg} alt="" className="mx-auto mb-3 h-12 w-12 rounded-full border border-primary object-cover" />
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
