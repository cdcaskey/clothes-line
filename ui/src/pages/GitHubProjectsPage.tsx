import { useState, useMemo } from "react";
import { Github, Star, GitFork, ExternalLink, Calendar, Search, Filter, Loader2, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGitHubRepos } from "@/hooks/use-github";
import { Navigation } from "@/components/Navigation";
import { GitHubRepo } from "@/lib/github";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import moment from "moment";

const GitHubProjectsPage = () => {
    useScrollToTop(); // Scroll to top when navigating to this page
    const { data: repos, isLoading, error } = useGitHubRepos();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    const [sortBy, setSortBy] = useState("updated");

    // Get unique languages for filter
    const languages = useMemo(() => {
        if (!repos) return [];
        const langSet = new Set(repos.map(repo => repo.language).filter(Boolean));
        return ["All", ...Array.from(langSet).sort()];
    }, [repos]);

    // Separate pinned and other repositories
    const { pinnedRepos, otherRepos } = useMemo(() => {
        if (!repos) return { pinnedRepos: [], otherRepos: [] };

        const pinned = repos.filter(repo => repo.isPinned);
        const other = repos.filter(repo => !repo.isPinned);

        return { pinnedRepos: pinned, otherRepos: other };
    }, [repos]);

    // Filter and sort repositories
    const filteredOtherRepos = useMemo(() => {
        if (!otherRepos) return [];

        const filtered = otherRepos.filter(repo => {
            const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
            return matchesSearch && matchesLanguage;
        });

        // Sort repositories
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "stars":
                    return b.stargazers_count - a.stargazers_count;
                case "forks":
                    return b.forks_count - a.forks_count;
                case "name":
                    return a.name.localeCompare(b.name);
                case "created":
                    return moment(b.created_at).valueOf() - moment(a.created_at).valueOf();
                case "updated":
                default:
                    return moment(b.updated_at).valueOf() - moment(a.updated_at).valueOf();
            }
        });

        return filtered;
    }, [otherRepos, searchTerm, selectedLanguage, sortBy]);

    // Filter pinned repositories
    const filteredPinnedRepos = useMemo(() => {
        if (!pinnedRepos) return [];

        const filtered = pinnedRepos.filter(repo => {
            const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
            return matchesSearch && matchesLanguage;
        });

        // Sort repositories
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "stars":
                    return b.stargazers_count - a.stargazers_count;
                case "forks":
                    return b.forks_count - a.forks_count;
                case "name":
                    return a.name.localeCompare(b.name);
                case "created":
                    return moment(b.created_at).valueOf() - moment(a.created_at).valueOf();
                case "updated":
                default:
                    return moment(b.updated_at).valueOf() - moment(a.updated_at).valueOf();
            }
        });

        return filtered;
    }, [pinnedRepos, searchTerm, selectedLanguage, sortBy]);

    // Check if there are any pinned repositories (for display logic)
    const hasPinnedRepos = pinnedRepos && pinnedRepos.length > 0;

    if (isLoading) {
        return (
            <>
                <SEO
                    title="GitHub Projects - Arjun Kumar | Full Stack Developer & Freelancer"
                    description="Explore Arjun Kumar's GitHub repositories showcasing React, Node.js, MERN stack, Docker, and modern web development projects. Open source contributions from a Full Stack Developer and freelancer."
                    url="https://arjun-computer-geek.github.io/github"
                    keywords="GitHub Projects, Open Source Projects, React Projects, Node.js Projects, MERN Stack Projects, Full Stack Developer GitHub, Freelancer GitHub, Web Development Projects, Open Source Contributions"
                />
                <StructuredData type="projects" />
                <Navigation />
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto" />
                        <p className="mt-4 text-muted-foreground">Loading GitHub repositories...</p>
                    </div>
                </section>
            </>
        );
    }

    if (error) {
        return (
            <>
                <SEO
                    title="GitHub Projects - Arjun Kumar | Full Stack Developer & Freelancer"
                    description="Explore Arjun Kumar's GitHub repositories showcasing React, Node.js, MERN stack, Docker, and modern web development projects. Open source contributions from a Full Stack Developer and freelancer."
                    url="https://arjun-computer-geek.github.io/github"
                    keywords="GitHub Projects, Open Source Projects, React Projects, Node.js Projects, MERN Stack Projects, Full Stack Developer GitHub, Freelancer GitHub, Web Development Projects, Open Source Contributions"
                />
                <StructuredData type="projects" />
                <Navigation />
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Github className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Repositories</h3>
                            <p className="text-muted-foreground">
                                Unable to fetch repositories from GitHub. Please try again later.
                            </p>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    const renderRepositoryCard = (repo: GitHubRepo) => (
        <div key={repo.id} className="glass rounded-lg xs:rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 md:p-6 hover:scale-105 transition-all duration-300 glow-border group flex flex-col h-full relative min-w-0 w-full">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-2 sm:mb-4 gap-2">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                    {repo.name}
                    {repo.isPinned && <Pin className="w-4 h-4 text-yellow-500 inline ml-1 align-middle" />}
                </h3>
                <Badge variant="outline" className="border-purple-500/50 text-purple-300 text-xs sm:text-sm px-2 py-0.5">
                    {repo.language || 'Mixed'}
                </Badge>
            </div>

            {/* Card Description */}
            <p className="text-muted-foreground leading-relaxed mb-2 sm:mb-4 min-h-[3rem] sm:min-h-[4rem] text-xs sm:text-sm md:text-base break-words">
                {repo.description || 'No description available'}
            </p>

            {/* Card Stats */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4 text-blue-500" />
                    <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span>{moment(repo.updated_at).format('MMM DD, YYYY')}</span>
                </div>
            </div>

            {/* Card Tags */}
            {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                    {repo.topics.slice(0, 3).map((topic: string) => (
                        <span key={topic} className="px-2 py-0.5 text-[10px] sm:text-xs rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {topic}
                        </span>
                    ))}
                    {repo.topics.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded bg-secondary text-muted-foreground">
                            +{repo.topics.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Card Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4 mt-auto">
                <Button variant="outline" size="sm" className="border-purple-500/50 hover:bg-purple-500/10 w-full sm:w-auto">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        Code
                    </a>
                </Button>
                {repo.homepage && (
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full sm:w-auto">
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Demo
                        </a>
                    </Button>
                )}
            </div>
        </div>
    );

    return (
        <>
            <SEO
                title="GitHub Projects - Arjun Kumar | Full Stack Developer & Freelancer"
                description="Explore Arjun Kumar's GitHub repositories showcasing React, Node.js, MERN stack, Docker, and modern web development projects. Open source contributions from a Full Stack Developer and freelancer."
                url="https://arjun-computer-geek.github.io/github"
                keywords="GitHub Projects, Open Source Projects, React Projects, Node.js Projects, MERN Stack Projects, Full Stack Developer GitHub, Freelancer GitHub, Web Development Projects, Open Source Contributions"
            />
            <StructuredData type="projects" />
            <Navigation />
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            GitHub Repositories
                        </h1>
                        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            All my public repositories from GitHub, automatically updated
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="glass rounded-xl p-6 mb-12">
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search repositories..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Language Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-purple-400" />
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {languages.map((lang) => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort By */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="updated">Last Updated</option>
                                    <option value="created">Created Date</option>
                                    <option value="stars">Stars</option>
                                    <option value="forks">Forks</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-8">
                        <p className="text-muted-foreground">
                            Showing {filteredPinnedRepos.length + filteredOtherRepos.length} of {repos?.length || 0} repositories
                        </p>
                    </div>

                    {/* Pinned Repositories Section */}
                    {hasPinnedRepos && (
                        <div className="mb-16">
                            <div className="flex items-center gap-3 mb-8">
                                <Pin className="w-6 h-6 text-yellow-500" />
                                <h2 className="text-2xl font-bold text-yellow-400">Pinned Projects</h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
                            </div>
                            {filteredPinnedRepos.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full">
                                    {filteredPinnedRepos.map(renderRepositoryCard)}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="glass rounded-xl p-8 max-w-md mx-auto">
                                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Search className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">No Pinned Projects Match</h3>
                                        <p className="text-muted-foreground text-sm">
                                            No pinned projects match your current search criteria.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Other Repositories Section */}
                    {filteredOtherRepos.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Github className="w-6 h-6 text-purple-400" />
                                <h2 className="text-2xl font-bold text-purple-400">All Projects</h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full">
                                {filteredOtherRepos.map(renderRepositoryCard)}
                            </div>
                        </div>
                    )}

                    {/* Show message when no other repos match filter but there are other repos */}
                    {otherRepos && otherRepos.length > 0 && filteredOtherRepos.length === 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Github className="w-6 h-6 text-purple-400" />
                                <h2 className="text-2xl font-bold text-purple-400">All Projects</h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                            </div>
                            <div className="text-center py-8">
                                <div className="glass rounded-xl p-8 max-w-md mx-auto">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-purple-400 mb-2">No Projects Match</h3>
                                    <p className="text-muted-foreground text-sm">
                                        No other projects match your current search criteria.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredPinnedRepos.length === 0 && filteredOtherRepos.length === 0 && (
                        <div className="text-center py-20">
                            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-purple-400 mb-2">No Repositories Found</h3>
                                <p className="text-muted-foreground">
                                    No repositories match your search criteria. Try adjusting your filters.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default GitHubProjectsPage; 