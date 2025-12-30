import { cn } from "@/lib/utils";
import { Sparkles, Eye, Zap, Wand2 } from "lucide-react";

interface Model {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: "purple" | "cyan" | "mixed";
}

const models: Model[] = [
  {
    id: "chatgpt-enhanced",
    name: "ChatGPT-Enhanced",
    description: "Detailed & creative prompts",
    icon: <Sparkles className="w-5 h-5" />,
    color: "purple",
  },
  {
    id: "gemini-vision",
    name: "Gemini-Vision",
    description: "Visual understanding & style",
    icon: <Eye className="w-5 h-5" />,
    color: "cyan",
  },
  {
    id: "grok-creative",
    name: "Grok-Creative",
    description: "Bold & unconventional ideas",
    icon: <Zap className="w-5 h-5" />,
    color: "mixed",
  },
  {
    id: "flux-pro",
    name: "Flux-Pro",
    description: "Highest quality rendering",
    icon: <Wand2 className="w-5 h-5" />,
    color: "purple",
  },
];

interface ModelSelectorProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

const ModelSelector = ({ selectedModel, onSelectModel }: ModelSelectorProps) => {
  const getColorClasses = (color: Model["color"], isSelected: boolean) => {
    if (!isSelected) {
      return "border-border bg-card hover:border-muted-foreground/50";
    }

    switch (color) {
      case "purple":
        return "border-primary/50 bg-primary/10 glow-primary";
      case "cyan":
        return "border-accent/50 bg-accent/10 glow-accent";
      case "mixed":
        return "border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10 animate-glow-pulse";
      default:
        return "border-primary/50 bg-primary/10";
    }
  };

  const getIconColor = (color: Model["color"], isSelected: boolean) => {
    if (!isSelected) return "text-muted-foreground";

    switch (color) {
      case "purple":
        return "text-primary";
      case "cyan":
        return "text-accent";
      case "mixed":
        return "text-primary";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-muted-foreground">
        AI Model
      </label>
      <div className="grid grid-cols-2 gap-3">
        {models.map((model) => {
          const isSelected = selectedModel === model.id;
          return (
            <button
              key={model.id}
              onClick={() => onSelectModel(model.id)}
              className={cn(
                "relative p-4 rounded-xl border transition-all duration-300 text-left group",
                getColorClasses(model.color, isSelected)
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg transition-colors duration-300",
                    isSelected ? "bg-background/50" : "bg-muted",
                    getIconColor(model.color, isSelected)
                  )}
                >
                  {model.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-medium text-sm truncate transition-colors",
                      isSelected ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {model.name}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-1">
                    {model.description}
                  </p>
                </div>
              </div>
              {/* Selection indicator */}
              <div
                className={cn(
                  "absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300",
                  isSelected
                    ? model.color === "cyan"
                      ? "bg-accent"
                      : "bg-primary"
                    : "bg-muted-foreground/30"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModelSelector;
