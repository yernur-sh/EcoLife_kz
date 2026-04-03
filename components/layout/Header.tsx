"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Хукті қостық
import Image from "next/image";


const navItems = [
  { href: "/",            label: "Басты бет"     },
  { href: "/sort",        label: "Қоқыс сұрыптау" },
  { href: "/map",         label: "Қабылдау нүктелері" },
  { href: "/challenges",  label: "Эко-челлендж"  },
  { href: "/quiz",        label: "Викторина"      },
  { href: "/diy",         label: "Қоқыстан өнер" },
  { href: "/reviews",     label: "Пікірлер"       },
];

export default function Header() {
  const pathname = usePathname();
  const { firebaseUser, isAuthenticated, loading } = useAuth(); // Қолданушы деректерін аламыз

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Лого */}
<Link href="/" className="flex items-center gap-3 group">

    <Image 
      src="/log.png" 
      alt="EcoLife KZ Logo"
      width={40} 
      height={40}
      className="object-contain"
    />
  
  <span className="font-bold text-[#107c41] text-xl tracking-tight">
    EcoLife <span className="text-green-500">KZ</span>
  </span>
</Link>

          {/* Навигация және Кіру/Профиль батырмасы */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Батырма логикасы осы жерде */}
            {loading ? (
              // Жүктеліп жатқанда кішкене бос орын (скелетон)
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : isAuthenticated ? (
              // 1. Егер кірген болса - ПРОФИЛЬ батырмасы
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-gray-50 hover:bg-green-50 px-3 py-1.5 rounded-full border border-gray-200 hover:border-green-200 transition-all"
              >
                <div className="relative w-7 h-7 overflow-hidden rounded-full border border-green-500 bg-gray-200 flex items-center justify-center flex-shrink-0">
                  {firebaseUser?.photoURL ? (
                    <img
                      src={firebaseUser.photoURL}
                      alt="Аватар"
                      referrerPolicy="no-referrer" // Google суреті мөлдір болмауы үшін
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'; // Қате болса суретті жасыру
                      }}
                    />
                  ) : null}
                  {/* Егер сурет жүктелмесе, астындағы иконка көрініп тұрады */}
                  <div className="absolute inset-0 -z-10 bg-green-100 flex items-center justify-center text-xs">
                    👤
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">Профиль</span>
              </Link>
            ) : (
              // 2. Егер кірмеген болса - КІРУ батырмасы
              <Link
                href="/login"
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Кіру
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}