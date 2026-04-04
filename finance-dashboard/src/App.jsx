import { useState, useEffect } from "react";
import { transactions as mockData } from "./data/transactions";
import RoleSwitcher from "./components/RoleSwitcher";
import Dashboard from "./pages/Dashboard";

function App() {
  const [role, setRole] = useState("viewer");

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : mockData;
    } catch {
      return mockData; // fallback if JSON breaks
    }
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  return (
    <div className="min-h-screen bg-[#e6e6e6] p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>

        <RoleSwitcher role={role} setRole={setRole} />
      </div>

      {/* Dashboard */}
      <Dashboard data={data} role={role} setData={setData} />
    </div>
  );
}

export default App;
