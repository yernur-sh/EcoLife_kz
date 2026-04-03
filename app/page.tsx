// app/page.tsx
import Link from "next/link";

const stats = [
  { label: "Жылдық қалдық көлемі", value: "180,000", unit: "тонна", icon: "🗑️" },
  { label: "Қайта өңделеді", value: "12", unit: "%", icon: "♻️" },
  { label: "Полигон толу деңгейі", value: "78", unit: "%", icon: "📊" },
  { label: "Қабылдау нүктелері", value: "24", unit: "нүкте", icon: "📍" },
];

const sections = [
  { href: "/sort",        icon: "🗂️", title: "Қоқыс сұрыптау",        desc: "Қандай қоқысты қайда тастау керектігін біліңіз" },
  { href: "/map",         icon: "🗺️", title: "Қабылдау нүктелері",     desc: "Жақын маңдағы қалдық қабылдау пункттері" },
  { href: "/challenges",  icon: "🏆", title: "Эко-челлендж",           desc: "Күнделікті тапсырмаларды орындап ұпай жинаңыз" },
  { href: "/quiz",        icon: "❓", title: "Викторина",               desc: "Экология туралы білімін тексер" },
  { href: "/diy",         icon: "🎨", title: "Қоқыстан өнер",          desc: "Қалдықтардан пайдалы заттар жасаңыз" },
  { href: "/reviews",     icon: "💬", title: "Пікірлер",               desc: "Ойыңызды бөлісіңіз" },
];

const pollutionLevels = [
  { area: "Қызылорда қ. орталығы", level: 72, color: "bg-orange-500" },
  { area: "Тасбөгет ауданы",       level: 85, color: "bg-red-500"    },
  { area: "Саяхат ауданы",         level: 61, color: "bg-orange-400" },
  { area: "Өркендеу ауданы",       level: 48, color: "bg-yellow-400" },
  { area: "Жаңақала ауданы",       level: 55, color: "bg-yellow-500" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <span className="inline-block bg-green-600 text-green-100 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Қызылорда қаласы
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Таза қала — <br />
              <span className="text-green-300">бізден басталады</span>
            </h1>
            <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-2xl">
              Қызылорда қаласының экологиялық жағдайы туралы ақпарат алыңыз,
              қоқысты дұрыс сұрыптауды үйреніңіз және қаламызды бірге тазартайық.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sort"
                className="bg-white text-green-800 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
              >
                Сұрыптауды үйрен
              </Link>
              <Link
                href="/map"
                className="border border-green-400 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
              >
                Нүктелерді тап
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Қызылорда қаласының қалдық статистикасы
          </h2>
          <p className="text-gray-500">2024 жылғы деректер негізінде</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
                <span className="text-lg text-gray-400 ml-1">{stat.unit}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ластану деңгейі */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Аудандар бойынша ластану деңгейі
            </h2>
            <p className="text-gray-500">
              Қызылорда қаласының әр ауданындағы қалдықпен ластану көрсеткіші
            </p>
          </div>

          <div className="space-y-5 max-w-2xl">
            {pollutionLevels.map((item) => (
              <div key={item.area}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">
                    {item.area}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      item.level >= 80
                        ? "text-red-600"
                        : item.level >= 60
                        ? "text-orange-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all`}
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="text-gray-500">Орташа (40–60%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-gray-500">Жоғары (60–80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-500">Қауіпті (80%+)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Мәтін блогы */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Қызылорда қаласындағы қалдық мәселесі
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              Қызылорда қаласы жыл сайын <strong className="text-gray-800">180 мың тоннадан</strong> астам тұрмыстық қалдық шығарады.
              Бұл қалдықтардың тек <strong className="text-gray-800">12 пайызы</strong> ғана қайта өңдеуге жіберіледі,
              қалғаны полигондарға тасталады.
            </p>
            <p>
              Қалалық полигондардың <strong className="text-gray-800">78 пайызы</strong> толып қалу шегіне жетіп отыр.
              Бұл жағдай топырақ пен жерасты суларының ластануына, ауа сапасының
              нашарлауына тікелей әсер етеді.
            </p>
            <p>
              Мәселені шешудің бірден-бір жолы — әр азаматтың қоқысты <strong className="text-gray-800">дұрыс сұрыптауы</strong>.
              Пластик, қағаз, шыны және органикалық қалдықтарды бөлек жинасақ,
              қайта өңдеу деңгейін <strong className="text-gray-800">40 пайызға</strong> дейін көтеруге болады.
            </p>
          </div>
        </div>
      </section>

      {/* Бөлімдер торы */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">
            Сайттың бөлімдері
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-green-200 transition-all group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}