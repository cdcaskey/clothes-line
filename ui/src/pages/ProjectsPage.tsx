import { useState } from "react";
import { Github, ArrowRight, Filter, Search, Lock, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const CHAR_LIMIT = 50;

const ProjectsPage = () => {
  useScrollToTop();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const toggleProjectExpansion = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const truncateDescription = (text: string, charLimit: number = CHAR_LIMIT) => {
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + '...';
  };

  const hasMoreContent = (text: string, charLimit: number = CHAR_LIMIT) => {
    return text.length > charLimit;
  };

  return (
    <>
      <SEO
        title="Projects - Arjun Kumar | Full Stack Developer & Freelancer Portfolio"
        description="Explore Arjun Kumar's comprehensive portfolio of web development projects including React, Node.js, MongoDB, Docker applications. View live demos and source code."
        url="https://arjun-computer-geek.github.io/projects"
        keywords="React Projects, Node.js Projects, Full Stack Projects, Web Development Portfolio, MERN Stack Projects, Docker Projects, TypeScript Projects"
      />
      <StructuredData type="projects" />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-900/20">
        <Navigation />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                All Projects
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                A comprehensive showcase of my development projects, from full-stack applications to frontend experiments
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center justify-center mb-8 xs:mb-10 xxs:mb-6 px-1 xs:px-2">
              <div className="glass rounded-lg xs:rounded-xl p-2 xs:p-3 flex flex-col xs:flex-row items-stretch xs:items-center gap-2 xs:gap-3 w-full max-w-[95vw] sm:max-w-md md:max-w-lg">
                <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-0">
                  <Filter className="w-4 h-4 xs:w-5 xs:h-5 text-purple-400" />
                  <span className="text-xs xs:text-sm font-medium text-purple-400 hidden xxs:inline">Filter</span>
                </div>
                <div className="flex flex-wrap gap-1 xs:gap-2 w-full">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        (selectedCategory === category
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                          : "hover:bg-purple-500/10 text-muted-foreground hover:text-purple-300"
                        ) +
                        " text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 min-w-[60px] xs:min-w-[80px]"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-8 text-center">
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="glass rounded-2xl p-4 xs:p-5 xxs:p-2 sm:p-6 hover:scale-105 transition-all duration-300 glow-border group flex flex-col h-full relative min-w-0">
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="mb-3 xs:mb-4">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs xs:text-sm xxs:text-[10px] px-2 xs:px-3 xxs:px-1 py-0.5 xs:py-1 xxs:py-0.5">
                        Featured
                      </Badge>
                    </div>
                  )}
                  {/* Private Badge */}
                  {project.private && (
                    <div className="absolute top-3 xs:top-6 right-3 xs:right-6 bg-yellow-500/90 text-black px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm xxs:text-[10px] font-semibold flex items-center gap-1 z-10">
                      <Lock className="w-3 h-3" />
                      Private
                    </div>
                  )}
                  {/* Project Image */}
                  <div className="relative mb-4 xs:mb-6 overflow-hidden rounded-lg xs:rounded-xl">
                    <img
                      src={project.image}
                      alt={`${project.title} - ${project.description}`}
                      className="w-full h-32 xxs:h-24 xs:h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  {/* Project Content */}
                  <div className="space-y-3 xs:space-y-4 flex-1 flex flex-col min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base xs:text-lg font-semibold text-purple-400 group-hover:text-purple-300 transition-colors break-words">
                        {project.title}
                      </h3>
                      <Badge variant="outline" className="border-purple-500/50 text-purple-300 text-xs xs:text-sm xxs:text-[10px] px-2 xs:px-3 xxs:px-1 py-0.5 xs:py-1 xxs:py-0.5">
                        {project.category}
                      </Badge>
                    </div>
                    {project.company && (
                      project.companyUrl ? (
                        <a href={project.companyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-400 font-medium text-xs xs:text-sm xxs:text-[10px] mb-1 xs:mb-2 hover:underline hover:text-pink-400 transition-colors">
                          <Briefcase className="w-3 h-3" />
                          {project.company}
                        </a>
                      ) : (
                        <div className="flex items-center gap-1 text-purple-400 font-medium text-xs xs:text-sm xxs:text-[10px] mb-1 xs:mb-2">
                          <Briefcase className="w-3 h-3" />
                          {project.company}
                        </div>
                      )
                    )}
                    <p className="text-muted-foreground leading-relaxed text-xs xs:text-sm min-h-[2.5rem] xs:min-h-[4rem]">
                      {project.description}
                    </p>
                    {/* Long Description with Read More */}
                    <div className="mt-2 xs:mt-4 p-2 xs:p-4 bg-purple-500/10 rounded-md xs:rounded-lg border border-purple-500/20">
                      <p className="text-muted-foreground leading-relaxed text-[11px] xs:text-sm">
                        {expandedProjects.has(project.id)
                          ? project.longDescription
                          : truncateDescription(project.longDescription, CHAR_LIMIT)
                        }
                      </p>
                      {hasMoreContent(project.longDescription, CHAR_LIMIT) && (
                        <button
                          onClick={() => toggleProjectExpansion(project.id)}
                          className="text-purple-400 hover:text-purple-300 text-xs xs:text-sm font-medium flex items-center gap-1 transition-colors mt-2"
                        >
                          {expandedProjects.has(project.id) ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Read Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Read More
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 xs:gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-1 xs:px-2 py-0.5 xs:py-1 text-[10px] xs:text-xs rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-1 xs:px-2 py-0.5 xs:py-1 text-[10px] xs:text-xs rounded bg-secondary text-muted-foreground">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-2 xs:pt-4 mt-auto">
                      {project.private ? (
                        <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 w-full xs:w-auto" disabled>
                          <Lock className="w-4 h-4 mr-2" />
                          Private Code
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 w-full xs:w-auto">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.live && (
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full xs:w-auto">
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 rotate-45" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">No Projects Found</h3>
                  <p className="text-muted-foreground">
                    No projects match the selected category. Try selecting a different filter.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProjectsPage;
