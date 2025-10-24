"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const DEMO_QA = [
  {
    question: "Who are you?",
    response:
      "I'm a full stack developer with 6+ years of experience specializing in React, Next.js, and modern web technologies. I love creating beautiful, accessible user interfaces and robust back-end systems.",
  },
  {
    question: "What technologies do you use?",
    response:
      "I work with React, Next.js, TypeScript, Node.js, PostgreSQL, and various modern tools. For styling, I prefer Tailwind CSS and for state management, I use Zustand or Redux depending on the project needs.",
  },
  {
    question: "Can you show me your portfolio?",
    response:
      "Absolutely! You can explore my portfolio by navigating through the different sections above. I have projects ranging from e-commerce platforms to AI-powered applications. Check out the Projects section for detailed case studies!",
  },
  {
    question: "What's your experience level?",
    response:
      "I have over 5 years of professional development experience. I've worked on everything from small business websites to large-scale enterprise applications, always focusing on performance, accessibility, and user experience.",
  },
  {
    question: "Do you do freelance work?",
    response:
      "Yes! I'm currently available for freelance projects. I specialize in full stack web development, UI/UX design, and technical consulting. Feel free to reach out through the contact form for potential collaborations!",
  },
  {
    question: "What's your development process?",
    response:
      "My process typically involves: 1) Understanding requirements and user needs, 2) Creating wireframes and prototypes, 3) Developing with clean, maintainable code, 4) Rigorous testing, and 5) Deployment with monitoring. I believe in iterative development and constant communication.",
  },
  {
    question: "What makes you different?",
    response:
      "I combine technical expertise with strong design sensibilities. I don't just write code – I craft experiences. I'm passionate about performance optimization, accessibility standards, and creating solutions that genuinely help users.",
  },
  {
    question: "How can I contact you?",
    response:
      "You can reach me through the contact form in the Contact section, or connect with me on LinkedIn and GitHub. I'm always happy to discuss new opportunities, answer questions, or just chat about technology!",
  },
];

const QUICK_QUESTIONS = [
  "Who are you?",
  "What technologies do you use?",
  "Can you show me your portfolio?",
  "Do you do freelance work?",
];

export function AiChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! 👋 I'm excited to tell you about my work and experience. Feel free to ask me anything about my background, skills, or projects!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const messagesContainer = messagesEndRef.current?.parentElement;
    if (messagesContainer && messagesContainer.scrollHeight > 0) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll when assistant responds, not when user sends message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      // Use setTimeout to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Find matching response or use a default one
    const findResponse = (query: string) => {
      const lowerQuery = query.toLowerCase().trim();

      // First check for exact matches with quick questions
      const quickMatch = DEMO_QA.find(
        (item) =>
          item.question.toLowerCase().replace("?", "").trim() ===
          lowerQuery.replace("?", "").trim()
      );
      if (quickMatch) return quickMatch.response;

      // Then check for partial matches
      const partialMatch = DEMO_QA.find(
        (item) =>
          lowerQuery.includes(item.question.toLowerCase().replace("?", "")) ||
          item.question.toLowerCase().replace("?", "").includes(lowerQuery)
      );
      if (partialMatch) return partialMatch.response;

      return "That's a great question! I'd love to discuss that with you. Feel free to ask me about my experience, skills, or any of my projects!";
    };

    // Simulate AI response with typing delay
    setTimeout(() => {
      const response = findResponse(messageText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="glass-card border-white/20 rounded-t-xl p-3 md:p-4 flex items-center gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
          <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-sm md:text-base">
            Portfolio Assistant
          </h4>
          <p className="text-xs text-muted-foreground">
            Ask me about my experience & projects
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Available</span>
        </div>
      </div>

      <Card className="flex-1 glass-card border-white/20 rounded-none overflow-y-auto p-3 md:p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-primary"
                  : "bg-gradient-to-br from-purple-600 to-pink-600"
              }`}
            >
              {message.role === "user" ? (
                <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
              ) : (
                <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
              )}
            </div>
            <div
              className={`flex-1 max-w-[85%] md:max-w-[80%] ${
                message.role === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`inline-block p-2 md:p-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "glass-card border-white/20"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="glass-card border-white/20 p-3 rounded-2xl">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </Card>

      {!isTyping && (
        <div className="glass-card border-white/20 p-2 md:p-3 flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((question) => (
            <Button
              key={question}
              variant="outline"
              size="sm"
              onClick={() => handleQuickPrompt(question)}
              className="glass-button text-xs"
              disabled={isTyping}
            >
              {question}
            </Button>
          ))}
        </div>
      )}

      <div className="glass-card border-white/20 rounded-b-xl p-3 md:p-4 flex gap-2">
        <Input
          placeholder="Ask me about my experience, skills, or projects..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isTyping}
          className="glass-card border-white/20"
        />
        <Button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isTyping}
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
