'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import FruitChart from '../../componens/FruitChart';

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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert('Не удалось удалить продукт');
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string) || '';
    const image = (formData.get('image') as string) || '';
    const priceString = (formData.get('price') as string) || '0';
    const price = Number(priceString);

    if (!name || !image || isNaN(price)) {
      alert('Пожалуйста, заполните все поля корректно');
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image, price }),
      });

      if (!res.ok) {
        throw new Error('Ошибка при создании продукта');
      }

      const newProduct: Product = await res.json();
      setProducts(prev => [...prev, newProduct]);
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Не удалось добавить продукт');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Добро пожаловать в панель администратора, {adminName}!
      </h1>

      {/* Форма добавления */}
      <div className="mb-6 max-w-md">
        <h2 className="text-xl font-semibold mb-2">Добавить продукт</h2>
        <form onSubmit={handleCreate} className="bg-white shadow-md rounded p-4 space-y-4 border">
          <input
            type="text"
            name="name"
            placeholder="Название продукта"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="URL изображения"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Цена"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Добавить
          </button>
        </form>
      </div>

      {/* Список продуктов */}
      {loading ? (
        <p>Загрузка продуктов...</p>
      ) : (
        <div className="max-h-[70vh] overflow-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
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
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}

      {/* График */}
      <FruitChart />
    </div>
  );
}
