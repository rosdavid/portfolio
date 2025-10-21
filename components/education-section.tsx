"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Calendar, ExternalLink } from "lucide-react";

const education = [
  {
    id: 1,
    type: "Self-taught",
    institution: "Self-taught",
    degree: "Self-taught Developer",
    location: "Manresa, Spain",
    period: "2012 - Present",
    description:
      "Focused on learning software engineering and web development through projects, and continuous self-improvement.",
  },
];

const certifications = [
  {
    id: 1,
    title: "Certificate, Responsive Web Design (500 hours)",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "-",
    url: "-",
    description:
      "Comprehensive training in HTML, CSS, Flexbox, Grid, and responsive design principles.",
  },
  {
    id: 2,
    title:
      "Certificate, Introduction to Web Development: HTML and CSS (1/2) (45 hours)",
    issuer: "Google",
    date: "2022",
    credentialId: "-",
    url: "-",
    description:
      "Fundamental concepts of web development, focusing on HTML5 and CSS3.",
  },
  {
    id: 3,
    title: "CS50's Introduction to Computer Science",
    issuer: "Harvard University",
    date: "2024 - Present",
    credentialId: "-",
    url: "-",
    description:
      "Comprehensive understanding of computer science fundamentals, algorithms, and programming languages including C, Python, and JavaScript.",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Education & Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic background and professional certifications that shape my
            expertise.
          </p>
        </div>

        <div className="space-y-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <Card
                  key={edu.id}
                  className="glass-card border border-white/10 hover:border-primary/20 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {edu.degree}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            <span className="font-medium text-foreground">
                              {edu.institution}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <Card
                  key={cert.id}
                  className="glass-card border border-white/10 hover:border-primary/20 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-lg mb-2">{cert.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {cert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        ID: {cert.credentialId}
                      </span>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
