import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PWARegistration } from "@/components/PWARegistration";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import Index from "./pages/Index";
import ProjectsPage from "./pages/ProjectsPage";
import GitHubProjectsPage from "./pages/GitHubProjectsPage";
import BlogPage from "./pages/BlogPage";
import AdminFormsPage from "./pages/AdminFormsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

persistQueryClient({
  queryClient,
  persister: {
    persistClient: (client) => {
      localStorage.setItem('react-query-cache', JSON.stringify(client));
    },
    restoreClient: () => {
      const cache = localStorage.getItem('react-query-cache');
      return cache ? JSON.parse(cache) : undefined;
    },
    removeClient: () => {
      localStorage.removeItem('react-query-cache');
    },
  },
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/github" element={<GitHubProjectsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/admin" element={<AdminFormsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <PWARegistration />
          <PWAInstallPrompt />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
