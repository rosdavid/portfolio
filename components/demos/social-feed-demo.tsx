"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Send,
  RefreshCw,
  Home,
  Users,
  Bell,
  Settings,
} from "lucide-react";

const USERS = [
  { name: "David Ros", avatar: "DR", colorClass: "bg-primary" },
  { name: "Sarah Lee", avatar: "SL", colorClass: "bg-destructive" },
  { name: "Mike Chen", avatar: "MC", colorClass: "bg-warning" },
  { name: "Alex Kim", avatar: "AK", colorClass: "bg-info" },
];

const SAMPLE_POSTS = [
  {
    user: USERS[0],
    content: "¡Bienvenidos al nuevo feed social en tiempo real! 🚀",
    time: "just now",
    likes: 2,
    comments: 1,
  },
  {
    user: USERS[1],
    content: "¿Alguien ha probado la nueva demo de SaaS? Está brutal 😍",
    time: "2 min ago",
    likes: 4,
    comments: 2,
  },
  {
    user: USERS[2],
    content: "React + WebSockets = magia para apps colaborativas.",
    time: "5 min ago",
    likes: 3,
    comments: 0,
  },
];

function randomPost() {
  const user = USERS[Math.floor(Math.random() * USERS.length)];
  const contents = [
    "¡Nuevo producto en el portfolio!",
    "¿Qué tecnología te gustaría ver en la próxima demo?",
    "Hoy aprendí algo nuevo sobre Next.js.",
    "¿Alguien quiere colaborar en un side project?",
    "¡Me encanta el diseño de esta web!",
    "¿Ya probaste el chat con IA?",
    "¿Qué opinan de los nuevos colores?",
    "¿Algún truco de productividad favorito?",
    "¿Quién se apunta a un hackathon?",
    "¡Gracias por el feedback!",
  ];
  return {
    user,
    content: contents[Math.floor(Math.random() * contents.length)],
    time: "just now",
    likes: Math.floor(Math.random() * 10),
    comments: Math.floor(Math.random() * 4),
  };
}

export function SocialFeedDemo() {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [input, setInput] = useState("");
  const feedRef = useRef<HTMLDivElement>(null);

  // Simula nuevos posts llegando por "streaming"
  useEffect(() => {
    const interval = setInterval(() => {
      setPosts((prev) => [randomPost(), ...prev.slice(0, 19)]); // máximo 20 posts
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Scroll al top cuando llega un nuevo post
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [posts]);

  function handleSend() {
    if (!input.trim()) return;
    setPosts([
      {
        user: USERS[0],
        content: input,
        time: "just now",
        likes: 0,
        comments: 0,
      },
      ...posts,
    ]);
    setInput("");
  }

  return (
    <div className="flex h-[600px] max-h-[600px] w-full bg-background rounded-2xl overflow-hidden shadow-lg border border-primary/10">
      {/* Menú lateral */}
      <aside className="hidden md:flex flex-col items-center gap-8 py-8 px-4 bg-gradient-to-b from-primary/10 to-background/10 border-r border-primary/10 min-w-[80px]">
        <Button variant="ghost" size="icon" className="mb-2">
          <Home className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Users className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-6 h-6" />
        </Button>
      </aside>
      {/* Feed principal */}
      <main className="flex-1 flex flex-col px-4 py-6 md:px-8 md:py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-primary">Live Social Feed</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPosts(SAMPLE_POSTS)}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>
        <div ref={feedRef} className="flex-1 overflow-y-auto space-y-4 pb-2">
          {posts.map((post, idx) => (
            <Card
              key={idx}
              className="p-4 flex gap-4 items-start glass-card border-primary/10"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${post.user.colorClass}`}
              >
                {post.user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">
                    {post.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.time}
                  </span>
                </div>
                <p className="mt-1 text-base text-foreground">{post.content}</p>
                <div className="flex gap-4 mt-2 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <form
          className="flex gap-2 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            className="flex-1 rounded-lg border border-primary/20 px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" className="bg-primary text-primary-foreground">
            <Send className="w-4 h-4 mr-1" /> Enviar
          </Button>
        </form>
      </main>
    </div>
  );
}
