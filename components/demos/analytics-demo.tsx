"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function AnalyticsDemo() {
  const data = [
    { name: "Mon", users: 400, revenue: 2400, engagement: 65 },
    { name: "Tue", users: 300, revenue: 1398, engagement: 72 },
    { name: "Wed", users: 600, revenue: 9800, engagement: 81 },
    { name: "Thu", users: 800, revenue: 3908, engagement: 78 },
    { name: "Fri", users: 900, revenue: 4800, engagement: 85 },
    { name: "Sat", users: 700, revenue: 3800, engagement: 69 },
    { name: "Sun", users: 500, revenue: 4300, engagement: 74 },
  ];

  const [metrics, setMetrics] = useState({
    totalUsers: 4200,
    revenue: 30408,
    avgEngagement: 75,
    growth: 12.5,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        revenue: prev.revenue + Math.floor(Math.random() * 100),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-4">
      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 md:p-6 rounded-xl">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Users
            </span>
          </div>
          <div className="text-xl md:text-2xl font-bold">
            {metrics.totalUsers.toLocaleString()}
          </div>
          <div className="text-xs text-primary mt-1">
            +{metrics.growth}% this week
          </div>
        </div>

        <div className="glass-card p-4 md:p-6 rounded-xl">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
              <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Revenue
            </span>
          </div>
          <div className="text-xl md:text-2xl font-bold">
            ${metrics.revenue.toLocaleString()}
          </div>
          <div className="text-xs text-primary mt-1">+8.2% this week</div>
        </div>

        <div className="glass-card p-4 md:p-6 rounded-xl">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
              <Activity className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Engagement
            </span>
          </div>
          <div className="text-xl md:text-2xl font-bold">
            {metrics.avgEngagement}%
          </div>
          <div className="text-xs text-primary mt-1">+3.1% this week</div>
        </div>

        <div className="glass-card p-4 md:p-6 rounded-xl">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Growth
            </span>
          </div>
          <div className="text-xl md:text-2xl font-bold">{metrics.growth}%</div>
          <div className="text-xs text-primary mt-1">Steady increase</div>
        </div>
      </div>

      <div className="glass-card p-4 md:p-6 rounded-xl">
        <h3 className="text-base md:text-lg font-semibold mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="users"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-4 md:p-6 rounded-xl">
        <h3 className="text-base md:text-lg font-semibold mb-4">
          Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
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
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
