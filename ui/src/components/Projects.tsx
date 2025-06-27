import { Github, ArrowRight, Lock, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const Projects = () => {
  const featuredProjects = projects.filter(p => p.featured);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleProjectExpansion = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  // Truncate by characters for better UX with single-paragraph text
  const CHAR_LIMIT = 160;
  const truncateDescription = (text: string, charLimit: number = CHAR_LIMIT) => {
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + '...';
  };

  const hasMoreContent = (text: string, charLimit: number = CHAR_LIMIT) => {
    return text.length > charLimit;
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Showcasing my most impactful and technically challenging projects
          </p>
        </div>

        {/* Featured Projects Grid - Improved spacing and consistency */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {featuredProjects.map((project) => (
            <div key={project.id} className="glass rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 hover:scale-105 transition-all duration-300 glow-border group flex flex-col h-full relative min-w-0">
              <div className="relative mb-3 xs:mb-4 sm:mb-6 overflow-hidden rounded-lg xs:rounded-xl">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.description}`}
                  className="w-full h-28 xxs:h-20 xs:h-36 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {project.private && (
                  <div className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 bg-yellow-500/90 text-black px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs sm:text-sm font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Private
                  </div>
                )}
              </div>
              <div className="space-y-2 xs:space-y-3 sm:space-y-4 flex-1 flex flex-col min-w-0">
                <div className="flex items-start justify-between gap-1 xs:gap-2">
                  <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors break-words">
                    {project.title}
                  </h3>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-300 text-[10px] xs:text-xs sm:text-sm px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1">
                    {project.category}
                  </Badge>
                </div>
                {project.company && (
                  project.companyUrl ? (
                    <a href={project.companyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-400 font-medium text-[10px] xs:text-xs sm:text-sm mb-0.5 xs:mb-1 sm:mb-2 hover:underline hover:text-pink-400 transition-colors">
                      <Briefcase className="w-3 h-3" />
                      {project.company}
                    </a>
                  ) : (
                    <div className="flex items-center gap-1 text-purple-400 font-medium text-[10px] xs:text-xs sm:text-sm mb-0.5 xs:mb-1 sm:mb-2">
                      <Briefcase className="w-3 h-3" />
                      {project.company}
                    </div>
                  )
                )}
                <p className="text-muted-foreground leading-relaxed text-xs xs:text-sm sm:text-base">
                  {project.description}
                </p>
                <div className="mt-1 xs:mt-2 sm:mt-4 p-2 xs:p-3 sm:p-4 bg-purple-500/10 rounded-md xs:rounded-lg sm:rounded-xl border border-purple-500/20">
                  <p className="text-muted-foreground leading-relaxed text-[10px] xs:text-xs sm:text-sm">
                    {expandedProjects.has(project.id)
                      ? project.longDescription
                      : truncateDescription(project.longDescription, CHAR_LIMIT)
                    }
                  </p>
                  {hasMoreContent(project.longDescription, CHAR_LIMIT) && (
                    <button
                      onClick={() => toggleProjectExpansion(project.id)}
                      className="text-purple-400 hover:text-purple-300 text-[10px] xs:text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors mt-1 xs:mt-2"
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
                <div className="flex flex-wrap gap-1 xs:gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-1 xs:px-2 py-0.5 xs:py-1 text-[9px] xs:text-[10px] sm:text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col xs:flex-row gap-1 xs:gap-2 sm:gap-4 pt-2 xs:pt-3 sm:pt-4 mt-auto">
                  {project.private ? (
                    <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 w-full xs:w-auto text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 sm:px-4 py-1 xs:py-2" disabled>
                      <Lock className="w-4 h-4 mr-2" />
                      Private Code
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 w-full xs:w-auto text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 sm:px-4 py-1 xs:py-2">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.live ? <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full xs:w-auto text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 sm:px-4 py-1 xs:py-2">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 rotate-45" />
                      Live Demo
                    </a>
                  </Button> :
                    <Button disabled size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full xs:w-auto text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 sm:px-4 py-1 xs:py-2">
                      <ArrowRight className="w-4 h-4 rotate-45" />
                      Confidential
                    </Button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button - Improved consistency */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 text-base font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <a href="/projects" className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
