import { useGitHubStats } from "@/hooks/use-github";
import { Loader2 } from "lucide-react";

export const Skills = () => {
  const { data: stats, isLoading } = useGitHubStats();

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 100 },
        { name: "Next.js", level: 100 },
        { name: "SvelteKit", level: 100 },
        { name: "TypeScript", level: 100 },
        { name: "Tailwind CSS", level: 100 },
        { name: "Material UI", level: 95 },
        { name: "Styled Components", level: 85 },
      ]
    },
    {
      title: "Backend & State",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 95 },
        { name: "Redux", level: 95 },
        { name: "Zustand", level: 95 },
        { name: "Socket.io", level: 90 },
        { name: "JWT", level: 100 },
      ]
    },
    {
      title: "Database & DevOps",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "MySQL", level: 80 },
        { name: "Firebase", level: 85 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Netlify", level: 85 },
        { name: "Vercel", level: 90 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-6 text-center text-purple-400">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${(categoryIndex * 3 + skillIndex) * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Stats */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-purple-400">GitHub Stats</h3>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
          ) : (
            <>
              {/* Dynamic GitHub Stats Cards */}
              {stats && (
                <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{stats.totalRepos}</div>
                    <div className="text-sm text-muted-foreground">Total Repositories</div>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.totalStars}</div>
                    <div className="text-sm text-muted-foreground">Total Stars</div>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{stats.totalForks}</div>
                    <div className="text-sm text-muted-foreground">Total Forks</div>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{Object.keys(stats.topLanguages).length}</div>
                    <div className="text-sm text-muted-foreground">Languages Used</div>
                  </div>
                </div>
              )}

              {/* Top Languages from GitHub */}
              {stats && Object.keys(stats.topLanguages).length > 0 && (
                <div className="glass rounded-xl p-8 max-w-4xl mx-auto mb-8">
                  <h4 className="text-xl font-semibold mb-6 text-purple-400">Top Languages from GitHub</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(stats.topLanguages).slice(0, 8).map(([language, count]) => (
                      <div key={language} className="flex justify-between items-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <span className="font-medium text-purple-300">{language}</span>
                        <span className="text-sm text-muted-foreground">{count} repos</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GitHub Stats Images */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="glass rounded-xl p-6">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=arjun-computer-geek&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117"
                    alt="GitHub Stats"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="glass rounded-xl p-6">
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=arjun-computer-geek&layout=compact&theme=radical&hide_border=true&bg_color=0D1117"
                    alt="Top Languages"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
