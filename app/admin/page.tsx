'use client';
import FruitChart from "../../componens/FruitChart"; // Путь к компоненту

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

export default function AdminPage() {
  const [adminName, setAdminName] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdminName = localStorage.getItem('userFirstName');
    if (storedAdminName) {
      setAdminName(storedAdminName);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать в панель администратора, {adminName}!</h1>
      {loading ? (
        <p>Загрузка продуктов...</p>
      ) : (
        <div className="max-h-[70vh] overflow-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border shadow-md rounded-lg p-4 flex items-center gap-4"
            >
             <Image
  src={product.image}
  alt={product.name || 'Изображение продукта'}
  width={60}
  height={60}
  className="rounded"
/>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.price} сум</p>
              </div>
              <button
                onClick={() => alert('Удаление продукта временно не работает будет исправлено на следующий урок ')}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}

<FruitChart />
    </div>
  );
}
