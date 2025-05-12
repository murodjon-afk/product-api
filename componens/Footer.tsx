
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#9fc653] text-white py-8 w-[90%] mx-[auto]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
     
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/mevazor.png"
              alt="Логотип Mevazor"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold">Mevazor</span>
          </Link>

    
          <div className="space-x-4">
            <Link href="#" className="text-white hover:text-gray-300">
              Facebook
            </Link>
            <Link href="#" className="text-white hover:text-gray-300">
              Instagram
            </Link>
            <Link href="#" className="text-white hover:text-gray-300">
              Twitter
            </Link>
          </div>
        </div>

 
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-semibold mb-2">О нас</h3>
            <ul>
              <li>
                <Link href="/about" className="text-white hover:text-gray-300">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-gray-300">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white hover:text-gray-300">
                  Часто задаваемые вопросы
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Полезные ссылки</h3>
            <ul>
              <li>
                <Link href="/terms" className="text-white hover:text-gray-300">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white hover:text-gray-300">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Контакты</h3>
            <ul>
              <li className="text-white">+998 ** *** ** **</li>
              <li className="text-white">mevazor@example.com</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Наш адрес</h3>
            <ul>
              <li className="text-white">Самарканд</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-white">
          <p>&copy; {new Date().getFullYear()} Mevazor. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
