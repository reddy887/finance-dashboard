import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";

export default function Charts({ data }) {
  // 🔹 Prepare Pie Data
  const categoryMap = {};

  data.forEach((item) => {
    if (item.type === "expense") {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + item.amount;
    }
  });

  const chartData = Object.keys(categoryMap).map((key) => ({
    category: key,
    amount: categoryMap[key],
  }));

  // 🔹 Colors
  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* PIE CHART */}
      <div className="neu p-6 rounded-2xl">
        <h2 className="font-semibold mb-2">Spending Breakdown</h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} dataKey="amount" nameKey="category">
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `₹${value}`} />

            <Legend formatter={(value, entry) => entry.payload.category} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART */}
      <div className="neu p-6 rounded-2xl">
        <h2 className="font-semibold mb-2">Trend</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
