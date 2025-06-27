export interface Experience {
  id: string;
  title: string;
  company: string;
  website?: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'contract' | 'freelance';
}

export const experience: Experience[] = [
  {
    id: "iih-global-fullstack",
    title: "Full Stack (MERN) Developer",
    company: "IIH Global",
    website: "https://www.iihglobal.com",
    location: "Ahmedabad, Gujarat, India",
    startDate: "2024-04",
    endDate: "2025-06",
    current: true,
    description: "Working as a Full Stack Developer specializing in MERN stack development with focus on custom domain and Single Sign-On (SSO) systems.",
    achievements: [
      "Developed custom domain and Single Sign-On (SSO) login systems using Node.js and EJS",
      "Implemented multi-domain login functionality with Logto, enhancing user authentication across multiple platforms",
      "Worked with legacy EJS templates and modernized public-facing pages with improved design and functionality",
      "Upgraded critical parts of the application with new code architecture, enhanced UI/UX design, and optimized database structures",
      "Deployed and hosted applications using Docker containers on Heroku platform for scalable cloud deployment"
    ],
    technologies: ["Node.js", "SvelteKit", "EJS", "Logto", "SSO", "Multi-domain", "Authentication", "Docker", "Heroku", "Database Optimization", "UI/UX Design"],
    type: "full-time"
  },
  {
    id: "zyapaar-frontend",
    title: "Frontend Developer",
    company: "Zyapaar",
    website: "https://zyapaar.com",
    location: "Ahmedabad, Gujarat, India",
    startDate: "2022-09",
    endDate: "2024-04",
    current: false,
    description: "Designed and developed frontend applications with focus on chat functionality and B2B solutions.",
    achievements: [
      "Designed and developed a chat app using Socket.io for a B2B application, resulting in a 40% increase in daily active users and 25% higher user engagement levels",
      "Set up the entire project in Next.js, including implementing internationalization features",
      "Collaborated with a team to complete that project in 3-4 months",
      "Hosted that application on AWS using Nginx and Docker with collaboration of DevOps",
      "Developed an upload catalogue feature using data extraction from Excel sheets, streamlining product addition and management",
      "Built an admin panel using React to provide efficient content management and control"
    ],
    technologies: [
      "React", "Next.js", "Socket.io", "Internationalization (i18n)", 
      "Tailwind CSS", "Material UI", "Styled Components", "AWS", 
      "Nginx", "Docker", "Excel Data Extraction", "Admin Panel"
    ],
    type: "full-time"
  },
  {
    id: "neogcamp-teaching-assistant",
    title: "Student Trainee",
    company: "NeogCamp",
    website: "https://neog.camp",
    location: "Remote",
    startDate: "2022-01",
    endDate: "2022-07",
    current: false,
    description: "Completed intensive web development bootcamp training program, learning modern web technologies and best practices through hands-on projects.",
    achievements: [
      "Completed comprehensive web development curriculum covering HTML, CSS, JavaScript, and React fundamentals",
      "Built multiple projects including responsive websites and interactive web applications",
      "Learned version control with Git and collaborative development workflows",
      "Developed strong problem-solving skills through debugging and troubleshooting exercises",
      "Gained practical experience with modern web development tools and frameworks"
    ],
    technologies: [
      "HTML", "CSS", "JavaScript", "React", "Git", "Web Development", 
      "Responsive Design", "Frontend Development", "Project Development"
    ],
    type: "contract"
  }
]; 