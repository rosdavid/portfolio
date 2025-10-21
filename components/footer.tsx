"use client";

import {
  Github,
  Linkedin,
  Mail,
  Heart,
  Sparkles,
  Code,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/rosdavid",
    color: "hover:text-primary",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/david-ros-ferrer-40b2a4282/",
    color: "hover:text-blue-500",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:davidros.dev@proton.me",
    color: "hover:text-primary",
  },
];

const footerLinks = {
  navigation: [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "CV", href: "/david-ros-white-cv.pdf" },
    { name: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-background via-background/95 to-background/90 border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                    David Ros
                  </h3>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                  Full-stack developer passionate about creating exceptional
                  digital experiences with modern technologies and clean code.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="icon"
                      className={`glass-button hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 ${social.color}`}
                      asChild
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Navigation
                </h4>
                <ul className="space-y-3">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources Links */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-primary" />
                  Resources
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span>© {new Date().getFullYear()} David Ros. Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>and lots of</span>
                <Coffee className="w-4 h-4 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Spacer */}
      <div className="md:hidden h-20" />
    </footer>
  );
}
