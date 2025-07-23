/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function BarChartComponent({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl text-pink-600 font-semibold mb-2">Profit Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="profit" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
