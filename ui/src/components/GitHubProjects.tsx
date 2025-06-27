import { Github, Star, GitFork, ExternalLink, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePinnedProjects } from "@/hooks/use-github";
import moment from "moment";

export const GitHubProjects = () => {
    const { data: projects, isLoading, error } = usePinnedProjects();

    if (isLoading) {
        return (
            <section id="github-projects" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            GitHub Projects
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            My featured projects from GitHub, automatically updated
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="github-projects" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Github className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Projects</h3>
                            <p className="text-muted-foreground">
                                Unable to fetch projects from GitHub. Please try again later.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="github-projects" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        GitHub Projects
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        My featured projects from GitHub, automatically updated
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {projects?.map((project) => (
                        <div key={project.id} className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 hover:scale-105 transition-all duration-300 glow-border group flex flex-col h-full relative">
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-2 sm:mb-4 gap-2">
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                                    {project.name}
                                </h3>
                                <Badge variant="outline" className="border-purple-500/50 text-purple-300 text-xs sm:text-sm px-2 py-0.5">
                                    {project.language || 'Mixed'}
                                </Badge>
                            </div>

                            {/* Project Description */}
                            <p className="text-muted-foreground leading-relaxed mb-2 sm:mb-4 min-h-[3rem] sm:min-h-[4rem] text-xs sm:text-sm md:text-base">
                                {project.description || 'No description available'}
                            </p>

                            {/* Project Stats */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span>{project.stargazers_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <GitFork className="w-4 h-4 text-blue-500" />
                                    <span>{project.forks_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-green-500" />
                                    <span>{moment(project.updated_at).format('MMM DD, YYYY')}</span>
                                </div>
                            </div>

                            {/* Topics/Tags */}
                            {project.topics && project.topics.length > 0 && (
                                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                                    {project.topics.slice(0, 3).map((topic) => (
                                        <span key={topic} className="px-2 py-0.5 text-[10px] sm:text-xs rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                            {topic}
                                        </span>
                                    ))}
                                    {project.topics.length > 3 && (
                                        <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded bg-secondary text-muted-foreground">
                                            +{project.topics.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                                <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 w-full sm:w-auto">
                                    <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Github className="w-4 h-4" />
                                        Code
                                    </a>
                                </Button>
                                {project.homepage && (
                                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full sm:w-auto">
                                        <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <ExternalLink className="w-4 h-4" />
                                            Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Projects Button */}
                <div className="text-center">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 text-base font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        <a href="/github" className="flex items-center gap-2">
                            <Github className="w-5 h-5" />
                            View All Projects
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}; 
