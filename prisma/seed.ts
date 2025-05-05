
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    title: 'Яблоко',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Alice_%28apple%29.jpg/250px-Alice_%28apple%29.jpg',
    price: '2$/kg',
    overview: 'Яблоки свежие, привезено из Узбекистана',
  },
  {
    title: 'Апельсин',
    image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/d2/0a/8e785da452be823e2c932a24bfac.jpg',
    price: '3$/kg',
    overview: 'Сочные апельсины, богаты витамином C',
  },
  {
    title: 'Арбуз',
    image: 'https://ecomarket.ru/imgs/products/19080/-1.jpg',
    price: '1.5$/kg',
    overview: 'Спелые арбузы из южных регионов',
  },
];

async function main() {
  for (let i = 0; i < 10; i++) {
    const item = products[i % products.length];
    await prisma.product.create({
      data: {
        title: item.title,
        image: item.image,
        price: item.price,
        overview: item.overview,
      },
    });
  }
}

main()
  .then(() => console.log('Seed complete'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
