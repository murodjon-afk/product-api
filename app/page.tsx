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
    <>
      {/* Баннер сверху */}
    <div className="flex flex-col items-center gap-5">
    <h1 className="text-3xl font-bold pl-">Открой вкус природы с Mevazor — закажи фрукты, которые ты полюбишь!</h1>

<div className="grid grid-cols-3 grid-rows-3 gap-4 p-4 h-screen w-[90%] mx-[auto]">
{/* Большое видео слева сверху (занимает 2 колонки) */}
<div className="col-span-2 row-span-2">
  <video
    src="/mevazorVideo.mp4"
    autoPlay
    loop
    muted
    className="w-full h-full object-cover rounded-lg"
  />
</div>

{/* Маленькое видео справа вверху */}
<div className="col-span-1 row-span-1">
  <video
    src="/limon.mp4"
    autoPlay
    loop
    muted
    className="w-full h-full object-cover rounded-lg"
  />
</div>

{/* Видео справа посередине */}
<div className="col-span-1 row-span-1">
  <video
    src="/orange.mp4"
    autoPlay
    loop
    muted
    className="w-full h-full object-cover rounded-lg"
  />
</div>

{/* Видео внизу по центру (на всю ширину) */}
<div className="col-span-3 row-span-1">
  <video
    src="/strawberry.mp4"
    autoPlay
    loop
    muted
    className="w-full h-full object-cover rounded-lg"
  />
</div>
</div>

    </div>
      {/* Основной интерфейс: продукты, детали, корзина */}
      <div className="flex space-x-6 h-[85vh] p-4 px-25">
        {/* Список продуктов */}
        <div className="w-2/3 overflow-auto bg-white rounded-lg shadow p-4">
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
                    className="cursor-pointer bg-white transition p-3 rounded-lg shadow-sm flex flex-col items-center"
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
                      <p className="text-green-500 font-semibold text-sm mt-1">
                        {product.price} ₽
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Детали продукта */}
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
            <div className="text-center">
            <p className="text-gray-500 mt-20 text-xl">Выберите продукт для подробностей.</p>
            <Image
              src="/broccolli.png"  
              alt="Default Image"
              width={500}
              height={300}
              className="mx-auto mt-4"
            />
            <h1 className="text-gray-500 text-2xl">Продукт еще не выбран </h1>
          </div>
          )}
        </div>

        {/* Корзина */}
      
      </div>





    <div className="w-[90%] h-[600px] mx-auto mb-6 rounded-lg overflow-hidden">
        <Image
          src="/mevazor2.jpg"
          alt="Баннер"
          width={1600}
          height={600}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    </>
  );
}
