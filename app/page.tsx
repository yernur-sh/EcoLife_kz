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
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900 text-white">
        {/* Декоративті фон элементтері */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-400 opacity-10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-green-50 text-sm font-semibold tracking-wide px-4 py-1.5 rounded-full mb-6 shadow-sm">
              📍 Қызылорда қаласы
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Таза қала — <br />
              <span className="text-emerald-300 drop-shadow-md">бізден басталады</span>
            </h1>
            <p className="text-emerald-50/90 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              Қызылорда қаласының экологиялық жағдайы туралы ақпарат алыңыз,
              қоқысты дұрыс сұрыптауды үйреніңіз және қаламызды бірге тазартайық.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/sort"
                className="bg-white text-emerald-900 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-emerald-50 transition-all duration-300"
              >
                Сұрыптауды үйрен
              </Link>
              <Link
                href="/map"
                className="bg-emerald-800/50 backdrop-blur-md border border-emerald-400/50 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-700/60 hover:-translate-y-1 transition-all duration-300"
              >
                Нүктелерді тап
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="relative -mt-10 max-w-7xl mx-auto px-6 z-10 mb-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">
              Қаланың қалдық статистикасы
            </h2>
            <p className="text-slate-500 font-medium">2024 жылғы деректер негізінде</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  {stat.value}
                  <span className="text-base font-medium text-slate-400 ml-1">{stat.unit}</span>
                </div>
                <div className="text-sm font-medium text-slate-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ластану деңгейі & Мәтін блогы (Қатар орналастыру немесе біріктірілген дизайн) */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Ластану деңгейі */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
                Аудандар бойынша ластану
              </h2>
              <p className="text-slate-500 text-sm">
                Қызылорда қаласының әр ауданындағы қалдықпен ластану көрсеткіші
              </p>
            </div>

            <div className="space-y-6">
              {pollutionLevels.map((item) => (
                <div key={item.area}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.area}
                    </span>
                    <span
                      className={`text-sm font-black ${
                        item.level >= 80
                          ? "text-red-500"
                          : item.level >= 60
                          ? "text-orange-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {item.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-100 text-sm font-medium">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm" />
                <span className="text-slate-600">Орташа (40–60%)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
                <span className="text-slate-600">Жоғары (60–80%)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                <span className="text-slate-600">Қауіпті (80%+)</span>
              </div>
            </div>
          </div>

          {/* Мәтін блогы */}
          <div className="relative bg-emerald-50 rounded-3xl border border-emerald-100 p-8 md:p-10 overflow-hidden flex flex-col justify-center">
            {/* Артқы фондық иконка */}
            <div className="absolute right-0 bottom-0 text-[150px] opacity-5 -mr-10 -mb-10 pointer-events-none">
              🌍
            </div>
            
            <h2 className="text-2xl font-extrabold text-emerald-950 mb-6">
              Қызылорда қаласындағы қалдық мәселесі
            </h2>
            <div className="space-y-5 text-emerald-800/80 leading-relaxed font-medium">
              <p>
                Қызылорда қаласы жыл сайын <strong className="text-emerald-900 font-bold bg-emerald-200/40 px-1 rounded">180 мың тоннадан</strong> астам тұрмыстық қалдық шығарады.
                Бұл қалдықтардың тек <strong className="text-emerald-900 font-bold bg-emerald-200/40 px-1 rounded">12 пайызы</strong> ғана қайта өңдеуге жіберіледі,
                қалғаны полигондарға тасталады.
              </p>
              <p>
                Қалалық полигондардың <strong className="text-emerald-900 font-bold bg-emerald-200/40 px-1 rounded">78 пайызы</strong> толып қалу шегіне жетіп отыр.
                Бұл жағдай топырақ пен жерасты суларының ластануына, ауа сапасының
                нашарлауына тікелей әсер етеді.
              </p>
              <p>
                Мәселені шешудің бірден-бір жолы — әр азаматтың қоқысты <strong className="text-emerald-900 font-bold">дұрыс сұрыптауы</strong>.
                Пластик, қағаз, шыны және органикалық қалдықтарды бөлек жинасақ,
                қайта өңдеу деңгейін <strong className="text-emerald-900 font-bold bg-emerald-200/40 px-1 rounded">40 пайызға</strong> дейін көтеруге болады.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Бөлімдер торы */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Қызметтер мен мүмкіндіктер
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Экологиялық өмір салтын қалыптастыруға арналған сайттың негізгі бөлімдерімен танысыңыз.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-4xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}