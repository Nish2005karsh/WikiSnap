
import React from "react";

const ArticleLoadingState: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-white animate-pulse">Loading more articles...</div>
    </div>
  );
};

export default ArticleLoadingState;
