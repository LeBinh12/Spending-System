import React from "react";
import type { Expense } from "../../types/expense";

interface Props {
  formData: Partial<Expense>;
  errors: Record<string, string>;
  categories: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ExpenseForm: React.FC<Props> = ({
  formData,
  errors,
  categories,
  onChange,
  onSubmit,
  onCancel,
}) => (
  <div className="bg-gray-50 p-6 rounded-lg mb-6">
    <h2 className="text-xl font-semibold mb-4">Thêm chi tiêu mới</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Thời gian
          </label>
          <input
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Chi tiết
          </label>
          <input
            type="text"
            name="description"
            value={formData.description || ""}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tổng tiền
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ""}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loại hình chi tiêu
          </label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">---Lựa chọn---</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Thêm chi tiêu
        </button>
      </div>
    </form>
  </div>
);

export default ExpenseForm;
