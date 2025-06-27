import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const handleViewWork = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetInTouch = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        <div className="animate-fade-in">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block text-foreground mb-1 sm:mb-2">Hi, I'm  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Arjun
            </span></span>
          </h1>

          <div className="text-base xs:text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 animate-slide-in-right delay-300">
            <p className="mb-2">Full Stack Developer & Freelancer</p>
            <p className="text-sm xs:text-base sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Passionate about creating innovative web solutions with React, Next.js, and Node.js.
              I love building chat applications, e-commerce platforms, and internationalization features.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mb-8 sm:mb-12 animate-fade-in delay-500 px-4 sm:px-8">
            <Button
              size="lg"
              onClick={handleViewWork}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 font-semibold px-8 py-4 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full xs:w-auto min-w-[180px]"
            >
              View My Work
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleGetInTouch}
              className="border-2 border-purple-500/50 bg-transparent hover:bg-purple-500/10 hover:border-purple-400 text-foreground font-semibold px-8 py-4 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full xs:w-auto min-w-[180px]"
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center gap-4 xs:gap-6 animate-fade-in delay-700">
            <a
              href="https://github.com/arjun-computer-geek"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-400 transition-colors p-2 hover:scale-110 transform duration-200"
            >
              <Github className="w-5 h-5 xs:w-6 xs:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/arjun-computer-geek"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-400 transition-colors p-2 hover:scale-110 transform duration-200"
            >
              <Linkedin className="w-5 h-5 xs:w-6 xs:h-6" />
            </a>
            <a
              href="mailto:arjun2000raj@gmail.com"
              className="text-muted-foreground hover:text-purple-400 transition-colors p-2 hover:scale-110 transform duration-200"
            >
              <Mail className="w-5 h-5 xs:w-6 xs:h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 xs:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <div className="w-5 h-8 xs:w-6 xs:h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
          <div className="w-1 h-2 xs:h-3 bg-purple-400 rounded-full mt-1 xs:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
