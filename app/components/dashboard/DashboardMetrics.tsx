// app/components/dashboard/DashboardMetrics.tsx
"use client";
import { LineChart, BarChart2, Users, DollarSign } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: "up" | "down";
}

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
        <span
          className={`text-sm ${
            trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
}

export default function DashboardMetrics() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$54,239",
      change: "+14.5%",
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      title: "Active Users",
      value: "2,741",
      change: "+21.2%",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Conversion Rate",
      value: "4.35%",
      change: "-3.2%",
      icon: BarChart2,
      trend: "down" as const,
    },
    {
      title: "Avg. Session",
      value: "2m 45s",
      change: "+12.5%",
      icon: LineChart,
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
