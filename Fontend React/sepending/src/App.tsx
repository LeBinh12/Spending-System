import { useState } from "react";
import ExpenseForm from "./components/expenses/ExpenseForm";
import ExpenseTable from "./components/expenses/ExpenseTable";
import ExpenseChart from "./components/expenses/ExpenseChart";
import type { Expense } from "./types/expense";
import ExpenseTotal from "./components/expenses/ExpenseTotal";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Expense>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      date: "2024-01-15",
      description: "Grocery Shopping",
      amount: 150.5,
      category: "Food",
    },
    {
      id: 2,
      date: "2024-01-14",
      description: "Internet Bill",
      amount: 60.0,
      category: "Utilities",
    },
    {
      id: 3,
      date: "2024-01-13",
      description: "Movie Tickets",
      amount: 30.0,
      category: "Entertainment",
    },
  ]);

  const categories = [
    "Food",
    "Utilities",
    "Entertainment",
    "Transport",
    "Other",
  ];

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Xử lý khi xóa
  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // kiểm tra đơn giản
    if (
      !formData.date ||
      !formData.description ||
      !formData.amount ||
      !formData.category
    ) {
      setErrors({ description: "Vui lòng nhập đầy đủ thông tin" });

      return;
    }

    const newExpense: Expense = {
      id: expenses.length + 1,
      date: formData.date,
      description: formData.description,
      amount: Number(formData.amount),
      category: formData.category,
    } as Expense;

    setExpenses([...expenses, newExpense]);
    setFormData({});
    setErrors({});
    setShowForm(false);
  };

  // Dữ liệu cho chart
  const chartData = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0)
        ),
        backgroundColor: [
          "#f87171",
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#a78bfa",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              + Thêm chi tiêu mới
            </button>
          )}

          {showForm && (
            <ExpenseForm
              formData={formData}
              errors={errors}
              categories={categories}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ExpenseTable expenses={expenses} onDelete={handleDelete} />

            <div>
              <ExpenseTotal total={total} />
              <ExpenseChart chartData={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
