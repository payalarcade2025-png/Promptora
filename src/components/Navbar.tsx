import { Sparkles, Coins } from "lucide-react";

interface NavbarProps {
  credits: number;
}

const Navbar = ({ credits }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Promptora
            </span>
          </div>

          {/* Credits Counter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border">
            <Coins className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Credits</span>
            <span className="font-display font-bold text-accent text-glow-accent">
              {credits.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
