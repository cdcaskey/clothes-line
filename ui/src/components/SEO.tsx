import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
    noindex?: boolean;
    nofollow?: boolean;
}

export const SEO = ({
    title = "Arjun Kumar — Full Stack Developer & Freelancer | MERN Stack, React, Node.js, TypeScript, Docker, Svelte Expert",
    description = "Arjun Kumar is a passionate Full Stack Developer and freelancer with expertise in MERN stack, React, Node.js, MongoDB, Docker, TypeScript, Svelte, Next.js, and modern web technologies. Explore my portfolio, open-source projects, technical blog posts, and professional experience.",
    keywords = "Arjun Kumar, Full Stack Developer, Freelancer, React Developer, MERN Stack, Node.js, MongoDB, Express.js, React.js, TypeScript, JavaScript, Svelte, SvelteKit, Next.js, Docker, Tailwind CSS, Material UI, Redux, Zustand, Socket.io, JWT, Heroku, Web Development, Frontend Developer, Backend Developer, API Development, Database Design, DevOps, Cloud Computing, Portfolio, GitHub, Open Source, Technical Blog, Software Engineer, Web Applications, Freelance Developer, Remote Developer, Contract Developer",
    image = "https://arjun-computer-geek.github.io/opengraph-arjun.png",
    url = "https://arjun-computer-geek.github.io/",
    type = "website",
    author = "Arjun Kumar",
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    noindex = false,
    nofollow = false,
}: SEOProps) => {
    const robots = noindex || nofollow ? `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}` : 'index, follow';

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={robots} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Arjun Kumar - Full Stack Developer & Freelancer Portfolio" />
            <meta property="og:site_name" content="Arjun Kumar - Developer Portfolio" />
            <meta property="og:locale" content="en_US" />
            {author && <meta property="og:author" content={author} />}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {section && <meta property="article:section" content={section} />}
            {tags.map((tag, index) => (
                <meta key={index} property="article:tag" content={tag} />
            ))}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
            <meta property="twitter:site" content="@arjun-computer-geek" />
            <meta property="twitter:creator" content="@arjun-computer-geek" />

            {/* LinkedIn */}
            <meta property="linkedin:owner" content="arjun-kumar" />
            <meta property="linkedin:title" content={title} />
            <meta property="linkedin:description" content={description} />

            {/* Additional Meta Tags */}
            <meta name="application-name" content="Arjun Kumar Portfolio" />
            <meta name="apple-mobile-web-app-title" content="Arjun Kumar" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="msapplication-config" content="/browserconfig.xml" />
        </Helmet>
    );
}; 