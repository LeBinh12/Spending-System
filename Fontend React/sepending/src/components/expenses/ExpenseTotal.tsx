import React from "react";

interface Props {
  total: any;
}

const ExpenseTotal: React.FC<Props> = ({ total }) => (
  <div
    className="bg-white p-6 rounded-lg shadow mb-6"
    data-pc-el-id="div-230-233"
  >
    <h2 className="text-xl font-semibold mb-4" data-pc-el-id="h2-231-231">
      Total Expenses
    </h2>
    <p className="text-3xl font-bold text-blue-500" data-pc-el-id="p-232-232">
      {total.toLocaleString("vi-VN")} VNĐ
    </p>
  </div>
);

export default ExpenseTotal;
