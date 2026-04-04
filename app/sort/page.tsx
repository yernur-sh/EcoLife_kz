// app/sort/page.tsx
"use client";

import { useState } from "react";

const categories = [
  {
    id: "plastic",
    icon: "🧴",
    title: "Пластик",
    color: "bg-blue-50/80 border-blue-200",
    activeColor: "bg-blue-50 border-blue-400 shadow-[0_8px_30px_rgb(59,130,246,0.15)]",
    iconBg: "bg-blue-100 text-blue-600",
    items: ["Су бөтелкелері", "Пакеттер", "Ыдыс-аяқ", "Шампунь бөтелкелері", "Йогурт стақандары"],
    tips: "Пластикті тастамас бұрын шайып, тегіп жайып қойыңыз. Қақпақтарды бөлек жинаңыз.",
    notAccepted: ["Майланған пластик", "Пластик пакет (кейбір нүктелерде)"],
  },
  {
    id: "paper",
    icon: "📄",
    title: "Қағаз",
    color: "bg-amber-50/80 border-amber-200",
    activeColor: "bg-amber-50 border-amber-400 shadow-[0_8px_30px_rgb(245,158,11,0.15)]",
    iconBg: "bg-amber-100 text-amber-600",
    items: ["Газет, журнал", "Картон қорап", "Кеңсе қағазы", "Кітаптар", "Қаптама қағаздар"],
    tips: "Қағазды құрғақ күйінде жинаңыз. Дымқыл қағаз қайта өңделмейді.",
    notAccepted: ["Майланған қағаз", "Чек қағазы", "Салфетка"],
  },
  {
    id: "glass",
    icon: "🍾",
    title: "Шыны",
    color: "bg-emerald-50/80 border-emerald-200",
    activeColor: "bg-emerald-50 border-emerald-400 shadow-[0_8px_30px_rgb(16,185,129,0.15)]",
    iconBg: "bg-emerald-100 text-emerald-600",
    items: ["Шыны бөтелкелер", "Банкалар", "Шыны ыдыстар"],
    tips: "Шыныны жууды ұмытпаңыз. Түрлі түсті шыны бөлек жиналуы мүмкін.",
    notAccepted: ["Айна", "Лампочка", "Терезе шынысы", "Фарфор"],
  },
  {
    id: "metal",
    icon: "🥫",
    title: "Металл",
    color: "bg-slate-100/80 border-slate-200",
    activeColor: "bg-slate-100 border-slate-400 shadow-[0_8px_30px_rgb(100,116,139,0.15)]",
    iconBg: "bg-slate-200 text-slate-700",
    items: ["Консерва банкалары", "Алюминий банкалар", "Темір қаптамалар"],
    tips: "Металл банкаларды жуып, мыжып тастаңыз — орын аз алады.",
    notAccepted: ["Батарейка", "Электр аспаптары"],
  },
  {
    id: "organic",
    icon: "🍂",
    title: "Органика",
    color: "bg-orange-50/80 border-orange-200",
    activeColor: "bg-orange-50 border-orange-400 shadow-[0_8px_30px_rgb(249,115,22,0.15)]",
    iconBg: "bg-orange-100 text-orange-600",
    items: ["Тамақ қалдықтары", "Жеміс қабықтары", "Шай, кофе қалдықтары", "Өсімдік қалдықтары"],
    tips: "Органикалық қалдықтардан компост жасауға болады — тамаша тыңайтқыш!",
    notAccepted: ["Ет, сүйек (кейбір нүктелерде)", "Майлы тамақ"],
  },
  {
    id: "electronics",
    icon: "📱",
    title: "Электроника",
    color: "bg-indigo-50/80 border-indigo-200",
    activeColor: "bg-indigo-50 border-indigo-400 shadow-[0_8px_30px_rgb(99,102,241,0.15)]",
    iconBg: "bg-indigo-100 text-indigo-600",
    items: ["Телефондар", "Компьютерлер", "Батарейкалар", "Зарядтауыштар", "Шамдар"],
    tips: "Электроника арнайы қабылдау нүктелеріне тапсырылуы тиіс. Кәдімгі қоқысқа тастауға болмайды!",
    notAccepted: [],
  },
];

export default function SortPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = categories.find((c) => c.id === selected);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Тақырып */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Қоқыс сұрыптау ережелері
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Қандай қалдықты қайда тастау керектігін біліңіз. Толық мәлімет алу үшін санатты таңдаңыз.
          </p>
        </div>

        {/* Санаттар торы */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((cat) => {
            const isSelected = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelected(isSelected ? null : cat.id)}
                className={`group rounded-3xl border-2 p-5 flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? `${cat.activeColor} scale-[1.02]`
                    : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md hover:-translate-y-1"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110 bg-slate-50"}`}>
                  {cat.icon}
                </div>
                <span className={`text-sm font-bold transition-colors ${isSelected ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"}`}>
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Мәліметтер панелі */}
        {active && (
          <div className={`rounded-3xl border-2 ${active.color} p-8 md:p-10 mb-12 transition-all duration-500 ease-in-out`}>
            <div className="flex items-center gap-4 mb-8 border-b border-black/5 pb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm bg-white`}>
                {active.icon}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">{active.title}</h2>
                <p className="text-slate-600 font-medium text-sm mt-1">Сұрыптау нұсқаулығы</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Қабылданады */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">✅</span> 
                  Қабылданады
                </h3>
                <ul className="space-y-3">
                  {active.items.map((item) => (
                    <li key={item} className="text-sm font-medium text-slate-600 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Кеңес */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">💡</span> 
                  Кеңес
                </h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">{active.tips}</p>
              </div>

              {/* Қабылданбайды */}
              {active.notAccepted.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">❌</span> 
                    Қабылданбайды
                  </h3>
                  <ul className="space-y-3">
                    {active.notAccepted.map((item) => (
                      <li key={item} className="text-sm font-medium text-slate-600 flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Жалпы ережелер */}
        <div className="relative bg-emerald-50 rounded-3xl border border-emerald-100 p-8 md:p-10 overflow-hidden mt-8">
          {/* Фондық декорация */}
          <div className="absolute right-0 top-0 text-[180px] opacity-[0.03] -mr-10 -mt-10 pointer-events-none">
            ♻️
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-950 mb-8">
              Жалпы сұрыптау ережелері
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "🚿", text: "Ыдыс-аяқ пен бөтелкелерді тастамас бұрын шайыңыз" },
                { icon: "🏷️", text: "Жапсырмаларды алып тастаудың қажеті жоқ" },
                { icon: "📦", text: "Картон қораптарды жайып, орын үнемдеңіз" },
                { icon: "🔋", text: "Батарейка мен электрониканы арнайы жерге тапсырыңыз" },
                { icon: "🛍️", text: "Пластик пакет орнына матадан жасалған сөмке қолданыңыз" },
                { icon: "♻️", text: "Белгісіз затты арнайы қоқысқа тастаңыз" },
              ].map((rule) => (
                <div key={rule.text} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-emerald-50 hover:shadow-md transition-shadow duration-300">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl flex-shrink-0">
                    {rule.icon}
                  </div>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed pt-1">
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}