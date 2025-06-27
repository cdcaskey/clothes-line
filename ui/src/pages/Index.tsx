import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { GitHubProjects } from "@/components/GitHubProjects";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import DevToBlogFeed from '../components/DevToBlogFeed';
import { useNavigate } from "react-router-dom";

const Index = () => {
  useScrollToTop();
  useAnchorScroll();
  const navigate = useNavigate();

  const handleViewAllPosts = () => {
    navigate("/blog");
  };

  return (
    <>
      <SEO />
      <StructuredData type="homepage" />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-900/20">
        <Navigation />
        <main className="relative">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <GitHubProjects />

          {/* Blog Section with consistent styling */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <DevToBlogFeed limit={3} />
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleViewAllPosts}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  View All Posts →
                </button>
              </div>
            </div>
          </section>

          <Contact />
        </main>
      </div>
    </>
  );
};

export default Index;
