import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WeeklyStatsChart = ({ data }) => {
  return (
    <div className="w-full h-72 bg-[var(--secondary5)] rounded-xl p-4 shadow-md">
      <h3 className="text-white text-lg font-semibold mb-2">Weekly Stats</h3>
      <ResponsiveContainer width="100%" height="85%" className="min-h-auto">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="week" tick={{ fill: "#fff", fontSize: 12 }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#222",
              border: "none",
              color: "#fff",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="posts"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
          <Line
            type="monotone"
            dataKey="comments"
            stroke="#ffc658"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
          <Line
            type="monotone"
            dataKey="shares"
            stroke="#ff6f61"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyStatsChart;
