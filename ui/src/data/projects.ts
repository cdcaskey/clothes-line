export interface Project {
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

export const projects: Project[] = [
  // {
  //   id: "loopedin",
  //   title: "LoopedIn",
  //   description: "All-in-one tool for collecting feedback, building roadmaps, sharing changelogs and publishing knowledge bases.",
  //   longDescription: "Worked on admin page, new public page redesign in SvelteKit and Node.js, implemented SSO, SAML, multi-domain features. Deployed on Heroku using Docker for the new public page deployment. Implemented Upstash QStash and Redis, Bull and sockets for event detection.",
  //   image: "/loopedin.png?w=500&h=300&fit=crop",
  //   tech: ["SvelteKit", "Node.js", "SSO", "SAML", "Docker", "Heroku", "Redis", "Bull", "Socket.io", "Upstash QStash"],
  //   github: "#",
  //   live: "https://app.loopedin.io/",
  //   featured: true,
  //   category: "Full Stack",
  //   private: true,
  //   company: "IIH Global",
  //   companyUrl: "https://www.iihglobal.com/"
  // },
  {
    id: "next-ui-library",
    title: "Next.js UI Library",
    description: "A comprehensive Next.js template featuring a modern UI library built with Tailwind CSS, shadcn/ui components, and comprehensive testing.",
    longDescription: "A comprehensive Next.js template featuring a modern UI library built with Tailwind CSS, shadcn/ui components, and comprehensive testing. This template provides a solid foundation for building scalable web applications with best practices in place. Includes 129 passing tests, custom Axios client with global error handling, full TypeScript support with Zod validation, responsive design with mobile-first approach, built-in dark mode, Zustand for state management, and optimized developer experience with ESLint and Prettier.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Jest", "React Testing Library", "Zustand", "Axios", "Zod", "ESLint", "Prettier"],
    github: "https://github.com/arjun-computer-geek/next-Ui-library",
    live: "https://next-ui-library.vercel.app",
    featured: true,
    category: "Frontend",
    company: "Self",
    companyUrl: "https://arjun-computer-geek.github.io/",
    private: false,

  },
  {
    id: "confidential",
    title: "confidential",
    description: "All-in-one tool for collecting feedback, building roadmaps, sharing changelogs and publishing knowledge bases.",
    longDescription: "Worked on admin page, new public page redesign in SvelteKit and Node.js, implemented SSO, SAML, multi-domain features. Deployed on Heroku using Docker for the new public page deployment. Implemented Upstash QStash and Redis, Bull and sockets for event detection.",
    image: "/private.jpg?w=500&h=300&fit=crop",
    tech: ["SvelteKit", "Node.js", "SSO", "SAML", "Docker", "Heroku", "Redis", "Bull", "Socket.io", "Upstash QStash"],
    github: "#",
    live: "",
    featured: true,
    category: "Full Stack",
    private: true,
    company: "IIH Global",
    companyUrl: "https://www.iihglobal.com/"
  },
  {
    id: "trading-platform",
    title: "Trading Platform",
    description: "Advanced trading platform with real-time market data, trade monitoring, and secure API integration with custom encryption.",
    longDescription: "Developed a comprehensive trading platform featuring real-time market data visualization using WebSocket connections, trade monitoring dashboard, and secure API integration with custom encryption/decryption for payload security. Implemented authentication and authorization systems, built responsive frontend design using Next.js, and integrated real-time market data feeds for live trading capabilities.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
    tech: ["Next.js", "WebSocket", "Real-time Data", "Custom Encryption", "Authentication", "Authorization", "Trading API", "Market Data"],
    github: "#",
    live: "",
    featured: true,
    category: "Frontend",
    private: true,
    company: "Freelance",
    companyUrl: ""
  },
  {
    id: "zyapaar",
    title: "Zyapaar",
    description: "India's Largest Business Networking Platform for MSMEs - B2B platform connecting buyers, suppliers, traders & service providers across the country.",
    longDescription: "Led the development of India's largest B2B networking platform for MSMEs. Built with Next.js, Redux, and StompJS for real-time chat features. The platform connects 70,000+ sellers, 50,000+ buyers, and 6,00,000+ products across India, providing verified business networking and digital identity for businesses.",
    image: "/zyapaar.png?w=500&h=300&fit=crop",
    tech: ["Next.js", "Redux", "StompJS", "Socket.io", "B2B Platform", "MSME", "Real-time Chat"],
    github: "#",
    live: "https://zyapaar.com/",
    featured: true,
    category: "Frontend",
    private: true,
    company: "Zyapaar",
    companyUrl: "https://in.linkedin.com/company/zyapaar-b2b-trade-marketplace"
  },
  {
    id: "binks-social",
    title: "BINKS SOCIAL",
    description: "Developed and implemented a feature-rich social media app enabling users to create, delete, and comment on posts; resulted in a 40% increase in daily active users and 25% higher user engagement levels.",
    longDescription: "A comprehensive social media application built with Node.js, MongoDB, and React. Features include user authentication, post creation and management, commenting system, and real-time interactions. The platform achieved significant user growth with 40% increase in daily active users and 25% higher engagement levels.",
    image: "/binks.png?w=500&h=300&fit=crop",
    tech: ["Node.js", "MongoDB", "React", "Express", "JWT", "Social Media", "Real-time"],
    github: "https://github.com/arjun-computer-geek/binks-assignment-backend",
    live: "https://blinks-test.onrender.com",
    featured: false,
    category: "Full Stack",
    company: "Self",
    companyUrl: "https://arjun-computer-geek.github.io/"
  },
  {
    id: "ecommerce-backend",
    title: "ECOMMERCE BACKEND",
    description: "An E-commerce backend where you can search, order and manages order and users.",
    longDescription: "A robust e-commerce backend system built with Express.js and MongoDB. Features include user authentication with JWT and cookies, product search functionality, order management, and user administration. Provides secure API endpoints for a complete e-commerce solution.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    tech: ["Express", "MongoDB", "JWT", "Cookies", "Authentication", "E-commerce", "API"],
    github: "https://github.com/arjun-computer-geek/eCommerceWebApp",
    live: "",
    featured: false,
    category: "Backend",
    company: "Self",
    companyUrl: "https://arjun-computer-geek.github.io/"
  },
  {
    id: "fab-tube",
    title: "FAB-TUBE",
    description: "A video library web app.",
    longDescription: "A comprehensive video library web application built with React and Material UI. Features include video browsing, search functionality, user authentication, and responsive design. Uses Context API for state management and MirageJS for mock API development.",
    image: "/fab-tube.png?w=500&h=300&fit=crop",
    tech: ["React", "Context API", "Material UI", "MirageJS", "Video Library", "Responsive Design"],
    github: "https://github.com/arjun-computer-geek/fabtube",
    live: "https://fabtube.netlify.app/",
    featured: false,
    category: "Frontend",
    company: "Self",
    companyUrl: "https://arjun-computer-geek.github.io/"
  },
  {
    id: "fabelle-learn",
    title: "FABELLE LEARN",
    description: "An eCommerce web app for selling courses.",
    longDescription: "A full-stack e-commerce platform specifically designed for selling online courses. Built with React frontend and Express.js backend with MongoDB database. Features include course browsing, user authentication, payment processing, and course management system.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
    tech: ["React", "Context API", "CSS", "Express", "MongoDB", "E-commerce", "Course Platform"],
    github: "https://github.com/arjun-computer-geek/fabelle-learn-react",
    live: "https://fabelle-learn-react.netlify.app/",
    featured: false,
    category: "Full Stack",
    company: "Self",
    companyUrl: "https://arjun-computer-geek.github.io/"
  },
  {
    id: "fabelle-ui",
    title: "FABELLE UI",
    description: "A UI component library for making UI faster.",
    longDescription: "A comprehensive UI component library built with vanilla HTML, CSS, and JavaScript. Provides reusable components to accelerate frontend development. Features include responsive design, accessibility considerations, and easy-to-use component system for rapid UI development.",
    image: "/fabelle-ui.png?w=500&h=300&fit=crop",
    tech: ["HTML", "CSS", "JavaScript", "UI Components", "Component Library", "Responsive Design"],
    github: "https://github.com/arjun-computer-geek/fabelle-ui",
    live: "https://fabelleui.netlify.app/",
    featured: false,
    category: "Frontend",
    company: "Self",
    companyUrl: "https://arjun-computer-geek.github.io/"
  },
  
];
