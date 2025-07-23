/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ComposedChartComponent({ data }: { data: any[] }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg">
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          ❄️ Multi-Metric Analysis
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.8} />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            fontSize={12}
            tickMargin={10}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis stroke="#94a3b8" fontSize={12} tickMargin={10} />
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

          {/* Area for Revenue */}
          <Area
            type="monotone"
            dataKey="revenue"
            fill="url(#revenueGradient)"
            stroke="#06b6d4"
            strokeWidth={2}
            fillOpacity={0.6}
            name="Revenue ($)"
          />

          {/* Bars for Sales and Profit */}
          <Bar
            dataKey="sales"
            fill="#10b981"
            name="Sales ($)"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="profit"
            fill="#3b82f6"
            name="Profit ($)"
            radius={[2, 2, 0, 0]}
          />

          {/* Line for Orders */}
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#f59e0b" }}
            name="Orders"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
