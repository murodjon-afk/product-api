"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("userFirstName");
    if (storedName) {
      router.push("/admin");
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("cart");
    signOut();
  };

  const handleAdminClick = () => {
    const storedName = localStorage.getItem("userFirstName");

    if (storedName) {
      router.push("/admin");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const admins = [
      { name: "Murod", password: "MevazorAdmin" },
      { name: "Daler", password: "MevazorAdmin" },
    ];

    const admin = admins.find(
      (admin) => admin.name === name && admin.password === password
    );

    if (admin) {
      setError("");
      localStorage.setItem("userFirstName", admin.name);
      alert("Добро пожаловать в админку!");
      setIsModalOpen(false);
      router.push("/admin");
    } else {
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <header className="bg-blue-500 text-white py-4 shadow-md flex justify-between items-center px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/mevazor.png"
          alt="Логотип Mevazor"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-2xl font-bold hover:opacity-90">Mevazor</span>
      </Link>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск фруктов..."
        className="w-[50%] p-2 rounded-[10px] bg-white text-blue-500 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <nav className="space-x-2 flex items-center">
        <Link
          href="/"
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition"
        >
          Главная
        </Link>

        <button
          onClick={handleAdminClick}
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition"
        >
          Админка
        </button>

        {session ? (
          <div className="flex items-center gap-2">
            {session.user?.image && (
              <button onClick={handleSignOut} title="Выйти">
                <Image
                  src={session.user.image}
                  alt="GitHub avatar"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white hover:opacity-80 transition"
                />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Войти
          </button>
        )}
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm transition duration-300">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 opacity-100 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Вход в админку
            </h2>
            <form onSubmit={handleAdminSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm mb-1">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите имя"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm mb-1">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-4 text-center">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
              >
                Войти
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 block w-full text-center"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
