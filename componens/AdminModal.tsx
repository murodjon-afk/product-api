'use client';

import { useState } from 'react';

interface AdminModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminModal({ onClose, onSuccess }: AdminModalProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
  
    if (
      (name === 'Murod' || name === 'Daler') &&
      password === 'MevazorAdmin'
    ) {
      localStorage.setItem('adminLoggedIn', name);
      onSuccess();
    } else {
      setErrorMessage('Неверное имя или пароль');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-[400px] max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Вход в админ панель</h2>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
            Имя
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите имя"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите пароль"
          />
        </div>
        {errorMessage && (
          <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
        )}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            Войти
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
