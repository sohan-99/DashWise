/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { parseISO, isWithinInterval } from "date-fns";
import { useGetDataQuery } from "@/store/api/dataApi";
import {
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  ComposedChartComponent,
  AreaChartComponent,
  RadarChartComponent,
  ThemeToggle,
} from "@/components";

export default function Dashboard() {
  const { data = [], isLoading } = useGetDataQuery();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Update filtered data when data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFilter = () => {
    if (!startDate || !endDate) return setFilteredData(data);

    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const filtered = data.filter((entry) =>
      isWithinInterval(parseISO(entry.date), { start, end })
    );

    setFilteredData(filtered);
    setActiveFilter("custom");
  };

  const handleQuickFilter = (period: string) => {
    const now = new Date();
    let start: Date;

    switch (period) {
      case "7d":
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        setFilteredData(data);
        setActiveFilter("all");
        return;
    }

    const filtered = data.filter((entry) =>
      isWithinInterval(parseISO(entry.date), { start, end: now })
    );

    setFilteredData(filtered);
    setActiveFilter(period);
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(data);
    setActiveFilter("all");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 dark:border-purple-400 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 transition-colors duration-300">
      {/* Animated Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="bg-white/20 dark:bg-white/10 p-3 rounded-xl backdrop-blur-sm animate-bounce">
                <span className="text-4xl">📊</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white drop-shadow-lg animate-slide-in-left">
                  Sales Analytics Dashboard
                </h1>
                <p className="text-indigo-100 dark:text-indigo-200 mt-2 text-lg animate-slide-in-left delay-100">
                  Track your business performance with real-time insights ✨
                </p>
              </div>
            </div>
            {/* Theme Toggle Button */}
            <div className="animate-fade-in delay-300">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Floating bubbles animation */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-float-slow"></div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Enhanced Filter Section with Quick Filters */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 animate-slide-up transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 p-2 rounded-lg">
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Smart Filters
            </h2>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { key: "all", label: "All Time", icon: "🌍" },
              { key: "7d", label: "Last 7 Days", icon: "📅" },
              { key: "30d", label: "Last 30 Days", icon: "📊" },
              { key: "90d", label: "Last 90 Days", icon: "📈" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleQuickFilter(filter.key)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeFilter === filter.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105"
                }`}
              >
                <span>{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>

          {/* Custom Date Range */}
          <div className="flex flex-wrap items-end gap-6">
            <div className="min-w-0 flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📅 Start Date
              </label>
              <input
                type="date"
                className="w-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-3 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📅 End Date
              </label>
              <input
                type="date"
                className="w-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-3 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
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
            <button
              onClick={clearFilters}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Enhanced Stats Cards with Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up delay-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium flex items-center gap-2">
                  💰 Total Sales
                </p>
                <p className="text-3xl font-bold animate-counter">
                  $
                  {filteredData
                    .reduce((sum, item) => sum + (item.sales || 0), 0)
                    .toLocaleString()}
                </p>
                <p className="text-emerald-200 text-xs mt-1">
                  +12% from last month
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl animate-pulse">
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

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up delay-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium flex items-center gap-2">
                  📊 Total Records
                </p>
                <p className="text-3xl font-bold animate-counter">
                  {filteredData.length}
                </p>
                <p className="text-blue-200 text-xs mt-1">Active data points</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl animate-pulse">
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

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up delay-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium flex items-center gap-2">
                  📈 Average Sale
                </p>
                <p className="text-3xl font-bold animate-counter">
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
                <p className="text-purple-200 text-xs mt-1">Per transaction</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl animate-pulse">
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

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="transform hover:scale-105 transition-all duration-300 animate-slide-up delay-400">
            <LineChartComponent data={filteredData} />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-slide-up delay-500">
            <BarChartComponent data={filteredData} />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-slide-up delay-600">
            <PieChartComponent data={filteredData} />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-slide-up delay-700">
            <ComposedChartComponent data={filteredData} />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-slide-up delay-800">
            <AreaChartComponent data={filteredData} />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-slide-up delay-900">
            <RadarChartComponent data={filteredData} />
          </div>
        </div>

        {/* Fun Footer */}
        <div className="text-center py-8 animate-fade-in">
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 transition-colors duration-300">
            Made with NextDevs❤️ for amazing analytics
            <span className="animate-bounce">🚀</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .animate-counter {
          animation: fade-in 1.5s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
        .delay-900 {
          animation-delay: 0.9s;
        }
      `}</style>
    </main>
  );
}
