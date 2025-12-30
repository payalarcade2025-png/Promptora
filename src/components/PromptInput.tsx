import { useState } from "react";
import { cn } from "@/lib/utils";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const PromptInput = ({ value, onChange, maxLength = 2000 }: PromptInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-muted-foreground">
        Base Prompt
      </label>
      <div
        className={cn(
          "relative rounded-xl transition-all duration-300",
          isFocused && "glow-primary"
        )}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          placeholder="Describe your vision... A futuristic cityscape at sunset with neon lights reflecting off glass towers..."
          className={cn(
            "w-full min-h-[180px] p-5 rounded-xl resize-none",
            "bg-card border border-border",
            "text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none focus:border-primary/50",
            "transition-all duration-300",
            "font-sans text-base leading-relaxed"
          )}
        />
        {/* Glowing border effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300",
            "border border-primary/30",
            isFocused ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
};

export default PromptInput;
