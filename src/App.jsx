import { useState, useEffect } from "react";
import { transactions as mockData } from "./data/transactions";
import RoleSwitcher from "./components/RoleSwitcher";
import Dashboard from "./pages/Dashboard";

function App() {
  // 🌙 DARK MODE STATE
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [role, setRole] = useState("viewer");

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : mockData;
    } catch {
      return mockData;
    }
  });

  // ✅ SAVE TRANSACTIONS
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  // 🔥 DARK MODE EFFECT (YOU MISSED THIS)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#e6e6e6] dark:bg-[#1e1e1e] p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold dark:text-white">
          Finance Dashboard
        </h1>

        {/* 🔥 ADD THIS WRAPPER */}
        <div className="flex gap-3 items-center">
          <RoleSwitcher role={role} setRole={setRole} />

          {/* 🔥 DARK MODE BUTTON */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      {/* Dashboard */}
      <Dashboard data={data} role={role} setData={setData} />
    </div>
  );
}

export default App;
