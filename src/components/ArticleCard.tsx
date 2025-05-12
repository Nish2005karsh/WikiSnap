
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "./ui/progress";
import { WikipediaArticle } from "../services/types";
import { useTheme } from "./ThemeProvider";
import { useArticleContext } from "../contexts/ArticleContext";

interface ArticleCardProps {
  article: WikipediaArticle;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  const { currentIndex } = useArticleContext();
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [progress, setProgress] = useState(0);
  const { fontSize, highContrast } = useTheme();
  const isCurrentArticle = currentIndex === index;

  useEffect(() => {
    setIsVisible(isCurrentArticle);
    setDisplayedText("");
    setProgress(0);
  }, [isCurrentArticle]);

  useEffect(() => {
    if (!isVisible || !article?.content) return;

    let currentChar = 0;
    const text = article.content;
    const totalChars = text.length;

    const interval = setInterval(() => {
      if (currentChar <= totalChars) {
        setDisplayedText(text.slice(0, currentChar));
        setProgress((currentChar / totalChars) * 100);
        currentChar++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Fast streaming

    return () => clearInterval(interval);
  }, [isVisible, article?.content]);

  return (
    <div 
      data-index={index}
      className="article-section h-screen w-screen snap-start snap-always relative flex items-center justify-center"
    >
      <div className="absolute inset-0 w-screen h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.0 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 10, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-5000"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
        className={`relative z-10 text-white p-8 max-w-3xl mx-auto ${highContrast ? 'high-contrast p-6 rounded-xl' : ''}`}
        style={{ fontSize: `${fontSize}rem` }}
      >
        <h1 className="text-4xl font-bold mb-4 hover:text-wikitok-orange transition-colors">{article.title}</h1>
        <p className="text-lg leading-relaxed mb-12">
          {isCurrentArticle ? displayedText : article.content}
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <span>{article.readTime} min read</span>
          <span>•</span>
          <span>{article.views.toLocaleString()} views</span>
        </div>
      </motion.div>
      
      {isCurrentArticle && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <Progress 
            value={progress} 
            className="h-1 bg-black/20"
            indicatorClassName="bg-wikitok-orange"
          />
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
