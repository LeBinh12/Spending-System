import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  chartData: any;
}

const ExpenseChart: React.FC<Props> = ({ chartData }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Biểu đồ chi tiêu</h2>
    <Pie data={chartData} />
  </div>
);

export default ExpenseChart;
