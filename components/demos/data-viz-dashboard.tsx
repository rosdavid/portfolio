"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  RefreshCw,
} from "lucide-react";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--info))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
];

const generateRevenueData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][i],
    revenue: Math.floor(Math.random() * 50000) + 30000,
    expenses: Math.floor(Math.random() * 30000) + 15000,
    profit: 0,
  })).map((item) => ({ ...item, profit: item.revenue - item.expenses }));
};

const generateUserData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    users: Math.floor(Math.random() * 5000) + 2000,
  }));
};

const generateCategoryData = () => {
  return [
    { name: "Electronics", value: Math.floor(Math.random() * 40) + 20 },
    { name: "Clothing", value: Math.floor(Math.random() * 30) + 15 },
    { name: "Food", value: Math.floor(Math.random() * 25) + 10 },
    { name: "Books", value: Math.floor(Math.random() * 20) + 10 },
    { name: "Other", value: Math.floor(Math.random() * 15) + 5 },
  ];
};

export function DataVizDashboard() {
  const [revenueData, setRevenueData] = useState(generateRevenueData());
  const [userData, setUserData] = useState(generateUserData());
  const [categoryData, setCategoryData] = useState(generateCategoryData());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stats = [
    {
      title: "Total Revenue",
      value:
        "$" +
        (
          revenueData.reduce((acc, curr) => acc + curr.revenue, 0) / 1000
        ).toFixed(1) +
        "K",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value:
        (userData.reduce((acc, curr) => acc + curr.users, 0) / 1000).toFixed(
          1
        ) + "K",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Orders",
      value: "3,456",
      change: "-2.4%",
      trend: "down",
      icon: ShoppingCart,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      trend: "up",
      icon: Activity,
    },
  ];

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRevenueData(generateRevenueData());
      setUserData(generateUserData());
      setCategoryData(generateCategoryData());
      setIsRefreshing(false);
    }, 500);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUserData((prev) =>
        prev.map((item) => ({
          ...item,
          users: Math.max(
            1000,
            item.users + Math.floor(Math.random() * 200) - 100
          ),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold">Analytics Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Real-time business metrics and insights
          </p>
        </div>
        <Button
          onClick={refreshData}
          disabled={isRefreshing}
          className="glass-button w-full sm:w-auto"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-card border-white/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span
                  className={`text-xs font-medium flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Revenue vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorExpenses"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--accent))"
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Activity Chart */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Daily Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={userData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="users"
                  fill="hsl(var(--info))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Trend */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="hsl(var(--warning))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--warning))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Live data updates every 3 seconds • Interactive charts with Recharts •
        Responsive design
      </p>
    </div>
  );
}
