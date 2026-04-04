"use client";

import { useState } from "react";

// Нүктелер тізімі (Деректер қоры) - Координаталар қаз-қалпында сақталды
const points = [
   {
    id: 7,
    name: "Майлықұм қабылдау нүктесі",
    address: "Майлықұм көшесі, 1А",
    phone: "+7 724 100-01-01",
    hours: "Дс-Сб: 09:00–18:00",
    categories: ["Қағаз"],
    lat: 44.851575,
    lng: 65.5212,
    rating: 4.4,
    distance: "4.2 км",
  },
  {
    id: 8,
    name: "Мұстафа Шоқай металл қабылдау",
    address: "Мұстафа Шоқай көшесі, 53",
    phone: "+7 724 100-02-02",
    hours: "Дс-Жм: 08:00–19:00",
    categories: ["Металл"],
    lat: 44.839049,
    lng: 65.520143,
    rating: 4.6,
    distance: "2.8 км",
  },
  {
    id: 9,
    name: "Иманов эко-орталығы",
    address: "Амангельды Иманов көшесі, 67а к2",
    phone: "+7 724 100-03-03",
    hours: "Күн сайын: 09:00–20:00",
    categories: ["Пластик", "Қағаз", "Металл"],
    lat: 44.830986,
    lng: 65.516175,
    rating: 4.8,
    distance: "1.5 км",
  },
  {
    id: 1,
    name: "EcoPoint №1",
    address: "Әйтеке би көшесі, 45",
    phone: "+7 724 123-45-67",
    hours: "Дс-Жм: 09:00–18:00",
    categories: ["Пластик", "Қағаз", "Шыны"],
    lat: 44.853,
    lng: 65.509,
    rating: 4.5,
    distance: "0.5 км",
  },
  {
    id: 2,
    name: "ГорЭко қабылдау пункті",
    address: "Қорқыт ата даңғылы, 120",
    phone: "+7 724 234-56-78",
    hours: "Дс-Сб: 08:00–19:00",
    categories: ["Металл", "Электроника", "Пластик"],
    lat: 44.857,
    lng: 65.515,
    rating: 4.2,
    distance: "1.2 км",
  },
  {
    id: 3,
    name: "Жасыл нүкте",
    address: "Абай көшесі, 78",
    phone: "+7 724 345-67-89",
    hours: "Күн сайын: 10:00–17:00",
    categories: ["Қағаз", "Органика"],
    lat: 44.849,
    lng: 65.503,
    rating: 4.0,
    distance: "1.8 км",
  },
  {
    id: 4,
    name: "ТехноРецикл",
    address: "Байқоңыр көшесі, 33",
    phone: "+7 724 456-78-90",
    hours: "Дс-Жм: 09:00–17:00",
    categories: ["Электроника", "Батарейка"],
    lat: 44.861,
    lng: 65.521,
    rating: 4.7,
    distance: "2.1 км",
  },
  {
    id: 5,
    name: "Пластик қабылдау орталығы",
    address: "Тәуелсіздік көшесі, 15",
    phone: "+7 724 567-89-01",
    hours: "Дс-Сб: 08:00–20:00",
    categories: ["Пластик", "Металл"],
    lat: 44.845,
    lng: 65.497,
    rating: 3.9,
    distance: "2.5 км",
  },
  {
    id: 6,
    name: "Шыны жинау пункті",
    address: "Момышұлы көшесі, 56",
    phone: "+7 724 678-90-12",
    hours: "Күн сайын: 09:00–18:00",
    categories: ["Шыны"],
    lat: 44.865,
    lng: 65.528,
    rating: 4.1,
    distance: "3.0 км",
  },
];

const allCategories = ["Барлығы", "Пластик", "Қағаз", "Шыны", "Металл", "Электроника", "Батарейка", "Органика"];

// Түстер палитрасы жұмсақ әрі заманауи етіп өзгертілді
const categoryColors: Record<string, string> = {
  "Пластик":     "bg-blue-50 text-blue-700 border border-blue-100",
  "Қағаз":       "bg-amber-50 text-amber-700 border border-amber-100",
  "Шыны":        "bg-emerald-50 text-emerald-700 border border-emerald-100",
  "Металл":      "bg-slate-100 text-slate-700 border border-slate-200",
  "Электроника": "bg-indigo-50 text-indigo-700 border border-indigo-100",
  "Батарейка":   "bg-rose-50 text-rose-700 border border-rose-100",
  "Органика":    "bg-orange-50 text-orange-700 border border-orange-100",
};

// Жұлдызшалар компоненті
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs font-semibold text-slate-400 ml-1.5">{rating}</span>
    </div>
  );
}

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState("Барлығы");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered =
    activeFilter === "Барлығы"
      ? points
      : points.filter((p) => p.categories.includes(activeFilter));

  const selectedPoint = points.find((p) => p.id === selectedId);

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Тақырып */}
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Қалдық қабылдау нүктелері
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Қызылорда қаласындағы барлық қалдық қабылдау пункттері. Өзіңізге жақын нүктені картадан табыңыз.
          </p>
        </div>

        {/* Фильтр */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {allCategories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 hover:shadow-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Нүктелер тізімі */}
          <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filtered.map((point) => {
              const isSelected = selectedId === point.id;
              return (
                <button
                  key={point.id}
                  onClick={() => setSelectedId(isSelected ? null : point.id)}
                  className={`w-full text-left rounded-3xl border-2 p-5 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-50/80 shadow-[0_8px_30px_rgb(16,185,129,0.15)] scale-[1.01]"
                      : "border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-bold text-base ${isSelected ? "text-emerald-900" : "text-slate-800"}`}>
                      {point.name}
                    </h3>
                    <span className="text-xs font-semibold bg-white border border-slate-100 text-slate-500 px-2 py-1 rounded-lg flex-shrink-0 ml-3 shadow-sm">
                      {point.distance}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mb-3 flex items-start gap-2">
                    <span className="mt-0.5">📍</span> {point.address}
                  </p>
                  <Stars rating={point.rating} />
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/5">
                    {point.categories.map((cat) => (
                      <span
                        key={cat}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold ${categoryColors[cat] ?? "bg-slate-100 text-slate-600 border border-slate-200"}`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
            
            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  🔍
                </div>
                <p className="text-slate-500 font-medium">Бұл санат бойынша нүкте табылмады</p>
              </div>
            )}
          </div>

          {/* Карта + мәліметтер */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Динамикалық Карта (OpenStreetMap) */}
            <div className="bg-slate-200 rounded-3xl overflow-hidden h-[400px] relative border border-slate-200 shadow-sm group">
              <iframe
                src={
                  selectedPoint 
                    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selectedPoint.lng-0.01}%2C${selectedPoint.lat-0.005}%2C${selectedPoint.lng+0.01}%2C${selectedPoint.lat+0.005}&layer=mapnik&marker=${selectedPoint.lat}%2C${selectedPoint.lng}`
                    : "https://www.openstreetmap.org/export/embed.html?bbox=65.48%2C44.83%2C65.55%2C44.88&layer=mapnik"
                }
                className="w-full h-full border-0 transition-opacity duration-500"
                title="Қызылорда картасы"
              />
              <div className="absolute bottom-4 right-4 opacity-90 group-hover:opacity-100 transition-opacity">
                <a
                  href={selectedPoint ? `https://www.openstreetmap.org/#map=17/${selectedPoint.lat}/${selectedPoint.lng}` : "https://www.openstreetmap.org/#map=14/44.853/65.509"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-sm text-sm font-semibold text-slate-700 px-4 py-2.5 rounded-xl shadow-md border border-slate-200 hover:bg-white hover:text-emerald-700 transition-colors flex items-center gap-2"
                >
                  Үлкен картада ашу ↗
                </a>
              </div>
            </div>

            {/* Таңдалған нүкте мәліметі */}
            {selectedPoint ? (
              <div className="bg-white rounded-3xl border border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 transition-all duration-300">
                <h2 className="text-2xl font-extrabold text-slate-800 mb-6">
                  {selectedPoint.name}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-sm font-medium text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 text-lg">📍</div>
                      <span className="mt-1.5">{selectedPoint.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 text-lg">📞</div>
                      <a href={`tel:${selectedPoint.phone}`} className="hover:text-emerald-600 transition-colors">
                        {selectedPoint.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 text-lg">🕐</div>
                      <span>{selectedPoint.hours}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-sm font-bold text-slate-700 mb-3">Қабылданатын қалдықтар:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPoint.categories.map((cat) => (
                        <span
                          key={cat}
                          className={`text-xs px-3 py-1.5 rounded-lg font-bold ${categoryColors[cat] ?? "bg-slate-200 text-slate-700"}`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <a
                  href={`https://2gis.kz/kyzylorda/search/${encodeURIComponent(selectedPoint.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-emerald-600 text-white text-sm font-bold px-8 py-3.5 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  🗺️ Маршрут құру (2GIS)
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 flex flex-col items-center justify-center text-center text-slate-400 h-[250px]">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-4 animate-bounce duration-[2000ms]">
                  👆
                </div>
                <p className="text-base font-medium text-slate-500 max-w-sm">
                  Толық мәлімет алу үшін және маршрут құру үшін тізімнен бір нүктені таңдаңыз
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Жалпы ақпарат блоктары */}
        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {[
            { icon: "📦", title: "Жалпы саны", desc: `${points.length} қабылдау нүктесі`, color: "text-blue-600", bg: "bg-blue-50" },
            { icon: "🕐", title: "Жұмыс уақыты", desc: "Көпшілігі 08:00–19:00", color: "text-amber-600", bg: "bg-amber-50" },
            { icon: "📞", title: "Анықтама", desc: "+7 724 100-00-00", color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex gap-5 items-center">
              <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-base">{item.title}</p>
                <p className="text-sm font-medium text-slate-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}