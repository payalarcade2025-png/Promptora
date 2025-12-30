import { useState } from "react";
import { Download, RefreshCw, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onRefine: () => void;
  onDownload: () => void;
}

const ResultDisplay = ({
  imageUrl,
  isLoading,
  onRefine,
  onDownload,
}: ResultDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-muted-foreground">
        Generated Design
      </label>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden border border-border",
          "aspect-square bg-card",
          "transition-all duration-500",
          imageUrl && "glow-primary"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Animated loading rings */}
              <div className="w-20 h-20 rounded-full border-2 border-primary/30 animate-ping" />
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute inset-2 w-16 h-16 rounded-full border-2 border-t-accent border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            </div>
            <p className="absolute bottom-8 text-sm text-muted-foreground animate-pulse">
              Generating your design...
            </p>
          </div>
        ) : imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Generated design"
              className="w-full h-full object-cover"
            />
            {/* Hover overlay with actions */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent",
                "flex flex-col items-center justify-end pb-8 gap-4",
                "transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="glass"
                  size="lg"
                  onClick={onRefine}
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refine
                </Button>
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={onDownload}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
              <button className="absolute top-4 right-4 p-2 rounded-lg glass hover:bg-foreground/10 transition-colors">
                <Maximize2 className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50">
            <div className="w-24 h-24 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <p className="text-sm">Your design will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
