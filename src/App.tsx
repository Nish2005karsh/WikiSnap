
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import { ThemeProvider } from "./components/ThemeProvider";
import AccessibilityControls from "./components/AccessibilityControls";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
          <AccessibilityControls />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
