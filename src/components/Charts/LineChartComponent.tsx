/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function LineChartComponent({ data }: { data: any[] }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sales Trend Analysis
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.6} />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            fontSize={12}
            tickMargin={10}
          />
          <YAxis stroke="#6b7280" fontSize={12} tickMargin={10} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
            }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 2 }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
