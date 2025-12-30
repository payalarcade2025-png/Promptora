import { useState } from "react";
import { Wand2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PromptInput from "@/components/PromptInput";
import ImageDropzone from "@/components/ImageDropzone";
import ModelSelector from "@/components/ModelSelector";
import ResultDisplay from "@/components/ResultDisplay";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState("chatgpt-enhanced");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits] = useState(1250);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate your design.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // For demo, use a placeholder image
    setGeneratedImage(
      "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&h=800&fit=crop"
    );
    setIsGenerating(false);

    toast({
      title: "Design generated!",
      description: "Your AI-powered design is ready.",
    });
  };

  const handleRefine = () => {
    toast({
      title: "Refining design...",
      description: "Applying AI enhancements to your design.",
    });
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (generatedImage) {
      toast({
        title: "Download started",
        description: "Your design is being downloaded.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-float" />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-glow opacity-50"
        />
      </div>

      <Navbar credits={credits} />

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              AI-Powered{" "}
              <span className="text-glow-primary bg-gradient-primary bg-clip-text text-transparent">
                Graphic Design
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transform your ideas into stunning visuals with next-gen AI models.
              Just describe your vision and let Promptora bring it to life.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Input */}
            <div
              className="space-y-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <PromptInput value={prompt} onChange={setPrompt} />
              <ImageDropzone image={referenceImage} onImageChange={setReferenceImage} />
              <ModelSelector
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
              />

              {/* Generate Button */}
              <Button
                variant="gradient"
                size="xl"
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Design
                  </>
                )}
              </Button>
            </div>

            {/* Right Column - Result */}
            <div
              className="animate-fade-in lg:sticky lg:top-28"
              style={{ animationDelay: "0.2s" }}
            >
              <ResultDisplay
                imageUrl={generatedImage}
                isLoading={isGenerating}
                onRefine={handleRefine}
                onDownload={handleDownload}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
