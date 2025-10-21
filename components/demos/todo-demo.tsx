"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export function TodoDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "Review pull requests",
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      text: "Update documentation",
      completed: true,
      priority: "medium",
    },
    {
      id: "3",
      text: "Refactor authentication module",
      completed: false,
      priority: "high",
    },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false,
          priority: "medium",
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-3 md:p-4 rounded-xl text-center">
          <div className="text-2xl md:text-3xl font-bold text-primary">
            {stats.total}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            Total Tasks
          </div>
        </div>
        <div className="glass-card p-3 md:p-4 rounded-xl text-center">
          <div className="text-2xl md:text-3xl font-bold text-primary">
            {stats.active}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">Active</div>
        </div>
        <div className="glass-card p-3 md:p-4 rounded-xl text-center">
          <div className="text-2xl md:text-3xl font-bold text-primary">
            {stats.completed}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            Completed
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new task..."
          className="glass-card border-white/10 bg-white/5"
        />
        <Button
          onClick={addTodo}
          className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "active", "completed"] as const).map((f) => (
          <Button
            key={f}
            onClick={() => setFilter(f)}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            className={`${
              filter === f ? "bg-primary" : "glass-button"
            } flex-1 sm:flex-none`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="glass-card p-3 md:p-4 rounded-xl flex items-center gap-2 md:gap-3 hover:bg-white/10 transition-colors"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className="flex-shrink-0"
            >
              {todo.completed ? (
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              ) : (
                <Circle className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              )}
            </button>
            <span
              className={`flex-1 text-sm md:text-base ${
                todo.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {todo.text}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full hidden sm:inline ${
                todo.priority === "high"
                  ? "bg-destructive/20 text-destructive"
                  : todo.priority === "medium"
                  ? "bg-warning/20 text-warning"
                  : "bg-info/20 text-info"
              }`}
            >
              {todo.priority}
            </span>
            <Button
              onClick={() => deleteTodo(todo.id)}
              variant="ghost"
              size="sm"
              className="hover:bg-destructive/20 hover:text-destructive flex-shrink-0"
            >
              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
