
import { useEffect } from "react";
import { useArticleContext } from "../contexts/ArticleContext";

interface UseKeyboardNavigationProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const useKeyboardNavigation = ({ containerRef }: UseKeyboardNavigationProps) => {
  const { currentIndex, articles } = useArticleContext();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          containerRef.current?.children[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
        }
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (currentIndex < articles.length - 1) {
          containerRef.current?.children[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, articles.length, containerRef]);
};

export default useKeyboardNavigation;
