import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";
import Navigation from "./components/Navigation";
import { SignedIn, SignedOut, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";
import { ThemeProvider } from "./components/ThemeProvider";
import AccessibilityControls from "./components/AccessibilityControls";

// Create a client
const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router>
            <ClerkLoading>
              <div className="h-screen w-screen flex items-center justify-center bg-background">
                <div className="text-2xl font-bold animate-pulse text-primary">WikiSnap</div>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <Navigation />
              <Routes>
                <Route path="/" element={
                  <>
                    <SignedOut>
                      <Landing />
                    </SignedOut>
                    <SignedIn>
                      <Index />
                    </SignedIn>
                  </>
                } />
                <Route path="/discover" element={<Discover />} />
                <Route path="/sign-in/*" element={<SignInPage />} />
                <Route path="/sign-up/*" element={<SignUpPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <AccessibilityControls />
            </ClerkLoaded>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
