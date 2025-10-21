"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Dynamic imports with proper loading handling
const TodoDemo = dynamic(
  () =>
    import("@/components/demos/todo-demo").then((module) => ({
      default: module.TodoDemo,
    })),
  {
    loading: () => <DemoLoadingSpinner />,
  }
);
const ExpenseDemo = dynamic(
  () =>
    import("@/components/demos/expense-demo").then((module) => ({
      default: module.ExpenseDemo,
    })),
  {
    loading: () => <DemoLoadingSpinner />,
  }
);
const AnalyticsDemo = dynamic(
  () =>
    import("@/components/demos/analytics-demo").then((module) => ({
      default: module.AnalyticsDemo,
    })),
  {
    loading: () => <DemoLoadingSpinner />,
  }
);
const RealtimeCollabDemo = dynamic(
  () =>
    import("@/components/demos/realtime-collab").then((module) => ({
      default: module.RealtimeCollabDemo,
    })),
  {
    loading: () => <DemoLoadingSpinner />,
  }
);
// DataVizDashboard loaded normally to avoid chunk loading issues with Recharts
import { DataVizDashboard } from "@/components/demos/data-viz-dashboard";
const AiChatDemo = dynamic(
  () =>
    import("@/components/demos/ai-chat-demo").then((module) => ({
      default: module.AiChatDemo,
    })),
  {
    loading: () => <DemoLoadingSpinner />,
  }
);
const SaaSLandingDemo = dynamic(
  () =>
    import("@/components/demos/saas-landing-demo").then((module) => ({
      default: module.SaaSLandingDemo,
    })),
  {
    loading: () => <DemoLoadingSpinner />,
  }
);
const SocialFeedDemo = dynamic(
  () =>
    import("@/components/demos/social-feed-demo").then((module) => ({
      default: module.SocialFeedDemo,
    })),
  {
    loading: () => <DemoLoadingSpinner />,
  }
);

// Loading component for dynamic imports
function DemoLoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Loading demo...</p>
      </div>
    </div>
  );
}

const demos = [
  {
    id: "realtime",
    title: "Real-Time Collaboration",
    description: "Live cursors, sticky notes, and multi-user interactions",
    component: RealtimeCollabDemo,
    tags: ["WebSocket", "Real-time", "Collaboration"],
  },
  {
    id: "dataviz",
    title: "Data Visualization",
    description: "Interactive charts, live updates, and business analytics",
    component: DataVizDashboard,
    tags: ["Recharts", "Analytics", "Real-time"],
  },
  {
    id: "ai-chat",
    title: "Chatbot Assistant",
    description: "Conversational chat with streaming responses and context",
    component: AiChatDemo,
    tags: ["Support", "Chatbot", "NLP"],
  },
  {
    id: "todo",
    title: "Task Manager",
    description:
      "Full-featured todo app with drag & drop, filters, and local storage",
    component: TodoDemo,
    tags: ["React", "TypeScript", "Drag & Drop"],
  },
  {
    id: "expense",
    title: "Expense Tracker",
    description:
      "Financial management with charts, categories, and budget tracking",
    component: ExpenseDemo,
    tags: ["React", "Charts", "State Management"],
  },
  {
    id: "analytics",
    title: "Analytics Dashboard",
    description:
      "Real-time data visualization with interactive charts and metrics",
    component: AnalyticsDemo,
    tags: ["Next.js", "Recharts", "Real-time"],
  },
  {
    id: "saas-landing",
    title: "SaaS Landing Page",
    description:
      "Professional SaaS landing with features, pricing, testimonials, and CTA",
    component: SaaSLandingDemo,
    tags: ["Landing", "SaaS", "UI", "Marketing"],
  },
  {
    id: "social-feed",
    title: "Live Social Feed",
    description:
      "Simulación de red social con posts en tiempo real y streaming",
    component: SocialFeedDemo,
    tags: ["WebSockets", "Streaming", "Feed", "Social"],
  },
];

export function AppShowcase() {
  const [activeDemo, setActiveDemo] = useState(demos[0].id);
  const ActiveComponent = demos.find((d) => d.id === activeDemo)?.component;

  return (
    <section id="showcase" className="relative py-32 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-bold text-balance">
            Live <span className="text-primary">Demonstrations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Interactive applications showcasing real-world development skills
          </p>
        </div>

        {/* Demo selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demos.map((demo) => (
            <Button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              variant={activeDemo === demo.id ? "default" : "outline"}
              size="lg"
              className={
                activeDemo === demo.id
                  ? "bg-primary text-primary-foreground"
                  : "glass-button hover:bg-white/10 cursor-pointer"
              }
            >
              {demo.title}
            </Button>
          ))}
        </div>

        {/* Active demo info */}
        <div className="text-center mb-8 space-y-3">
          <h3 className="text-2xl font-semibold">
            {demos.find((d) => d.id === activeDemo)?.title}
          </h3>
          <p className="text-muted-foreground">
            {demos.find((d) => d.id === activeDemo)?.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {demos
              .find((d) => d.id === activeDemo)
              ?.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-card px-3 py-1 rounded-full text-sm text-primary"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* Demo container with glassmorphism */}
        <div className="glass-panel rounded-2xl p-1 max-w-5xl mx-auto">
          <div className="bg-background/50 rounded-xl p-6 md:p-8 min-h-[600px]">
            {/* Demo showcase area con scroll y padding */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-background"
              style={{
                maxHeight: 700,
                minHeight: 400,
                overflowY: "auto",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="relative z-20">
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
