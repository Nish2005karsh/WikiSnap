
import { 
  Moon, 
  Sun, 
  Eye, 
  MoveUp, 
  MoveDown, 
  RotateCcw,
  X,
  Accessibility,
  Heart,
  Languages,
  Info,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  
  const { 
    theme,
    toggleTheme, 
    highContrast,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize 
  } = useTheme();

  return (
    <div className="fixed left-4 bottom-20 z-50 flex flex-col items-start gap-3">
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="glass-card w-12 h-12 rounded-full flex items-center justify-center hover-lift"
        aria-label="Accessibility options"
      >
        <Accessibility className="h-5 w-5" />
      </button>
      
      {/* About Button */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <Button
          onClick={() => setAboutOpen(true)}
          className="glass-card w-12 h-12 p-0 rounded-full flex items-center justify-center hover-lift"
          variant="ghost"
          aria-label="About WikiTok"
        >
          <Info className="h-5 w-5" />
        </Button>
        <DialogContent className="sm:max-w-md bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">About WikiSnap</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>A TikTok-style interface for exploring random Wikipedia articles.</p>
            <p>Made with ❤️ by Nishkarsh Pandey</p>
            <p>Check out the code on <a href="https://github.com/Nish2005karsh/WikiSnap" className="text-blue-400 hover:underline">GitHub</a></p>

            <p>If you enjoy this project, you can <a href="#" className="text-blue-400 hover:underline">buy me a coffee! ☕</a></p>
            <p className="text-center mt-4">
  Support me with SOL:{" "}
  <span className="text-blue-400 break-all">
    Au96GNnnxgeqb9GA3saJKA86NdwgF5VBkYmd47VuJRau
  </span>
</p>
          </div>
          <DialogClose className="absolute right-4 top-4" />
        </DialogContent>
      </Dialog>

      {/* Liked Articles Button */}
      {/* <Sheet open={likesOpen} onOpenChange={setLikesOpen}>
        <SheetTrigger asChild>
          <Button 
            className="glass-card w-12 h-12 p-0 rounded-full flex items-center justify-center hover-lift" 
            variant="ghost"
            aria-label="Liked articles"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md bg-slate-900 text-white border-r border-slate-700">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Liked Articles</h2>
              <Button variant="outline" size="sm" className="ml-auto">
                Export
              </Button>
            </div>
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search liked articles..." 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 pl-10"
              />
              <Eye className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            </div>
            <div className="flex-grow overflow-auto">
              <div className="flex gap-4 mb-4 p-3 bg-slate-800 rounded-lg">
                <div className="w-16 h-16 flex-shrink-0 bg-slate-700 rounded-md overflow-hidden">
                  <img 
                    src="/lovable-uploads/e407d324-7a73-467e-8c34-dff0e2410b64.png" 
                    alt="Tacos Gavilan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Tacos Gavilan</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    Tacos El Gavilan, Inc, also known as Tacos Gavilan or formerly Tacos El Gavilan, is a Mexican fast food restaurant chain founded in Los Angeles, California, in 1992. Its...
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </SheetContent>
      </Sheet> */}

      {/* Language Selector Button */}
      {/* <Sheet open={languageOpen} onOpenChange={setLanguageOpen}>
        <SheetTrigger asChild>
          <Button 
            className="glass-card w-12 h-12 p-0 rounded-full flex items-center justify-center hover-lift" 
            variant="ghost"
            aria-label="Language selection"
          >
            <Languages className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-xs bg-slate-900 text-white border-r border-slate-700">
          <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4">Select Language</h2>
            <div className="flex-grow overflow-auto">
              <div className="space-y-1">
                {[
                  { lang: 'العربية', flag: '🇸🇦' },
                  { lang: 'বাংলা', flag: '🇧🇩' },
                  { lang: 'Català', flag: '🏴󠁥󠁳󠁣󠁴󠁿' },
                  { lang: 'Čeština', flag: '🇨🇿' },
                  { lang: 'Deutsch', flag: '🇩🇪' },
                  { lang: 'Ελληνικά', flag: '🇬🇷' },
                  { lang: 'English', flag: '🇺🇸' }
                ].map((item, idx) => (
                  <Button 
                    key={idx}
                    variant="ghost" 
                    className="w-full justify-start text-left hover:bg-slate-800"
                  >
                    <span className="mr-2 text-lg">{item.flag}</span>
                    {item.lang}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet> */}

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="glass-card p-4 flex flex-col gap-3 animate-fade-up">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Accessibility</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span className="text-sm">Light mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span className="text-sm">Dark mode</span>
                </>
              )}
            </button>
            
            <button
              onClick={toggleHighContrast}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm">
                {highContrast ? "Disable" : "Enable"} high contrast
              </span>
            </button>
          </div>
          
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-300">Font size</p>
            <div className="flex gap-2">
              <button 
                onClick={decreaseFontSize} 
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
              >
                <MoveDown className="h-4 w-4" />
              </button>
              <button 
                onClick={resetFontSize}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button 
                onClick={increaseFontSize}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
              >
                <MoveUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityControls;
