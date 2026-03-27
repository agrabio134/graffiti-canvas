const DexScreenerEmbed = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border-2 border-border" style={{ paddingBottom: "65%" }}>
      <iframe
        src="https://dexscreener.com/solana/Hf1tPMMJ8rJMtWqHJzKthhYJPms6d8U8wsShhsz3QP3d?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=5"
        className="absolute inset-0 h-full w-full border-0"
        title="DexScreener Chart"
      />
    </div>
  );
};

export default DexScreenerEmbed;
