"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Qubio",
    description:
      "Full-stack CMS for hospitality businesses to manage stocks, employees, and orders efficiently, including analytics and reporting features, smart alerts, marketplace, and multi-location support.",
    image: "/modern-ecommerce-dashboard.png",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "TypeScript",
      "Stripe",
      "PostgreSQL",
      "Supabase",
      "React",
      "Figma",
    ],
    github: "#",
    demo: "#",
    inProgress: true,
  },
  {
    title: "Unic.",
    description:
      "No-code web builder enabling users to create and deploy responsive websites with drag-and-drop functionality and customizable templates.",
    image: "/task-management-interface.png",
    tags: [
      "React",
      "Node.js",
      "Prisma",
      "MySQL",
      "Tailwind CSS",
      "TypeScript",
      "Next.js",
      "Figma",
    ],
    github: "#",
    demo: "#",
    inProgress: true,
  },
  {
    title: "GestNote",
    description:
      "Note-taking app with markdown support, tagging, and cloud sync across devices",
    image: "/gestnote.webp",
    tags: [
      "Tailwind CSS",
      "Next.js",
      "Convex",
      "TypeScript",
      "Node.js",
      "React",
      "Figma",
    ],
    github: "#",
    demo: "#",
    inProgress: false,
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            A selection of recent work demonstrating full-stack capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass-card overflow-hidden hover:scale-105 transition-transform"
            >
              <div
                className="aspect-video overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center"
                style={{ position: "relative" }}
              >
                {project.inProgress ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold text-primary">
                        In Progress
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Coming Soon
                      </p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full glass-card text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-card bg-transparent"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="glass-card" asChild>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
