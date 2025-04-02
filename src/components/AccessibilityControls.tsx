
import { 
  Moon, 
  Sun, 
  Eye, 
  MoveUp, 
  MoveDown, 
  RotateCcw,
  X
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
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
      
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="glass-card w-12 h-12 rounded-full flex items-center justify-center hover-lift"
      >
        <Eye className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AccessibilityControls;
