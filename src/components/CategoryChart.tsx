import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryChartProps {
  data: {
    auto: number;
    home: number;
    life: number;
    health: number;
  };
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const total = data.auto + data.home + data.life + data.health;
  
  const chartData = {
    labels: ['Auto', 'Home', 'Life', 'Health'],
    datasets: [
      {
        label: 'Policies',
        data: [data.auto, data.home, data.life, data.health],
        backgroundColor: [
          '#3B82F6', // Blue
          '#10B981', // Emerald
          '#F59E0B', // Amber
          '#EF4444', // Red
        ],
        borderColor: [
          '#2563EB',
          '#059669',
          '#D97706',
          '#DC2626',
        ],
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
            return `${context.label}: ${value} policies (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
        grid: {
          color: '#F3F4F6',
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
            weight: '500',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const getTopCategory = () => {
    const categories = [
      { name: 'Auto', value: data.auto },
      { name: 'Home', value: data.home },
      { name: 'Life', value: data.life },
      { name: 'Health', value: data.health },
    ];
    return categories.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  };

  const topCategory = getTopCategory();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Policies by LOB</h3>
        <p className="text-sm text-gray-600">Distribution by type</p>
      </div>
      
      <div className="relative h-48 mb-4">
        {total > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-xs">No data available</p>
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Total Policies</span>
          <span className="text-lg font-bold text-blue-600">{total}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Top Category</span>
          <span className="text-lg font-bold text-green-600">{topCategory.name}</span>
        </div>
        
        {/* Category breakdown */}
      </div>
    </div>
  );
};

export default CategoryChart;