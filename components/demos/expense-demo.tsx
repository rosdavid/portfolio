"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Shopping",
  "Other",
];
const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--info))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
  "hsl(var(--muted-foreground))",
];

export function ExpenseDemo() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 45.5,
      category: "Food",
      description: "Groceries",
      date: "2025-01-15",
    },
    {
      id: "2",
      amount: 120,
      category: "Bills",
      description: "Internet",
      date: "2025-01-14",
    },
    {
      id: "3",
      amount: 30,
      category: "Transport",
      description: "Gas",
      date: "2025-01-13",
    },
    {
      id: "4",
      amount: 60,
      category: "Entertainment",
      description: "Movie tickets",
      date: "2025-01-12",
    },
  ]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const addExpense = () => {
    if (amount && description) {
      setExpenses([
        {
          id: Date.now().toString(),
          amount: Number.parseFloat(amount),
          category,
          description,
          date: new Date().toISOString().split("T")[0],
        },
        ...expenses,
      ]);
      setAmount("");
      setDescription("");
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budget = 1000;
  const remaining = budget - totalExpenses;

  const chartData = CATEGORIES.map((cat) => ({
    name: cat,
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  })).filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      {/* Budget overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 md:p-6 rounded-xl">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
              <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Budget
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold">
            ${budget.toFixed(2)}
          </div>
        </div>
        <div className="glass-card p-4 md:p-6 rounded-xl">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-red-500/20 rounded-lg">
              <TrendingDown className="h-4 w-4 md:h-5 md:w-5 text-red-400" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Spent
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-red-400">
            ${totalExpenses.toFixed(2)}
          </div>
        </div>
        <div className="glass-card p-4 md:p-6 rounded-xl">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Remaining
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-primary">
            ${remaining.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="glass-card p-4 md:p-6 rounded-xl">
        <h3 className="text-base md:text-lg font-semibold mb-4">
          Spending by Category
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-4 md:p-6 rounded-xl space-y-4">
        <h3 className="text-base md:text-lg font-semibold">Add Expense</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="glass-card border-white/10 bg-white/5"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="glass-card border-white/10 bg-white/5"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="glass-card border-white/10 bg-white/5 rounded-md px-3 py-2 text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={addExpense}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {expenses.slice(0, 5).map((expense) => (
          <div
            key={expense.id}
            className="glass-card p-3 md:p-4 rounded-xl flex items-center justify-between"
          >
            <div>
              <div className="font-medium text-sm md:text-base">
                {expense.description}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {expense.category}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-red-400 text-sm md:text-base">
                ${expense.amount.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                {expense.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
