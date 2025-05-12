
import { ChevronUp, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "./ui/use-toast";

interface FloatingActionButtonProps {
  currentArticleText: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  currentArticleText 
}) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const availableVoicesRef = useRef<SpeechSynthesisVoice[]>([]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Get available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        availableVoicesRef.current = voices;
      }
    };

    // Load voices immediately if available
    loadVoices();

    // Listen for voices changed event
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const toggleSpeech = () => {
    if (isPlaying) {
      if (isPaused) {
        resumeSpeech();
      } else {
        pauseSpeech();
      }
    } else {
      startSpeech();
    }
  };

  const startSpeech = () => {
    if (!currentArticleText) {
      toast({
        title: "No text to read",
        description: "There is no article text to read aloud.",
        duration: 3000,
      });
      return;
    }

    speakText(currentArticleText);
    setIsPlaying(true);
    setIsPaused(false);
    
    toast({
      title: "Text-to-Speech Started",
      description: "Reading article aloud. Click again to pause.",
      duration: 3000,
    });
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    
    toast({
      title: "Paused",
      description: "Text-to-Speech paused. Click to resume.",
      duration: 3000,
    });
  };

  const resumeSpeech = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
    
    toast({
      title: "Resumed",
      description: "Continuing to read article aloud.",
      duration: 3000,
    });
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    
    toast({
      title: "Stopped",
      description: "Text-to-Speech stopped.",
      duration: 3000,
    });
  };

  const speakText = (text: string) => {
    // Cancel any previous speech
    window.speechSynthesis.cancel();
    
    // Create a new SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthRef.current = utterance;
    
    // Set preferred voice if available
    if (availableVoicesRef.current.length > 0) {
      // Try to find a natural sounding voice
      const preferredVoice = availableVoicesRef.current.find(
        voice => voice.localService === false
      ) || availableVoicesRef.current[0];
      
      utterance.voice = preferredVoice;
    }
    
    // Set speech properties
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      toast({
        title: "Finished",
        description: "Finished reading the article.",
        duration: 3000,
      });
    };
    
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsPlaying(false);
      setIsPaused(false);
      toast({
        title: "Error",
        description: "There was an error with the text-to-speech service.",
        variant: "destructive",
        duration: 3000,
      });
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
        aria-label={isPlaying ? (isPaused ? "Resume speech" : "Pause speech") : "Start text-to-speech"}
      >
        {isPlaying ? (
          isPaused ? (
            <Play className="h-5 w-5" />
          ) : (
            <Pause className="h-5 w-5" />
          )
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>
      
      {isPlaying && (
        <button
          onClick={stopSpeech}
          className="glass-card w-12 h-12 rounded-full flex items-center justify-center hover-lift"
          aria-label="Stop text-to-speech"
        >
          <VolumeX className="h-5 w-5" />
        </button>
      )}
      
      <button
        onClick={scrollToTop}
        className="glass-card w-12 h-12 rounded-full flex items-center justify-center hover-lift"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default FloatingActionButton;
