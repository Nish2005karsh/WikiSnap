
import { useEffect } from "react";
import { useArticleContext } from "../contexts/ArticleContext";

interface UseArticleIntersectionProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const useArticleIntersection = ({ containerRef }: UseArticleIntersectionProps) => {
  const { setCurrentIndex } = useArticleContext();
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setCurrentIndex(index);
          }
        });
      },
      {
        threshold: 0.7,
        root: null,
      }
    );

    const articleElements = container.querySelectorAll(".article-section");
    articleElements.forEach((article) => observer.observe(article));

    return () => {
      articleElements.forEach((article) => observer.unobserve(article));
    };
  }, [containerRef, setCurrentIndex]);
};

export default useArticleIntersection;
