"use client";

import type React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-32 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Let&apos;s Connect</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Have a project in mind or want me in your team? Let&apos;s discuss
            how we can create something amazing together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="glass-card p-6 group hover:scale-105 transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40">
                  <div className="flex items-center gap-4">
                    <div className="glass-card p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">Email</h4>
                      <a
                        href="mailto:davidros.dev@proton.me"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group/link"
                      >
                        davidros.dev@proton.me
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="glass-card p-6 group hover:scale-105 transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40">
                  <div className="flex items-center gap-4">
                    <div className="glass-card p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">Phone</h4>
                      <a
                        href="tel:+34644577973"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group/link"
                      >
                        +34 644 577 973
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="glass-card p-6 group hover:scale-105 transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40">
                  <div className="flex items-center gap-4">
                    <div className="glass-card p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">Location</h4>
                      <p className="text-muted-foreground flex items-center gap-2">
                        Barcelona, Spain
                        <span className="text-primary">🇪🇸</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold mb-4">Find me online</h4>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-button hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://github.com/rosdavid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="glass-button hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://linkedin.com/in/david-ros-ferrer-40b2a4282/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div className="glass-panel rounded-3xl p-8 md:p-12 text-center space-y-8">
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full animate-bounce delay-500" />
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-primary/30 rounded-full animate-pulse" />

              {/* Main Content */}
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto glass-card rounded-2xl flex items-center justify-center">
                  <Mail className="w-12 h-12 text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Start a Project?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I&apos;m always excited to work on new challenges and bring
                    creative ideas to life. Whether it&apos;s a web application,
                    mobile app, or something completely different, let&apos;s
                    discuss your vision.
                  </p>
                </div>

                {/* Stats or Skills Preview */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10+</div>
                    <div className="text-sm text-muted-foreground">
                      Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">6+</div>
                    <div className="text-sm text-muted-foreground">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">
                      Dedication
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass-card inline-block px-8 py-4 rounded-2xl">
            <p className="text-muted-foreground">
              Prefer email? Send me a message at{" "}
              <a
                href="mailto:davidros.dev@proton.me"
                className="text-primary hover:underline font-medium"
              >
                davidros.dev@proton.me
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
