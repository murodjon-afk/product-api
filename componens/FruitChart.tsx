// components/FruitChart.tsx
"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Регистрируем компоненты для работы с Bar диаграммой
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FruitChart = () => {
  const [products, setProducts] = useState<any[]>([]); // Данные о продуктах
  const [filteredData, setFilteredData] = useState<any>([]); // Отфильтрованные данные

  useEffect(() => {
    // Замените на ваш API запрос
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // Фильтруем по фруктам
        const fruitsCount = data.reduce((acc: any, product: any) => {
          const title = product.title;
          if (acc[title]) {
            acc[title] += 1;
          } else {
            acc[title] = 1;
          }
          return acc;
        }, {});

        // Преобразуем данные в формат, подходящий для диаграммы
        const labels = Object.keys(fruitsCount);
        const counts = Object.values(fruitsCount);

        setFilteredData({ labels, counts });
      })
      .catch((error) => console.error("Ошибка при получении данных:", error));
  }, []);

  const data = {
    labels: filteredData.labels, // Названия фруктов
    datasets: [
      {
        label: 'Количество фруктов',
        data: filteredData.counts, // Количество каждого фрукта
        backgroundColor: ['green', 'yellow', 'red'], // Цвета для каждого фрукта
        borderColor: ['green', 'yellow', 'red'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Количество фруктов',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Диаграмма фруктов</h2>
      {filteredData.labels ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default FruitChart;
