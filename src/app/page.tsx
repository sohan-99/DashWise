/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import LineChartComponent from "@/components/Charts/LineChartComponent";
import BarChartComponent from "@/components/Charts/BarChartComponent";
import PieChartComponent from "@/components/Charts/PieChartComponent";
import { parseISO, isWithinInterval } from "date-fns";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => { 
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setFilteredData(json);
      });
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) return setFilteredData(data);

    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const filtered = data.filter((entry) =>
      isWithinInterval(parseISO(entry.date), { start, end })
    );

    setFilteredData(filtered);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
        <div className="p-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <span className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Sales Analytics Dashboard
              </h1>
              <p className="text-indigo-100 mt-2 text-lg">
                Track your business performance with real-time insights
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Enhanced Date Filter */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50">
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Date Range Filter
            </h2>
          </div>

          <div className="flex flex-wrap items-end gap-6">
            <div className="min-w-0 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              onClick={handleFilter}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3c4.418 0 8 3.582 8 8 0 4.418-3.582 8-8 8s-8-3.582-8-8c0-4.418 3.582-8 8-8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-4.35-4.35"
                />
              </svg>
              Apply Filter
            </button>
          </div>
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="transform hover:scale-105 transition-all duration-300">
            <LineChartComponent data={filteredData} />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <BarChartComponent data={filteredData} />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 lg:col-span-2 xl:col-span-1">
            <PieChartComponent data={filteredData} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">
                  Total Sales
                </p>
                <p className="text-3xl font-bold">
                  $
                  {filteredData
                    .reduce((sum, item) => sum + (item.sales || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Records
                </p>
                <p className="text-3xl font-bold">{filteredData.length}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg
                  className="w-8 h-8"
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
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  Average Sale
                </p>
                <p className="text-3xl font-bold">
                  $
                  {filteredData.length > 0
                    ? Math.round(
                        filteredData.reduce(
                          (sum, item) => sum + (item.sales || 0),
                          0
                        ) / filteredData.length
                      ).toLocaleString()
                    : 0}
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg
                  className="w-8 h-8"
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
