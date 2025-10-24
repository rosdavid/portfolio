"use client";

import { Card } from "@/components/ui/card";
import { Code2, Palette, Database, Zap, Wrench } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Front-End Development",
    description: "List of my front-end skills",
    skills: [
      "HTML",
      "CSS",
      "SCSS",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "Nuxt.js",
      "Bootstrap",
      "jQuery",
      "Next.js",
      "Liquid",
    ],
  },
  {
    icon: Database,
    title: "Back-End Development",
    description: "List of my back-end skills",
    skills: [
      "Node.js",
      "Next.js",
      "Nuxt.js",
      "TypeScript",
      "JavaScript",
      "PostgreSQL",
      "GraphQL",
      "RESTful APIs",
      "Prisma",
      "Supabase",
      "Convex",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "JSON",
    ],
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "List of tools I know",
    skills: [
      "Figma",
      "Shopify",
      "Hydrogen",
      "Directus",
      "Resend",
      "SAP Hybris",
      "Google Search Console",
      "Google Analytics",
      "Git",
      "GitHub",
      "GitLab",
      "Vercel",
      "ABTasty",
      "Dynamic Yield",
      "JIRA",
      "Confluence",
      "npm",
    ],
  },
  {
    icon: Zap,
    title: "Performance & Optimization",
    description: "List of my performance & optimization skills",
    skills: [
      "Web Vitals",
      "SEO",
      "Accessibility",
      "Jest",
      "Playwright",
      "Lighthouse",
    ],
  },
];

const softSkills = [
  "Leadership",
  "Team Collaboration",
  "Problem Solving",
  "Communication",
  "Project Management",
  "Agile Methodology",
  "Mentoring",
  "Time Management",
];

const languages = [
  { name: "Spanish", level: "Native", proficiency: 100 },
  { name: "English", level: "Professional", proficiency: 90 },
  { name: "Catalan", level: "Native", proficiency: 100 },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Technical Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            A comprehensive skill set spanning the full development lifecycle
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="glass-card p-8 space-y-4 hover:scale-105 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="glass-card p-3 rounded-lg">
                  <skill.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skill.skills.map((s, idx) => (
                      <span
                        key={s + "-" + idx}
                        className="text-xs px-3 py-1 rounded-full glass-card text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Languages & Soft Skills */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Soft Skills */}
          <Card className="glass-card p-8 space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary" />
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full glass-card text-sm font-medium hover:bg-primary/10 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
          {/* Languages */}
          <Card className="glass-card p-8 space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {lang.level}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${lang.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
