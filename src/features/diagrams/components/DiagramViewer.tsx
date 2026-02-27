import { useState, useRef, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
} from "lucide-react";

interface DiagramViewerProps {
  diagrams: string[];
  className?: string;
}

const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

/**
 * Sanitize Mermaid code from API: fix common malformed edge labels.
 * e.g. -->|label|> B[...] (invalid TAGEND) -> -->|label| B[...] (valid)
 */
function sanitizeMermaidCode(code: string): string {
  const sanitized = code
    .trim()
    // If the API returns literal "\n" string, replace it with actual newlines
    .replace(/\\n/g, "\n")
    // Fix edge label with extra ">": |...|> -> |...| (so arrow is --> not -->|>)
    .replace(/\|\s*>\s*/g, "| ")
    // Replace non-standard hyphens/dashes that break Mermaid parsing (e.g. U+2011)
    .replace(/[\u2011\u2012\u2013\u2014\u2015]/g, "-")
    // Replace smart quotes with standard quotes
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    // Replace non-standard spaces with regular space (e.g. narrow no-break space U+202F)
    .replace(/[\u00A0\u202F\u200B-\u200D\uFEFF]/g, " ")
    // Replace semicolons with newlines, as Mermaid often fails parsing single-line graphs
    .replace(/;/g, "\n")
    // Escape unclosed `<` brackets when not used in arrows `<-->`
    .replace(/<(?![-\s])/g, "&lt;");

  // Split by newline and trim each line's leading/trailing spaces, then rejoin
  return sanitized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

/** Shorten long Mermaid parse errors for display */
function formatDiagramError(err: unknown): string {
  const message =
    err instanceof Error ? err.message : "Failed to render diagram";
  if (message.includes("Parse error") && message.length > 120) {
    return "Parse error in diagram syntax. The generated diagram may contain invalid Mermaid.";
  }
  return message;
}

export const DiagramViewer = ({
  diagrams,
  className = "",
}: DiagramViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, translateX: 0, translateY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentDiagram = diagrams[currentIndex] ?? "";

  const renderMermaid = useCallback(async (code: string, id: string) => {
    if (!code.trim()) {
      setSvgContent(null);
      setError("Empty diagram");
      return;
    }
    setError(null);
    const sanitized = sanitizeMermaidCode(code);
    try {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
        flowchart: { useMaxWidth: true },
        suppressErrorRendering: true,
      });
      const { svg } = await mermaid.render(id, sanitized);

      // If Mermaid suppressed the throw but returned its error-banner SVG, reject it.
      // Note: Mermaid v11+ includes ".error-icon" in <style> of every SVG, so we
      // must check for actual error DOM elements rather than naive string matching.
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, "image/svg+xml");
      const hasErrorElement =
        doc.querySelector(".error-text") ||
        doc.querySelector("#d" + id + " .error-icon") ||
        doc.querySelector("text.error-text");
      if (hasErrorElement) {
        throw new Error("Parse error in diagram syntax.");
      }

      setSvgContent(svg);
    } catch (err) {
      setError(formatDiagramError(err));
      setSvgContent(null);
    }
  }, []);

  useEffect(() => {
    if (!currentDiagram) {
      setSvgContent(null);
      setError(null);
      return;
    }
    const id = `mermaid-diagram-${currentIndex}-${Date.now()}`;
    renderMermaid(currentDiagram, id);
  }, [currentIndex, currentDiagram, renderMermaid]);

  const handleZoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_SCALE, s + SCALE_STEP));
  }, []);
  const handleZoomOut = useCallback(() => {
    setScale((s) => Math.max(MIN_SCALE, s - SCALE_STEP));
  }, []);
  const handleReset = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        translateX: translate.x,
        translateY: translate.y,
      };
    },
    [translate],
  );
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setTranslate({
        x: dragStart.current.translateX + e.clientX - dragStart.current.x,
        y: dragStart.current.translateY + e.clientY - dragStart.current.y,
      });
    },
    [isDragging],
  );
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
    setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    el.addEventListener("fullscreenchange", onFsChange);
    return () => el.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  if (!diagrams.length) return null;

  return (
    <div className="w-full mb-8 space-y-4">
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        Diagrams
      </h3>
      <div
        ref={containerRef}
        className={`rounded-3xl bg-white/10 backdrop-blur-sm overflow-hidden ${className}`}
      >
        <div
          className="relative overflow-hidden bg-white/10 flex items-center justify-center min-h-[350px] p-4"
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <div className="flex items-center gap-2 absolute top-2 right-2 z-10">
            {diagrams.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((i) =>
                      i <= 0 ? diagrams.length - 1 : i - 1,
                    )
                  }
                  className="p-2 rounded-lg bg-white text-gray-800 hover:text-gray-900 transition backdrop-blur-sm border"
                  aria-label="Previous diagram"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-400 px-2">
                  {currentIndex + 1} / {diagrams.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((i) =>
                      i >= diagrams.length - 1 ? 0 : i + 1,
                    )
                  }
                  className="p-2 rounded-lg bg-white text-gray-800 hover:text-gray-900 transition backdrop-blur-sm border"
                  aria-label="Next diagram"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="w-px h-6 bg-gray-700 mx-1" />
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-2 rounded-lg bg-white text-gray-800 hover:text-gray-900 transition backdrop-blur-sm border"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-2 rounded-lg bg-white text-gray-800 hover:text-gray-900 transition backdrop-blur-sm border"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-lg bg-white text-gray-800 hover:text-gray-900 transition backdrop-blur-sm border"
              aria-label="Reset view"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white text-gray-800 hover:text-gray-900 transition backdrop-blur-sm border"
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
          </div>
          <div
            className="transition-transform duration-100 ease-out origin-center"
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            }}
          >
            {error && (
              <div className="p-6 text-center text-amber-400 text-sm">
                <p>Diagram could not be rendered.</p>
                <p className="mt-1 opacity-80">{error}</p>
              </div>
            )}
            {svgContent && !error && (
              <div
                className="mermaid-svg-wrapper [&_svg]:max-w-full [&_svg]:h-auto [&_.error-icon]:hidden [&_.error-text]:hidden [&_#dError]:hidden [&_text]:!opacity-100"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
