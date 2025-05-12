"use client";

import { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Chart,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FruitChart = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any>({});
  const chartRef = useRef<Chart<"bar">>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const fruitsCount = data.reduce((acc: any, product: any) => {
          const title = product.title;
          if (acc[title]) {
            acc[title] += 1;
          } else {
            acc[title] = 1;
          }
          return acc;
        }, {});
        const labels = Object.keys(fruitsCount);
        const counts = Object.values(fruitsCount);

        setFilteredData({ labels, counts });
      })
      .catch((error) => console.error("Ошибка при получении данных:", error));
  }, []);

  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "#facc15"); // yellow-400
    gradient.addColorStop(0.5, "#f97316"); // orange-500
    gradient.addColorStop(1, "#ef4444"); // red-500
    return gradient;
  };

  const data: ChartData<"bar"> = {
    labels: filteredData.labels,
    datasets: [
      {
        label: "Количество фруктов",
        data: filteredData.counts,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "#facc15";
          return getGradient(ctx, chartArea);
        },
        borderRadius: 6,
        barPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    animation: {
      duration: 800,
      easing: "easeOutBounce",
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Количество фруктов",
        font: {
          size: 20,
        },
        color: "#1f2937", // gray-800
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#facc15",
        bodyColor: "#ffffff",
        borderColor: "#facc15",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151", // gray-700
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#374151",
        },
        grid: {
          color: "#e5e7eb", // gray-200
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Диаграмма фруктов</h2>
      {filteredData.labels ? (
        <Bar ref={chartRef} data={data} options={options} />
      ) : (
        <p className="text-gray-500">Загрузка данных...</p>
      )}
    </div>
  );
};

export default FruitChart;
