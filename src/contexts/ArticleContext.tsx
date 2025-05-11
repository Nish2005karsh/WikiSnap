
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { WikipediaArticle } from "../services/types";
import { getRandomArticles, getRelatedArticles } from "../services/wikipediaService";

interface ArticleContextProps {
  articles: WikipediaArticle[];
  currentIndex: number;
  currentArticle: WikipediaArticle | null;
  isLoading: boolean;
  setCurrentIndex: (index: number) => void;
  loadMoreArticles: () => Promise<void>;
}

const ArticleContext = createContext<ArticleContextProps | undefined>(undefined);

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticleContext must be used within an ArticleProvider");
  }
  return context;
};

interface ArticleProviderProps {
  initialArticles: WikipediaArticle[];
  onArticleChange: (article: WikipediaArticle) => void;
  children: React.ReactNode;
}

export const ArticleProvider = ({ 
  initialArticles, 
  onArticleChange,
  children 
}: ArticleProviderProps) => {
  const [articles, setArticles] = useState<WikipediaArticle[]>(initialArticles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentArticle = articles[currentIndex] || null;
  
  // Notify parent when article changes
  useEffect(() => {
    if (currentArticle) {
      onArticleChange(currentArticle);
    }
  }, [currentIndex, currentArticle, onArticleChange]);
  
  // Load more articles when needed
  const loadMoreArticles = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      // Get related articles based on the current article
      const newArticles = currentArticle 
        ? await getRelatedArticles(currentArticle)
        : await getRandomArticles(3);
      setArticles(prev => [...prev, ...newArticles]);
    } catch (error) {
      console.error("Failed to load more articles", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentArticle]);
  
  // Load more articles when approaching the end
  useEffect(() => {
    if (currentIndex >= articles.length - 2) {
      loadMoreArticles();
    }
  }, [currentIndex, articles.length, loadMoreArticles]);
  
  const value = {
    articles,
    currentIndex,
    currentArticle,
    isLoading,
    setCurrentIndex,
    loadMoreArticles
  };
  
  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};
