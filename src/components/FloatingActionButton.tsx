
import { ChevronUp, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface FloatingActionButtonProps {
  currentArticleText: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  currentArticleText 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speakText(currentArticleText);
      setIsPlaying(true);
    }
  };

  const speakText = (text: string) => {
    // Cancel any previous speech
    window.speechSynthesis.cancel();
    
    // Create a new SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthRef.current = utterance;
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={toggleSpeech}
        className="glass-card w-12 h-12 rounded-full flex items-center justify-center hover-lift"
      >
        {isPlaying ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>
      
      <button
        onClick={scrollToTop}
        className="glass-card w-12 h-12 rounded-full flex items-center justify-center hover-lift"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default FloatingActionButton;
