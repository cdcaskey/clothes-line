import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Search } from 'lucide-react';
import moment from 'moment';

interface DevToPost {
    id: number;
    title: string;
    description: string;
    url: string;
    published_at: string;
    cover_image: string | null;
    tag_list: string[];
}

interface DevToBlogFeedProps {
    limit?: number;
    showSearch?: boolean;
}

async function fetchDevToPosts(): Promise<DevToPost[]> {
    const res = await fetch('https://dev.to/api/articles?username=arjun_computer_geek&per_page=1000');
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

const DevToBlogFeed: React.FC<DevToBlogFeedProps> = ({ limit, showSearch = false }) => {
    const [search, setSearch] = useState('');
    const { data: posts = [], isLoading, error } = useQuery<DevToPost[]>({
        queryKey: ['devto-posts'],
        queryFn: fetchDevToPosts,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 60, // 1 hour
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    });

    const filteredPosts = useMemo(() => {
        if (!showSearch || !search.trim()) return posts;
        const q = search.toLowerCase();
        return posts.filter(post =>
            post.title.toLowerCase().includes(q) ||
            post.description.toLowerCase().includes(q) ||
            post.tag_list.some(tag => tag.toLowerCase().includes(q))
        );
    }, [posts, search, showSearch]);

    const displayPosts = limit ? filteredPosts.slice(0, limit) : filteredPosts;

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto text-center py-20">
                <div className="text-lg text-muted-foreground">Loading Dev.to posts...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto text-center py-20">
                <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Blog Posts</h3>
                    <p className="text-muted-foreground">
                        Unable to fetch blog posts from Dev.to. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {!showSearch && (
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Latest Dev.to Blog Posts
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Sharing insights about web development, best practices, and the latest technologies
                    </p>
                </div>
            )}

            {showSearch && (
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Blog Posts
                        </h1>
                        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Discover insights about web development, best practices, and the latest technologies
                        </p>
                    </div>

                    <div className="glass rounded-xl p-4 mb-8 max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search articles by title, description, or tags..."
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border text-base focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-muted-foreground"
                                aria-label="Search articles"
                            />
                        </div>
                    </div>

                    <div className="mb-6 text-center text-muted-foreground">
                        {filteredPosts.length === 0 ? (
                            <>No articles found matching your search.</>
                        ) : (
                            <>Showing {displayPosts.length} of {filteredPosts.length} articles</>
                        )}
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.map((post) => (
                    <div
                        key={post.id}
                        className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 glow-border group flex flex-col h-full"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                        </div>

                        <div className="text-sm text-muted-foreground mb-3">
                            {moment(post.published_at).format('MMM DD, YYYY')}
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-4 min-h-[4rem] line-clamp-3">
                            {post.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tag_list.slice(0, 3).map((tag) => (
                                <span key={tag} className="px-2 py-1 text-xs rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                    {tag}
                                </span>
                            ))}
                            {post.tag_list.length > 3 && (
                                <span className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground">
                                    +{post.tag_list.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="mt-auto pt-4">
                            <Button
                                asChild
                                size="sm"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
                            >
                                <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    Read on Dev.to
                                </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {displayPosts.length === 0 && search && (
                <div className="text-center py-20">
                    <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-purple-400 mb-2">No Articles Found</h3>
                        <p className="text-muted-foreground">
                            No articles match your search criteria. Try adjusting your search terms.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DevToBlogFeed; 
