// app/sort/page.tsx
"use client";

import { useState } from "react";

const categories = [
  {
    id: "plastic",
    icon: "🧴",
    title: "Пластик",
    color: "bg-blue-50 border-blue-200",
    headerColor: "bg-blue-500",
    items: ["Су бөтелкелері", "Пакеттер", "Ыдыс-аяқ", "Шампунь бөтелкелері", "Йогурт стақандары"],
    tips: "Пластикті тастамас бұрын шайып, тегін жайып қойыңыз. Қақпақтарды бөлек жинаңыз.",
    notAccepted: ["Майланған пластик", "Пластик пакет (кейбір нүктелерде)"],
  },
  {
    id: "paper",
    icon: "📄",
    title: "Қағаз",
    color: "bg-yellow-50 border-yellow-200",
    headerColor: "bg-yellow-500",
    items: ["Газет, журнал", "Картон қорап", "Кеңсе қағазы", "Кітаптар", "Қаптама қағаздар"],
    tips: "Қағазды құрғақ күйінде жинаңыз. Дымқыл қағаз қайта өңделмейді.",
    notAccepted: ["Майланған қағаз", "Чек қағазы", "Салфетка"],
  },
  {
    id: "glass",
    icon: "🍾",
    title: "Шыны",
    color: "bg-green-50 border-green-200",
    headerColor: "bg-green-500",
    items: ["Шыны бөтелкелер", "Банкалар", "Шыны ыдыстар"],
    tips: "Шыныны жууды ұмытпаңыз. Түрлі түсті шыны бөлек жиналуы мүмкін.",
    notAccepted: ["Айна", "Лампочка", "Терезе шынысы", "Фарфор"],
  },
  {
    id: "metal",
    icon: "🥫",
    title: "Металл",
    color: "bg-gray-50 border-gray-200",
    headerColor: "bg-gray-500",
    items: ["Консерва банкалары", "Алюминий банкалар", "Темір қаптамалар"],
    tips: "Металл банкаларды жуып, мыжып тастаңыз — орын аз алады.",
    notAccepted: ["Батарейка", "Электр аспаптары"],
  },
  {
    id: "organic",
    icon: "🍂",
    title: "Органика",
    color: "bg-amber-50 border-amber-200",
    headerColor: "bg-amber-600",
    items: ["Тамақ қалдықтары", "Жеміс қабықтары", "Шай, кофе қалдықтары", "Өсімдік қалдықтары"],
    tips: "Органикалық қалдықтардан компост жасауға болады — тамаша тыңайтқыш!",
    notAccepted: ["Ет, сүйек (кейбір нүктелерде)", "Майлы тамақ"],
  },
  {
    id: "electronics",
    icon: "📱",
    title: "Электроника",
    color: "bg-purple-50 border-purple-200",
    headerColor: "bg-purple-500",
    items: ["Телефондар", "Компьютерлер", "Батарейкалар", "Зарядтауыштар", "Шамдар"],
    tips: "Электроника арнайы қабылдау нүктелеріне тапсырылуы тиіс. Кәдімгі қоқысқа тастауға болмайды!",
    notAccepted: [],
  },
];

export default function SortPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = categories.find((c) => c.id === selected);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Тақырып */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Қоқыс сұрыптау</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Қандай қалдықты қайда тастау керектігін біліңіз. Санатты таңдаңыз.
        </p>
      </div>

      {/* Санаттар */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(selected === cat.id ? null : cat.id)}
            className={`rounded-2xl border-2 p-4 flex flex-col items-center gap-2 transition-all cursor-pointer ${
              selected === cat.id
                ? `${cat.color} border-opacity-100 shadow-md scale-105`
                : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-sm font-medium text-gray-700">{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Мәліметтер панелі */}
      {active && (
        <div className={`rounded-2xl border-2 ${active.color} p-8 mb-10`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{active.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900">{active.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-green-500">✅</span> Қабылданады
              </h3>
              <ul className="space-y-2">
                {active.items.map((item) => (
                  <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span>💡</span> Кеңес
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{active.tips}</p>
            </div>
            {active.notAccepted.length > 0 && (
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-red-500">❌</span> Қабылданбайды
                </h3>
                <ul className="space-y-2">
                  {active.notAccepted.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
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
      <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Жалпы сұрыптау ережелері</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: "🚿", text: "Ыдыс-аяқ пен бөтелкелерді тастамас бұрын шайыңыз" },
            { icon: "🏷️", text: "Жапсырмаларды алып тастаудың қажеті жоқ" },
            { icon: "📦", text: "Картон қораптарды жайып, орын үнемдеңіз" },
            { icon: "🔋", text: "Батарейка мен электрониканы арнайы жерге тапсырыңыз" },
            { icon: "🛍️", text: "Пластик пакет орнына матадан жасалған сөмке қолданыңыз" },
            { icon: "♻️", text: "Белгісіз затты арнайы қоқысқа тастаңыз" },
          ].map((rule) => (
            <div key={rule.text} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
              <span className="text-xl flex-shrink-0">{rule.icon}</span>
              <p className="text-sm text-gray-600">{rule.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}