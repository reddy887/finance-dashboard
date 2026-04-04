export default function Insights({ data }) {
  let income = 0;
  let expense = 0;
  const categoryMap = {};
  const monthlyMap = {};

  data.forEach((item) => {
    // Income vs Expense
    if (item.type === "income") {
      income += item.amount;
    } else {
      expense += item.amount;

      // Category grouping
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + item.amount;
    }

    // Monthly grouping
    const month = item.date.slice(0, 7); // YYYY-MM
    monthlyMap[month] = (monthlyMap[month] || 0) + item.amount;
  });

  // Top 3 categories
  const topCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Income vs Expense ratio
  const ratio = income ? ((expense / income) * 100).toFixed(1) : 0;

  return (
    <div className="neu p-6 shadow rounded space-y-4">
      <h2 className="font-bold text-lg">Insights</h2>

      {/* Ratio */}
      <div>
        <p> Expense Ratio:</p>
        <p className="text-xl font-bold">{ratio}% of income spent</p>
      </div>

      {/* Top categories */}
      <div>
        <p> Top Spending Categories:</p>
        <ul>
          {topCategories.map(([cat, amt]) => (
            <li key={cat}>
              {cat}: ₹{amt}
            </li>
          ))}
        </ul>
      </div>

      {/* Monthly comparison */}
      <div>
        <p> Monthly Overview:</p>
        <ul>
          {Object.entries(monthlyMap).map(([month, amt]) => (
            <li key={month}>
              {month}: ₹{amt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
