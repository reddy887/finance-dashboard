import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import TransactionTable from "../components/TransactionTable";
import Insights from "../components/Insights";

export default function Dashboard({ data, role, setData }) {
  const budget = 40000;

  const spent = data
    .filter((d) => d.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const remaining = budget - spent;

  const percentage = Math.round((spent / budget) * 100);
  const safePercentage = Math.min(percentage, 100);

  const maxExpense = Math.max(
    ...data.filter((d) => d.type === "expense").map((d) => d.amount),
    0,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* TOP CARDS */}
      <div className="md:col-span-4">
        <SummaryCards data={data} />
      </div>

      {/* REPORTS */}
      <div className="neu p-6 h-[350px] flex flex-col gap-4">
        <h2 className="text-gray-700 text-sm font-semibold">Reports</h2>

        <div className="text-sm space-y-2">
          <p>Total: {data.length}</p>
          <p>Max Expense: ₹{maxExpense}</p>
          <p>Latest: ₹{data[data.length - 1]?.amount || 0}</p>
        </div>
      </div>

      {/* CENTER CHART */}
      <div className="md:col-span-2 neu p-8 h-[350px]">
        <Charts data={data} />
      </div>

      {/* INSIGHTS */}
      <div className="neu p-6 h-[350px]">
        <Insights data={data} />
      </div>

      {/* BUDGET */}
      <div className="neu p-6 h-[350px] flex flex-col justify-between">
        <h2 className="text-gray-700 font-semibold">Budget</h2>

        {/* TEXT */}
        <div className="space-y-2 text-sm text-gray-600">
          <p>Monthly Budget: ₹{budget}</p>
          <p>Spent: ₹{spent}</p>
          <p>Remaining: ₹{remaining}</p>
        </div>

        {/* PROGRESS BAR */}
        <div>
          <div className="w-full bg-gray-300 rounded-full h-3 mt-4">
            <div
              className={`h-3 rounded-full ${
                spent > budget ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${safePercentage}%` }}
            ></div>
          </div>

          <p className="text-sm mt-2 text-gray-600">
            {Math.min(percentage, 100)}% used
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="md:col-span-4 neu p-6">
        <TransactionTable data={data} role={role} setData={setData} />
      </div>
    </div>
  );
}
