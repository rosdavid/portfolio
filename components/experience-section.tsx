"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      company: "elpernilet",
      position: "Fullstack Developer & UI/UX Designer",
      location: "Navarcles, Spain",
      period: "Sep 2025 - Oct 2025 (On demand project)",
      description:
        "Developed a professional web platform for premium catering services in Spain, featuring ham cutters, gourmet beverage bars, and waitstaff for exclusive events. Built with Next.js, React, TypeScript, Tailwind CSS, Supabase, and deployed on Vercel to generate qualified leads and position the brand as a national reference in premium catering.",
      technologies: [
        "React",
        "Tailwind CSS",
        "CSS",
        "TypeScript",
        "Supabase",
        "Next.js",
        "Figma",
        "Git",
        "GitHub",
        "Vercel",
        "PostgreSQL",
        "Resend",
        "RESTful APIs",
        "npm",
        "Notion",
        "Google Analytics",
        "Google Search Console",
      ],
      achievements: [
        "Increased lead generation by 30% within the first three months through targeted SEO and user-centric design",
        "Implemented comprehensive SEO optimization strategies to improve online visibility and lead generation",
        "Developed fully responsive design ensuring optimal user experience across all devices",
        "Built robust admin panel for efficient content management and real-time updates",
        "Created email system streamlining budget process for premium catering services",
        "Implemented analytics dashboard for data-driven insights and performance tracking",
        "Optimized platform performance and security for reliable operation at scale",
      ],
    },
    {
      id: 2,
      company: "TOUS",
      position: "Senior Front-End Developer",
      location: "Manresa, Spain",
      period: "Jul 2024 - Jul 2025",
      description:
        "Led front-end development initiatives focusing on performance, scalability, and maintainability as part of the CRO team. Implemented advanced problem-solving techniques and A/B testing to optimize user experience and conversion rates. Collaborated with backend teams for seamless API integration and state management.",
      technologies: [
        "Vue",
        "Nuxt.js",
        "Git",
        "GitLab",
        "CI/CD",
        "JavaScript",
        "CSS",
        "SCSS",
        "Bootstrap",
        "RESTful APIs",
        "Docker",
        "Kubernetes",
        "npm",
        "Directus",
        "JIRA",
        "Confluence",
        "SAP Hybris",
        "Google Analytics",
        "ABTasty",
        "Dynamic Yield",
      ],
      achievements: [
        "Enhanced user experience and conversion rates (around 10%) through advanced problem-solving and optimization techniques",
        "Boosted app performance and scalability via streamlined front-end coding",
        "Deployed A/B testing and evidence-based trials, boosting conversion metrics",
        "Guaranteed top-tier user experience through multi-browser support and sophisticated troubleshooting",
        "Partnered with backend squads for smooth API connections and data flow management",
      ],
    },
    {
      id: 3,
      company: "liquoly",
      position: "Full Stack Developer & UI/UX Designer",
      location: "Manresa, Spain",
      period: "Gen 2023 - Jul 2024",
      description:
        "Managed e-commerce operations for beverages and gourmet products on Shopify platform. Oversaw brand development, provided technical support, executed marketing and advertising campaigns, optimized SEO, and led site development and design.",
      technologies: [
        "Remix",
        "TypeScript",
        "GraphQL",
        "JSON",
        "Tailwind CSS",
        "JSON",
        "jQuery",
        "Bootstrap",
        "Liquid",
        "Shopify",
        "RESTful APIs",
        "Figma",
        "Git",
        "GitHub",
        "Hydrogen",
        "Next.js",
        "npm",
        "Notion",
        "Google Analytics",
        "Google Search Console",
      ],
      achievements: [
        "Increased sales by 25% through strategic brand development and marketing initiatives",
        "Developed and strengthened brand identity for beverages and gourmet products",
        "Provided comprehensive technical support ensuring smooth e-commerce operations",
        "Executed effective marketing and advertising strategies to drive sales",
        "Optimized SEO to improve online visibility and traffic",
        "Led site development and design for enhanced user experience on Shopify",
      ],
    },
    {
      id: 4,
      company: "elpernilet",
      position: "Front-End Developer & UI/UX Designer",
      location: "Navarcles, Spain",
      period: "Sep 2019 - Gen 2024",
      description:
        "Led the transformation from Shopify e-commerce to a dedicated landing page for event services. Managed brand development, provided technical support, executed marketing and advertising campaigns, optimized SEO, and oversaw site development and design.",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "JSON",
        "Figma",
        "Git",
        "GitHub",
        "APIs",
        "Notion",
        "Google Search Console",
        "Google Analytics",
      ],
      achievements: [
        "Developed and evolved brand identity during business transformation to event services",
        "Provided comprehensive technical support throughout the transition process",
        "Executed strategic marketing and advertising campaigns for event services",
        "Optimized SEO to boost online visibility and lead generation",
        "Designed and developed an effective landing page for enhanced user experience",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey in software development and the companies I&apos;ve had
            the privilege to work with.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              className="glass-card border border-white/10 hover:border-primary/20 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {exp.position}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span className="font-medium text-foreground">
                          {exp.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="text-primary text-lg">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <Badge
                        key={tech + "-" + idx}
                        variant="secondary"
                        className="glass-button"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
