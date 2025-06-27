import { Navigation } from "@/components/Navigation";
import DevToBlogFeed from '../components/DevToBlogFeed';
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const BlogPage = () => {
  useScrollToTop();

  return (
    <>
      <SEO
        title="Blog - Arjun Kumar | Full Stack Developer & Freelancer"
        description="Read technical blog posts about web development, React, Node.js, MERN stack, Docker, and modern web technologies. Insights from a Full Stack Developer and freelancer."
        url="https://arjun-computer-geek.github.io/blog"
        keywords="Web Development Blog, React Blog, Node.js Blog, MERN Stack Blog, Full Stack Developer Blog, Freelancer Blog, Technical Blog, Programming Blog, Web Development Tips, React Tutorials, Node.js Tutorials"
      />
      <StructuredData type="blog" />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-900/20">
        <Navigation />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <DevToBlogFeed showSearch />
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPage;
