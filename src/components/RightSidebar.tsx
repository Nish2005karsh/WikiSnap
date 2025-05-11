
import { Bookmark, Share2, Edit, BookOpen } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const RightSidebar = ({ article }) => {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const bookmarks = JSON.parse(localStorage.getItem('wikitok-bookmarks') || '[]');
    return bookmarks.some(bookmark => bookmark.title === article.title);
  });

  const handleWikipediaRedirect = () => {
    const baseUrl = "https://en.wikipedia.org/wiki/";
    const articleTitle = encodeURIComponent(article.title);
    window.open(`${baseUrl}${articleTitle}`, '_blank');
    
    toast({
      title: "Opening Wikipedia",
      description: `Opening ${article.title} in a new tab`,
      duration: 2000,
    });
  };

  const handleShare = async () => {
    const baseUrl = window.location.origin;
    const searchParams = new URLSearchParams();
    searchParams.set('q', article.title);
    searchParams.set('id', article.id);
    const shareUrl = `${baseUrl}/?${searchParams.toString()}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: `Check out this article about ${article.title} on WikiTok!`,
          url: shareUrl,
        });
        
        toast({
          title: "Shared successfully",
          description: "Article has been shared!",
          duration: 2000,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied",
          description: "Article link copied to clipboard!",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Failed to share article",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleEdit = () => {
    const baseUrl = "https://en.wikipedia.org/wiki/";
    const articleTitle = encodeURIComponent(article.title);
    window.open(`${baseUrl}edit/${articleTitle}`, '_blank');
    
    toast({
      title: "Opening editor",
      description: "Opening Wikipedia editor in a new tab",
      duration: 2000,
    });
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('wikitok-bookmarks') || '[]');
    
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter(bookmark => bookmark.title !== article.title);
      localStorage.setItem('wikitok-bookmarks', JSON.stringify(newBookmarks));
      setIsBookmarked(false);
      toast({
        title: "Removed from bookmarks",
        description: "Article removed from your bookmarks",
        duration: 2000,
      });
    } else {
      bookmarks.push({
        id: article.id,
        title: article.title,
        image: article.image,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('wikitok-bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast({
        title: "Bookmarked!",
        description: "Article saved to your bookmarks",
        duration: 2000,
      });
    }
  };

  return (
    <div className="fixed right-4 bottom-20 flex flex-col items-center space-y-4 z-50">
      <div className="flex flex-col items-center">
        <button 
          className={`sidebar-icon ${isBookmarked ? 'text-wikitok-orange' : ''}`} 
          onClick={handleBookmark}
        >
          <Bookmark className="w-7 h-7" fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
        <span className="text-xs mt-1">Save</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="sidebar-icon" onClick={handleShare}>
          <Share2 className="w-7 h-7" />
        </button>
        <span className="text-xs mt-1">Share</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="sidebar-icon" onClick={handleEdit}>
          <Edit className="w-7 h-7" />
        </button>
        <span className="text-xs mt-1">Edit</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="sidebar-icon" onClick={handleWikipediaRedirect}>
          <BookOpen className="w-7 h-7" />
        </button>
        <span className="text-xs mt-1">View</span>
      </div>
    </div>
  );
};

export default RightSidebar;
