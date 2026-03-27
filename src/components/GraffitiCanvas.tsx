import { useRef, useState, useCallback, useEffect } from "react";
import { Eraser, Download, Trash2, Minus, Plus, Type, MousePointer2 } from "lucide-react";

const COLORS = [
  "hsl(350, 80%, 50%)",
  "hsl(220, 80%, 50%)",
  "hsl(150, 70%, 40%)",
  "hsl(50, 90%, 50%)",
  "hsl(330, 80%, 55%)",
  "hsl(275, 70%, 50%)",
  "hsl(25, 90%, 52%)",
  "hsl(185, 75%, 45%)",
  "hsl(0, 0%, 15%)",
  "hsl(0, 0%, 100%)",
];

const FONTS = [
  { name: "Graffiti", value: "Permanent Marker, cursive" },
  { name: "Spray", value: "Rubik Spray Paint, cursive" },
  { name: "Hand", value: "Patrick Hand, cursive" },
  { name: "Bold", value: "Impact, sans-serif" },
];

const FONT_SIZES = [24, 36, 48, 64, 80];

type Tool = "draw" | "eraser" | "text";

const GraffitiCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(8);
  const [tool, setTool] = useState<Tool>("draw");
  const [font, setFont] = useState(FONTS[0]);
  const [fontSize, setFontSize] = useState(48);
  const [textInput, setTextInput] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [textPos, setTextPos] = useState<{ x: number; y: number } | null>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const WALL_COLOR = "hsl(35, 20%, 78%)";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.putImageData(data, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (showTextInput && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [showTextInput]);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDraw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (tool === "text") {
        const pos = getPos(e);
        setTextPos(pos);
        setShowTextInput(true);
        setTextInput("");
        return;
      }
      setIsDrawing(true);
      lastPos.current = getPos(e);
    },
    [getPos, tool]
  );

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing || !canvasRef.current || tool === "text") return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx || !lastPos.current) return;

      const pos = getPos(e);

      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = tool === "eraser" ? WALL_COLOR : color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (tool !== "eraser") {
        ctx.shadowBlur = brushSize * 0.4;
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
      lastPos.current = pos;
    },
    [isDrawing, color, brushSize, tool, getPos, WALL_COLOR]
  );

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
    lastPos.current = null;
  }, []);

  const placeText = useCallback(() => {
    if (!textInput.trim() || !textPos || !canvasRef.current) {
      setShowTextInput(false);
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.font = `${fontSize}px ${font.value}`;
    ctx.fillStyle = color;
    ctx.shadowBlur = fontSize * 0.15;
    ctx.shadowColor = "hsl(0, 0%, 0%)";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(textInput, textPos.x, textPos.y);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    setShowTextInput(false);
    setTextInput("");
  }, [textInput, textPos, color, fontSize, font]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "graffiti-art.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 splatter-border bg-card p-2 sm:p-3 paint-shadow">
        {/* Colors */}
        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                if (tool === "eraser") setTool("draw");
              }}
              className={`h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c && tool !== "eraser"
                  ? "border-foreground scale-125 ring-2 ring-foreground/20"
                  : "border-foreground/10"
              }`}
              style={{
                backgroundColor: c,
                boxShadow: c === "hsl(0, 0%, 100%)" ? "inset 0 0 0 1px hsl(0,0%,80%)" : undefined,
              }}
            />
          ))}
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Tool toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTool("draw")}
            className={`rounded p-1.5 transition-colors ${
              tool === "draw"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-border"
            }`}
            title="Draw"
          >
            <MousePointer2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTool("text")}
            className={`rounded p-1.5 transition-colors ${
              tool === "text"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-border"
            }`}
            title="Text tool"
          >
            <Type className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`rounded p-1.5 transition-colors ${
              tool === "eraser"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-border"
            }`}
            title="Eraser"
          >
            <Eraser className="h-4 w-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Brush / Font size */}
        {tool === "text" ? (
          <div className="flex items-center gap-1">
            <select
              value={font.name}
              onChange={(e) => setFont(FONTS.find((f) => f.name === e.target.value) || FONTS[0])}
              className="rounded bg-muted px-2 py-1 font-hand text-xs text-foreground border border-border"
            >
              {FONTS.map((f) => (
                <option key={f.name} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="rounded bg-muted px-2 py-1 font-hand text-xs text-foreground border border-border"
            >
              {FONT_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}px
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setBrushSize(Math.max(2, brushSize - 2))}
              className="rounded bg-muted p-1 text-foreground hover:bg-border"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-hand text-sm text-muted-foreground">
              {brushSize}px
            </span>
            <button
              onClick={() => setBrushSize(Math.min(40, brushSize + 2))}
              className="rounded bg-muted p-1 text-foreground hover:bg-border"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="h-6 w-px bg-border" />

        {/* Actions */}
        <button
          onClick={clearCanvas}
          className="rounded bg-muted p-1.5 text-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
          title="Clear wall"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          onClick={saveCanvas}
          className="rounded bg-secondary p-1.5 text-secondary-foreground transition-opacity hover:opacity-80"
          title="Save art"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-sm paint-shadow" style={{ border: "3px solid hsl(35, 15%, 70%)" }}>
        <canvas
          ref={canvasRef}
          className="h-[420px] w-full touch-none"
          style={{
            backgroundColor: WALL_COLOR,
            cursor: tool === "text" ? "text" : "crosshair",
          }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />

        {/* Floating text input */}
        {showTextInput && textPos && (
          <div
            className="absolute"
            style={{ left: textPos.x, top: textPos.y - fontSize }}
          >
            <input
              ref={textInputRef}
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") placeText();
                if (e.key === "Escape") setShowTextInput(false);
              }}
              onBlur={placeText}
              placeholder="Type your tag..."
              className="border-b-2 border-primary bg-transparent px-1 font-graffiti text-foreground outline-none"
              style={{
                fontFamily: font.value,
                fontSize: `${fontSize * 0.6}px`,
                color: color,
                minWidth: "120px",
              }}
            />
          </div>
        )}

        <div className="pointer-events-none absolute bottom-3 right-3 font-spray text-sm text-foreground/10">
          {tool === "text" ? "CLICK TO TAG" : "SPRAY HERE"}
        </div>
      </div>
    </div>
  );
};

export default GraffitiCanvas;
