"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  overview?: string;
  price?: number;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки продуктов:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCancelSelection = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const updatedCart = [...cartItems, selectedProduct];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToFavorites = () => {
    console.log("Продукт добавлен в понравившиеся:", selectedProduct);
  };

  return (
    <div className="flex space-x-6 h-[85vh] p-4">
      <div className="w-1/3 overflow-auto bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Фрукты</h2>
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4">
            {products
              .filter((p) => p.title && p.image)
              .map((product) => (
                <li
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="cursor-pointer bg-white hover:bg-gray-200 transition p-3 rounded-lg shadow-sm flex flex-col items-center"
              >
                <div className="w-[200px] h-[200px] mb-2 overflow-hidden rounded">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <span className="text-sm font-medium text-center">{product.title}</span>
                {product.price && (
                  <p className="text-blue-500 font-semibold text-sm mt-1">
                    {product.price} ₽
                  </p>
                )}
              </li>
              
              ))}
          </ul>
        )}
      </div>

      <div className="w-1/3 bg-gray-50 p-6 rounded-lg shadow-lg overflow-auto">
        {selectedProduct ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.title}</h2>
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.title}
              width={400}
              height={500}
              className="rounded-md object-cover w-full h-[500px] mb-4"
              unoptimized
            />
            {selectedProduct.overview && (
              <p className="text-sm text-gray-600 mb-2">{selectedProduct.overview}</p>
            )}
            {selectedProduct.price !== undefined && (
              <p className="text-xl font-bold text-blue-500 mb-4">
                {selectedProduct.price} ₽
              </p>
            )}

            <div className="space-x-2">
              <button
                onClick={handleCancelSelection}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              >
                Отменить
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
              >
                В корзину
              </button>
              <button
                onClick={handleAddToFavorites}
                className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-300"
              >
                В избранное
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-20">Выберите продукт для подробностей.</p>
        )}
      </div>

      <div className="w-1/3 bg-white rounded-lg shadow p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Корзина</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Корзина пуста</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded"
                  unoptimized
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-blue-500">{item.price} ₽</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
