"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code,
  Zap,
  Heart,
  Star,
  ChevronDown,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-float delay-1000" />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/30 rounded-full blur-md animate-float delay-500" />
      <div className="absolute bottom-20 right-10 w-8 h-8 bg-accent/30 rounded-full blur-sm animate-float delay-1500" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Espaciado extra solo en desktop para separar del header */}
      <div className="hidden md:block" aria-hidden="true">
        <div className="h-32" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-8 lg:space-y-12">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in md:mt-36 mt-10">
            <Badge
              variant="secondary"
              className="glass-button px-3 py-1 text-xs"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Available for work
            </Badge>
            <Badge
              variant="outline"
              className="glass-button px-3 py-1 text-xs border-primary/20"
            >
              <Zap className="w-3 h-3 mr-1" />
              Full Stack Developer
            </Badge>
            <Badge
              variant="outline"
              className="glass-button px-3 py-1 text-xs border-accent/20"
            >
              <Heart className="w-3 h-3 mr-1" />
              Based in Barcelona
            </Badge>
          </div>

          {/* Main Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Greeting */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-2xl border border-primary/20">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-primary">
                  Hello, I&apos;m David
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-balance leading-none tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Crafting
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                  Digital
                </span>
                <br />
                <span className="text-foreground text-glow">Experiences</span>
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Passionate full-stack developer with{" "}
                <span className="text-primary font-semibold">6+ years</span> of
                experience building scalable web applications. I specialize in{" "}
                <span className="text-accent font-semibold">
                  React, Next.js
                </span>
                , and modern web technologies to create exceptional user
                experiences.
              </p>

              {/* Tech Stack Preview */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "PostgreSQL",
                ].map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="glass-button px-3 py-1 text-xs hover:bg-primary/10 hover:border-primary/30 transition-all cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delayed">
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <a href="#projects" className="flex items-center gap-2">
                View My Work
                <Star className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg glass-button hover:bg-white/10 border-primary/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <a
                href="/david-ros-white-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Download CV
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 animate-fade-in-delayed-2">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Find me on
              </span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/rosdavid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="glass-card p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/10 group-hover:border-primary/30">
                    <Github className="h-6 w-6 group-hover:text-primary transition-colors" />
                    <span className="sr-only">GitHub</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                </a>

                <a
                  href="https://www.linkedin.com/in/david-ros-ferrer-40b2a4282/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="glass-card p-4 rounded-2xl hover:bg-accent/10 transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/10 group-hover:border-accent/30">
                    <Linkedin className="h-6 w-6 group-hover:text-accent transition-colors" />
                    <span className="sr-only">LinkedIn</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                </a>

                <a
                  href="mailto:davidros.dev@proton.me"
                  className="group relative"
                >
                  <div className="glass-card p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/10 group-hover:border-primary/30">
                    <Mail className="h-6 w-6 group-hover:text-primary transition-colors" />
                    <span className="sr-only">Email</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 animate-fade-in-delayed-2">
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Scroll to explore
              </span>
              <div className="relative">
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
