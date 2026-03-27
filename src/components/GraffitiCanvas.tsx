import { useRef, useState, useCallback, useEffect } from "react";
import { Eraser, Download, Trash2, Minus, Plus } from "lucide-react";

const COLORS = [
  "hsl(350, 85%, 55%)",
  "hsl(210, 90%, 55%)",
  "hsl(140, 75%, 50%)",
  "hsl(45, 95%, 55%)",
  "hsl(330, 85%, 60%)",
  "hsl(280, 75%, 55%)",
  "hsl(25, 95%, 55%)",
  "hsl(0, 0%, 100%)",
  "hsl(0, 0%, 0%)",
];

const GraffitiCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

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
      ctx.strokeStyle = isEraser ? "hsl(0, 0%, 8%)" : color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (!isEraser) {
        ctx.shadowBlur = brushSize * 0.5;
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
      lastPos.current = pos;
    },
    [isDrawing, color, brushSize, isEraser, getPos]
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
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3">
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
                color === c && !isEraser ? "border-foreground scale-125" : "border-muted"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Brush size */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setBrushSize(Math.max(2, brushSize - 2))}
            className="rounded bg-muted p-1 text-foreground hover:bg-border"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm text-muted-foreground font-hand">
            {brushSize}
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
            isEraser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"
          }`}
        >
          <Eraser className="h-4 w-4" />
        </button>
        <button
          onClick={clearCanvas}
          className="rounded bg-muted p-1.5 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          onClick={saveCanvas}
          className="rounded bg-secondary p-1.5 text-secondary-foreground hover:opacity-80 transition-opacity"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-lg border-2 border-border">
        <canvas
          ref={canvasRef}
          className="h-[400px] w-full cursor-crosshair touch-none"
          style={{ backgroundColor: "hsl(0, 0%, 8%)" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        {/* Corner graffiti marks */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-2 top-2 font-graffiti text-xs text-muted-foreground/30">
            TAG HERE →
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraffitiCanvas;
