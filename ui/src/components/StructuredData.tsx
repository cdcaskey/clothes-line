import { projects } from "@/data/projects";
import { Helmet } from "react-helmet-async";

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tech: string[];
    github: string;
    live: string;
    featured: boolean;
    category: string;
    private?: boolean;
    company?: string;
    companyUrl?: string;
}

interface Article {
    title: string;
    description: string;
    coverImage?: string;
    url: string;
    publishedAt: string;
    updatedAt: string;
    tags?: string[];
}

interface StructuredDataProps {
    type: 'homepage' | 'projects' | 'blog' | 'project' | 'article';
    data?: Project | Article;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
    const generateHomepageSchema = () => ({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Arjun Kumar - Developer Portfolio",
        "url": "https://arjun-computer-geek.github.io/",
        "description": "Full Stack Developer and Freelancer Portfolio showcasing projects, blog posts, and professional experience",
        "author": {
            "@type": "Person",
            "name": "Arjun Kumar",
            "jobTitle": "Full Stack Developer & Freelancer",
            "description": "Experienced Full Stack Developer and freelancer specializing in MERN stack, React, Node.js, MongoDB, Docker, and modern web technologies",
            "url": "https://arjun-computer-geek.github.io/",
            "image": "https://arjun-computer-geek.github.io/profile.png",
            "sameAs": [
                "https://github.com/arjun-computer-geek",
                "https://x.com/arjun_comp_geek",
                "https://www.linkedin.com/in/arjun-computer-geek",
                "https://dev.to/arjun_computer_geek"
            ],
            "knowsAbout": [
                "React.js",
                "Node.js",
                "MongoDB",
                "Express.js",
                "TypeScript",
                "JavaScript",
                "Docker",
                "Svelte",
                "SvelteKit",
                "Next.js",
                "Tailwind CSS",
                "Material UI",
                "Redux",
                "Zustand",
                "Socket.io",
                "JWT",
                "Heroku",
                "Web Development",
                "API Development",
                "Database Design",
                "Frontend Development",
                "Backend Development",
                "Freelance Development",
                "Remote Development"
            ],
            "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Above kalyan homeo click, rampur road, Bazar samiti main gate",
                "addressLocality": "Patna",
                "postalCode": "800006",
                "addressCountry": "IN",
                "addressRegion": "Bihar"
            }
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://arjun-computer-geek.github.io/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    });

    const generateProjectsSchema = () => ({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Arjun Kumar's Development Projects",
        "description": "A comprehensive collection of web development projects including React, Node.js, MongoDB, and Docker applications",
        "url": "https://arjun-computer-geek.github.io/projects",
        "numberOfItems": projects.length,
        "itemListElement": projects.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "SoftwareApplication",
                "name": project.title,
                "description": project.description,
                "url": project.live,
                "applicationCategory": project.category,
                "operatingSystem": "Web Browser",
                "author": {
                    "@type": "Person",
                    "name": "Arjun Kumar"
                },
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock"
                },
                "softwareVersion": "1.0",
                "datePublished": "2024-01-15",
                "image": project.image,
                "keywords": project.tech.join(", ")
            }
        }))
    });

    const generateProjectSchema = (project: Project) => ({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.description,
        "url": project.live,
        "applicationCategory": project.category,
        "operatingSystem": "Web Browser",
        "author": {
            "@type": "Person",
            "name": "Arjun Kumar",
            "jobTitle": "Full Stack Developer & Freelancer"
        },
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
        },
        "softwareVersion": "1.0",
        "datePublished": "2024-01-15",
        "image": project.image,
        "keywords": project.tech.join(", "),
        "featureList": project.tech,
        "screenshot": project.image
    });

    const generateBlogSchema = () => ({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Arjun Kumar's Tech Blog",
        "description": "Technical blog posts about web development, React, Node.js, and modern web technologies",
        "url": "https://arjun-computer-geek.github.io/blog",
        "author": {
            "@type": "Person",
            "name": "Arjun Kumar",
            "jobTitle": "Full Stack Developer & Freelancer"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Arjun Kumar",
            "logo": {
                "@type": "ImageObject",
                "url": "https://arjun-computer-geek.github.io/profile.png"
            }
        }
    });

    const generateArticleSchema = (article: Article) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.description,
        "image": article.coverImage || "https://arjun-computer-geek.github.io/opengraph-arjun.png",
        "author": {
            "@type": "Person",
            "name": "Arjun Kumar",
            "jobTitle": "Full Stack Developer & Freelancer"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Arjun Kumar",
            "logo": {
                "@type": "ImageObject",
                "url": "https://arjun-computer-geek.github.io/profile.png"
            }
        },
        "datePublished": article.publishedAt,
        "dateModified": article.updatedAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": article.url
        },
        "keywords": article.tags?.join(", ") || "web development, programming, technology"
    });

    const getSchema = () => {
        switch (type) {
            case 'homepage':
                return generateHomepageSchema();
            case 'projects':
                return generateProjectsSchema();
            case 'blog':
                return generateBlogSchema();
            case 'project':
                return generateProjectSchema(data as Project);
            case 'article':
                return generateArticleSchema(data as Article);
            default:
                return generateHomepageSchema();
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(getSchema(), null, 2)}
            </script>
        </Helmet>
    );
}; 