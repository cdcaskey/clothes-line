import { Calendar, MapPin, Building2, CheckCircle, ExternalLink } from "lucide-react";
import { experience } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import moment from "moment";

export const Experience = () => {
    const formatDate = (dateString: string) => {
        if (!dateString) return "Present";
        return moment(dateString).format('MMM YYYY');
    };

    // Calculate total years of experience using moment
    const calculateTotalExperience = () => {
        let totalMonths = 0;

        experience.forEach(exp => {
            const startDate = moment(exp.startDate);
            const endDate = exp.current ? moment() : moment(exp.endDate);

            const monthsDiff = endDate.diff(startDate, 'months');
            totalMonths += Math.max(0, monthsDiff);
        });

        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        if (years === 0) {
            return `${months}+`;
        } else if (months === 0) {
            return `${years}+`;
        } else {
            return `${years}.${months}+`;
        }
    };

    // Calculate unique companies count
    const uniqueCompanies = new Set(experience.map(exp => exp.company)).size;

    // Calculate unique technologies count
    const allTechnologies = experience.flatMap(exp => exp.technologies);
    const uniqueTechnologies = new Set(allTechnologies).size;

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Work Experience
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
                </div>

                <div className="space-y-8">
                    {experience.map((exp, index) => (
                        <div key={exp.id} className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 glow-border">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Left Column - Company Info */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="w-5 h-5 text-purple-400" />
                                        <div>
                                            {exp.website ? (
                                                <a
                                                    href={exp.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-lg font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center gap-2 group"
                                                >
                                                    {exp.company}
                                                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                </a>
                                            ) : (
                                                <h3 className="text-lg font-semibold text-purple-400">{exp.company}</h3>
                                            )}
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4" />
                                                {exp.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                                        </span>
                                    </div>

                                    <Badge
                                        variant={exp.current ? "default" : "outline"}
                                        className={exp.current
                                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                                            : "border-purple-500/50 text-purple-300"
                                        }
                                    >
                                        {exp.current ? "Current" : exp.type}
                                    </Badge>
                                </div>

                                {/* Right Column - Role Details */}
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <h4 className="text-xl font-semibold text-foreground mb-2">{exp.title}</h4>
                                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                                    </div>

                                    {/* Achievements */}
                                    <div>
                                        <h5 className="text-sm font-semibold text-purple-400 mb-3">Key Achievements:</h5>
                                        <ul className="space-y-2">
                                            {exp.achievements.map((achievement, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Technologies */}
                                    <div>
                                        <h5 className="text-sm font-semibold text-purple-400 mb-3">Technologies Used:</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Experience Summary */}
                <div className="mt-12 glass rounded-xl p-6 text-center">
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">Experience Summary</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">{calculateTotalExperience()}</div>
                            <div className="text-sm text-muted-foreground">Years of Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-pink-400">{uniqueCompanies - 1}</div>
                            <div className="text-sm text-muted-foreground">Companies Worked</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{uniqueTechnologies}+</div>
                            <div className="text-sm text-muted-foreground">Technologies Mastered</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}; 