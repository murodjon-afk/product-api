import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// Тип для данных нового продукта
interface ProductData {
  title: string;
  image: string;
  price: string;
  overview: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error instanceof Error ? error.message : error);
      return res.status(500).json({ error: 'Ошибка сервера при получении продуктов' });
    }
  }

  if (req.method === 'POST') {
    const { title, image, price, overview }: Partial<ProductData> = req.body;

    // Проверка обязательных полей
    if (!title || !image || !price || !overview) {
      return res.status(400).json({
        error: 'Все поля (title, image, price, overview) обязательны',
      });
    }

    try {
      const newProduct = await prisma.product.create({
        data: {
          title,
          image,
          price,
          overview,
        },
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error('Ошибка при создании продукта:', error instanceof Error ? error.message : error);
      return res.status(500).json({ error: 'Ошибка сервера при создании продукта' });
    }
  }

  // Метод не поддерживается
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Метод ${req.method} не разрешён`);
}
