/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AreaChartComponent({ data }: { data: any[] }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-lg">
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
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          📈 Revenue & Performance Areas
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" opacity={0.6} />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            fontSize={12}
            tickMargin={10}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis stroke="#64748b" fontSize={12} tickMargin={10} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
            }}
            labelFormatter={(value) => {
              const date = new Date(value);
              return `Date: ${date.toLocaleDateString()}`;
            }}
          />
          <Legend />

          {/* Stacked Areas */}
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="1"
            stroke="#ec4899"
            fill="url(#revenueAreaGradient)"
            name="Revenue ($)"
          />
          <Area
            type="monotone"
            dataKey="sales"
            stackId="2"
            stroke="#3b82f6"
            fill="url(#salesAreaGradient)"
            name="Sales ($)"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stackId="3"
            stroke="#10b981"
            fill="url(#profitAreaGradient)"
            name="Profit ($)"
          />

          <defs>
            <linearGradient
              id="revenueAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="salesAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="profitAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
