import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { SkillsSection } from "@/components/skills-section";
import { AppShowcase } from "@/components/app-showcase";
import { ProjectsSection } from "@/components/projects-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { Navigation } from "@/components/navigation";
import { FloatingShapes } from "@/components/floating-shapes";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingShapes />
      <Navigation />
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal delay={0.4}>
        <ExperienceSection />
      </ScrollReveal>
      <ScrollReveal delay={0.6}>
        <EducationSection />
      </ScrollReveal>
      <ScrollReveal delay={0.8}>
        <SkillsSection />
      </ScrollReveal>
      <ScrollReveal delay={1.0}>
        <AppShowcase />
      </ScrollReveal>
      <ScrollReveal delay={1.2}>
        <ProjectsSection />
      </ScrollReveal>
      <ScrollReveal delay={1.4}>
        <BlogSection />
      </ScrollReveal>
      <ScrollReveal delay={1.6}>
        <ContactSection />
      </ScrollReveal>
    </main>
  );
}
