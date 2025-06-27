import { Mail, Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  const handleResumeClick = () => {
    window.open("/Arjun_resume.pdf", "_blank");
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-2 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-2">
            Let's Connect
          </h2>
          <div className="w-12 xs:w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        <div className="glass rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-6 sm:p-8 md:p-12 text-center relative">
          <div className="mb-6 xs:mb-8">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold mb-3 xs:mb-4 px-2">Ready to Start a Project?</h3>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              I'm a Full Stack Developer and freelancer, always excited to work on new projects and collaborate with amazing people.
              Whether you have a project in mind or just want to chat about tech, feel free to reach out!
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center mb-6 xs:mb-8 relative z-10 px-2">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 cursor-pointer relative z-10 text-sm xs:text-base px-4 xs:px-6 py-2 xs:py-3"
              onClick={handleResumeClick}
            >
              <Download className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center gap-4 xs:gap-6 relative z-10 mb-6 xs:mb-8">
            <a
              href="https://github.com/arjun-computer-geek"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 xs:p-3 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:scale-110 transition-all duration-200 cursor-pointer relative z-10"
            >
              <Github className="w-5 h-5 xs:w-6 xs:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/arjun-computer-geek"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 xs:p-3 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:scale-110 transition-all duration-200 cursor-pointer relative z-10"
            >
              <Linkedin className="w-5 h-5 xs:w-6 xs:h-6" />
            </a>
            <a
              href="mailto:arjun2000raj@gmail.com"
              className="p-2 xs:p-3 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:scale-110 transition-all duration-200 cursor-pointer relative z-10"
            >
              <Mail className="w-5 h-5 xs:w-6 xs:h-6" />
            </a>
          </div>

          <div className="pt-6 xs:pt-8 border-t border-border">
            <p className="text-xs xs:text-sm text-muted-foreground px-2">
              © 2024 Arjun. Built with ❤️ using React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
