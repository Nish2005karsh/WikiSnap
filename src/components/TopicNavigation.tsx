
import { useNavigate } from "react-router-dom";

// Predefined topics with their emoji icons
const topics = [
  { name: "Movies", icon: "🎬" },
  { name: "Sports", icon: "⚽" },
  { name: "Politics", icon: "🏛️" },
  { name: "Business", icon: "💼" },
  { name: "History", icon: "🏺" },
  { name: "Science", icon: "🔬" },
  { name: "Technology", icon: "💻" },
  { name: "Health", icon: "🏥" },
];

const TopicNavigation = () => {
  const navigate = useNavigate();

  const handleTopicClick = (topic: string) => {
    navigate(`/?q=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 overflow-x-auto hide-scrollbar px-4 py-2 bg-gradient-to-b from-black/30 to-transparent">
      <div className="flex space-x-3 pb-1">
        {topics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => handleTopicClick(topic.name)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-wikitok-orange/20 transition-colors whitespace-nowrap"
          >
            <span>{topic.icon}</span>
            <span>{topic.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicNavigation;
