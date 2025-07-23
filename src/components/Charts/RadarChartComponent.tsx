/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function RadarChartComponent({ data }: { data: any[] }) {
  // Transform data for radar chart - get average values for different metrics
  const radarData = [
    {
      metric: "Sales Performance",
      Electronics:
        data
          .filter((item) => item.category === "Electronics")
          .reduce((acc, item) => acc + item.sales, 0) /
          data.filter((item) => item.category === "Electronics").length || 0,
      Clothing:
        data
          .filter((item) => item.category === "Clothing")
          .reduce((acc, item) => acc + item.sales, 0) /
          data.filter((item) => item.category === "Clothing").length || 0,
      Furniture:
        data
          .filter((item) => item.category === "Furniture")
          .reduce((acc, item) => acc + item.sales, 0) /
          data.filter((item) => item.category === "Furniture").length || 0,
      fullMark: 200,
    },
    {
      metric: "Customer Satisfaction",
      Electronics:
        data
          .filter((item) => item.category === "Electronics")
          .reduce((acc, item) => acc + (item.satisfaction || 0), 0) /
          data.filter((item) => item.category === "Electronics").length || 0,
      Clothing:
        data
          .filter((item) => item.category === "Clothing")
          .reduce((acc, item) => acc + (item.satisfaction || 0), 0) /
          data.filter((item) => item.category === "Clothing").length || 0,
      Furniture:
        data
          .filter((item) => item.category === "Furniture")
          .reduce((acc, item) => acc + (item.satisfaction || 0), 0) /
          data.filter((item) => item.category === "Furniture").length || 0,
      fullMark: 100,
    },
    {
      metric: "Marketing Score",
      Electronics:
        data
          .filter((item) => item.category === "Electronics")
          .reduce((acc, item) => acc + (item.marketing || 0), 0) /
          data.filter((item) => item.category === "Electronics").length || 0,
      Clothing:
        data
          .filter((item) => item.category === "Clothing")
          .reduce((acc, item) => acc + (item.marketing || 0), 0) /
          data.filter((item) => item.category === "Clothing").length || 0,
      Furniture:
        data
          .filter((item) => item.category === "Furniture")
          .reduce((acc, item) => acc + (item.marketing || 0), 0) /
          data.filter((item) => item.category === "Furniture").length || 0,
      fullMark: 100,
    },
    {
      metric: "Quality Rating",
      Electronics:
        data
          .filter((item) => item.category === "Electronics")
          .reduce((acc, item) => acc + (item.quality || 0), 0) /
          data.filter((item) => item.category === "Electronics").length || 0,
      Clothing:
        data
          .filter((item) => item.category === "Clothing")
          .reduce((acc, item) => acc + (item.quality || 0), 0) /
          data.filter((item) => item.category === "Clothing").length || 0,
      Furniture:
        data
          .filter((item) => item.category === "Furniture")
          .reduce((acc, item) => acc + (item.quality || 0), 0) /
          data.filter((item) => item.category === "Furniture").length || 0,
      fullMark: 100,
    },
    {
      metric: "Delivery Score",
      Electronics:
        data
          .filter((item) => item.category === "Electronics")
          .reduce((acc, item) => acc + (item.delivery || 0), 0) /
          data.filter((item) => item.category === "Electronics").length || 0,
      Clothing:
        data
          .filter((item) => item.category === "Clothing")
          .reduce((acc, item) => acc + (item.delivery || 0), 0) /
          data.filter((item) => item.category === "Clothing").length || 0,
      Furniture:
        data
          .filter((item) => item.category === "Furniture")
          .reduce((acc, item) => acc + (item.delivery || 0), 0) /
          data.filter((item) => item.category === "Furniture").length || 0,
      fullMark: 100,
    },
    {
      metric: "Order Volume",
      Electronics:
        data
          .filter((item) => item.category === "Electronics")
          .reduce((acc, item) => acc + (item.orders || 0), 0) /
          data.filter((item) => item.category === "Electronics").length || 0,
      Clothing:
        data
          .filter((item) => item.category === "Clothing")
          .reduce((acc, item) => acc + (item.orders || 0), 0) /
          data.filter((item) => item.category === "Clothing").length || 0,
      Furniture:
        data
          .filter((item) => item.category === "Furniture")
          .reduce((acc, item) => acc + (item.orders || 0), 0) /
          data.filter((item) => item.category === "Furniture").length || 0,
      fullMark: 25,
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-2 rounded-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          🎯 Category Performance Radar
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart
          data={radarData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <PolarGrid stroke="#e0e7ff" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fontSize: 10, fill: "#64748b" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, "dataMax"]}
            tick={{ fontSize: 10, fill: "#64748b" }}
          />

          <Radar
            name="Electronics"
            dataKey="Electronics"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Clothing"
            dataKey="Clothing"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Furniture"
            dataKey="Furniture"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.3}
            strokeWidth={2}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: "20px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
            }}
            formatter={(value: any, name: string) => [
              `${Math.round(value * 100) / 100}`,
              name,
            ]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
