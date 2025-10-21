"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="glass-button h-8 w-8 opacity-0 cursor-pointer"
        >
          <Sun className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="glass-button h-8 w-8 opacity-0 cursor-pointer"
        >
          <Moon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="glass-button h-8 w-8 opacity-0 cursor-pointer"
        >
          <Monitor className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("light")}
        className="glass-button h-8 w-8 cursor-pointer"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("dark")}
        className="glass-button h-8 w-8 cursor-pointer"
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark theme</span>
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("system")}
        className="glass-button h-8 w-8 cursor-pointer"
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">System theme</span>
      </Button>
    </div>
  );
}
