import { useRef, useState, useCallback, useEffect } from "react";
import { Eraser, Download, Trash2, Minus, Plus } from "lucide-react";

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
];

const GraffitiCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

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
      setIsDrawing(true);
      lastPos.current = getPos(e);
    },
    [getPos]
  );

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx || !lastPos.current) return;

      const pos = getPos(e);

      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = isEraser ? WALL_COLOR : color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (!isEraser) {
        ctx.shadowBlur = brushSize * 0.4;
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
      lastPos.current = pos;
    },
    [isDrawing, color, brushSize, isEraser, getPos, WALL_COLOR]
  );

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
    lastPos.current = null;
  }, []);

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
      <div className="flex flex-wrap items-center gap-3 splatter-border bg-card p-3 paint-shadow">
        {/* Colors */}
        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setIsEraser(false);
              }}
              className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c && !isEraser
                  ? "border-foreground scale-125 ring-2 ring-foreground/20"
                  : "border-foreground/10"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Brush size */}
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

        <div className="h-6 w-px bg-border" />

        {/* Tools */}
        <button
          onClick={() => setIsEraser(!isEraser)}
          className={`rounded p-1.5 transition-colors ${
            isEraser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground hover:bg-border"
          }`}
          title="Eraser"
        >
          <Eraser className="h-4 w-4" />
        </button>
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

      {/* Canvas - concrete wall look */}
      <div className="relative overflow-hidden rounded-sm paint-shadow" style={{ border: "3px solid hsl(35, 15%, 70%)" }}>
        <canvas
          ref={canvasRef}
          className="h-[420px] w-full cursor-crosshair touch-none"
          style={{ backgroundColor: WALL_COLOR }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        <div className="pointer-events-none absolute bottom-3 right-3 font-spray text-sm text-foreground/10">
          SPRAY HERE
        </div>
      </div>
    </div>
  );
};

export default GraffitiCanvas;
