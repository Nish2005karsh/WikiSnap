
import { useRef } from "react";
import { ArticleProvider, useArticleContext } from "../contexts/ArticleContext";
import { WikipediaArticle } from "../services/types";
import ArticleCard from "./ArticleCard";
import ArticleLoadingState from "./ArticleLoadingState";
import ScrollProgressBar from "./ScrollProgressBar";
import FloatingActionButton from "./FloatingActionButton";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";
import useArticleIntersection from "../hooks/useArticleIntersection";

interface ArticleViewerProps {
  articles: WikipediaArticle[];
  onArticleChange: (article: WikipediaArticle) => void;
}

// Main component wrapper that provides the ArticleContext
const ArticleViewer: React.FC<ArticleViewerProps> = ({ articles: initialArticles, onArticleChange }) => {
  return (
    <ArticleProvider initialArticles={initialArticles} onArticleChange={onArticleChange}>
      <ArticleViewerContent />
    </ArticleProvider>
  );
};

// Inner component that consumes the ArticleContext
const ArticleViewerContent: React.FC = () => {
  const { articles, currentArticle, isLoading } = useArticleContext();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use custom hooks for keyboard navigation and intersection detection
  useKeyboardNavigation({ containerRef });
  useArticleIntersection({ containerRef });

  return (
    <>
      <ScrollProgressBar containerRef={containerRef} />
      
      <main 
        ref={containerRef} 
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {articles.map((article, index) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            index={index} 
          />
        ))}
        
        {isLoading && <ArticleLoadingState />}
      </main>
      
      <FloatingActionButton 
        currentArticleText={currentArticle?.content || ""}
      />
    </>
  );
};

export default ArticleViewer;
