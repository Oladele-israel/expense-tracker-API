import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardContext } from "../Hooks/dashboardContext.jsx";
import Loader from "./Loader.jsx";

const Charts = () => {
  const { expenses, loadBudget, error } = useDashboardContext();
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    if (!expenses || !Array.isArray(expenses)) return;

    const aggregatedData = expenses.reduce((acc, { created_at, amount }) => {
      const date = new Date(created_at);
      if (isNaN(date)) return acc;

      const key = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      const numericAmount = parseFloat(amount);
      if (!isNaN(numericAmount)) {
        acc[key] = (acc[key] || 0) + numericAmount;
      }

      return acc;
    }, {});

    const chartData = Object.entries(aggregatedData).map(([name, amount]) => ({
      name,
      amount,
    }));

    setMonthlyData(chartData);
  }, [expenses]);

  if (loadBudget)
    return (
      <div className="flex flex-col justify-center items-center">
        <Loader />
        <div>loading chart data..</div>
      </div>
    );
  if (error) return <div>Error loading chart data: {error}</div>;
  if (!monthlyData.length)
    return <div>No expenses data available to display.</div>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={monthlyData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Charts;
