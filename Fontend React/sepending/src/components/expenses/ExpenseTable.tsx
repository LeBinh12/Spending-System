import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import type { Expense } from "../../types/expense";

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseTable: React.FC<Props> = ({ expenses, onDelete }) => (
  <div className="col-span-2">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Thời gian
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Chi tiết chi tiêu
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Tổng tiền
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Loại
          </th>
          <th className="px-6 py-3">Chức năng</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td className="px-6 py-4">{expense.date}</td>
            <td className="px-6 py-4">{expense.description}</td>
            <td className="px-6 py-4">${expense.amount.toFixed(2)}</td>
            <td className="px-6 py-4">{expense.category}</td>
            <td className="px-6 py-4 flex gap-2">
              <button
                onClick={() => onDelete(expense.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
              <button className="text-blue-500 hover:text-blue-700">
                <FaEdit />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ExpenseTable;
