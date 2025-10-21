"use client";

import { Card } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Building Experiences That Matter
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a developer passionate about crafting accessible,
                pixel-perfect user interfaces that blend thoughtful design with
                robust engineering. My favorite work lies at the intersection of
                design and development.
              </p>
              <p>
                With expertise spanning front-end frameworks, back-end systems,
                and UX design principles, I create comprehensive solutions that
                not only look great but are meticulously built for performance
                and usability.
              </p>
              <p>
                Currently specializing in React, Next.js, TypeScript, and modern
                web technologies (but with a strong fundamental of classic web
                development technologies), I contribute to building scalable
                applications that meet web accessibility standards and deliver
                exceptional user experiences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="glass-card p-6 space-y-2 hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-primary">6+</div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </Card>
            <Card className="glass-card p-6 space-y-2 hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-accent">10+</div>
              <div className="text-sm text-muted-foreground">
                Projects Completed
              </div>
            </Card>
            <Card className="glass-card p-6 space-y-2 hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-primary">20+</div>
              <div className="text-sm text-muted-foreground">
                Skills Acquired
              </div>
            </Card>
            <Card className="glass-card p-6 space-y-2 hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Dedication</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
