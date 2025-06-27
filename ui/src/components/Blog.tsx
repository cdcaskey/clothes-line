import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import moment from "moment";

export const Blog = () => {
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Latest Blog Posts
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing insights about web development, best practices, and the latest technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <article key={post.id} className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 glow-border">
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {moment(post.date).format('MMM DD, YYYY')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} min read
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-purple-400 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 hover:bg-purple-500/10 w-full group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
