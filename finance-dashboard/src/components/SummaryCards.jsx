export default function SummaryCards({ data }) {
  const income = data
    .filter((d) => d.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const expense = data
    .filter((d) => d.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <Card title="Balance" value={balance} />
      <Card title="Income" value={income} />
      <Card title="Expenses" value={expense} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="neu p-6 h-36 flex flex-col justify-between hover:scale-[1.02] transition duration-300">
      <h2 className="text-gray-700 text-sm font-semibold">{title}</h2>
      <p className="text-3xl font-bold text-gray-800">₹{value}</p>
    </div>
  );
}
