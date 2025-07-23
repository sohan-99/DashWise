/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function PieChartComponent({ data }: { data: any[] }) {
  const categoryData = Object.values(
    data.reduce((acc: any, curr: any) => {
      acc[curr.category] = acc[curr.category] || { name: curr.category, value: 0 };
      acc[curr.category].value += curr.sales;
      return acc;
    }, {})
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl text-fuchsia-700 font-semibold mb-2">Sales by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {categoryData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
