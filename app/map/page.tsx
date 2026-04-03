"use client";

import { useState } from "react";

// Нүктелер тізімі (Деректер қоры)
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

const categoryColors: Record<string, string> = {
  "Пластик":     "bg-blue-100 text-blue-700",
  "Қағаз":        "bg-yellow-100 text-yellow-700",
  "Шыны":         "bg-green-100 text-green-700",
  "Металл":       "bg-gray-100 text-gray-700",
  "Электроника": "bg-purple-100 text-purple-700",
  "Батарейка":   "bg-red-100 text-red-700",
  "Органика":    "bg-amber-100 text-amber-700",
};

// Жұлдызшалар компоненті
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating}</span>
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Тақырып */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Қалдық қабылдау нүктелері
        </h1>
        <p className="text-gray-500 text-lg">
          Қызылорда қаласындағы барлық қалдық қабылдау пункттері
        </p>
      </div>

      {/* Фильтр */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              activeFilter === cat
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Нүктелер тізімі */}
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {filtered.map((point) => (
            <button
              key={point.id}
              onClick={() => setSelectedId(selectedId === point.id ? null : point.id)}
              className={`w-full text-left rounded-2xl border p-4 transition-all cursor-pointer ${
                selectedId === point.id
                  ? "border-green-400 bg-green-50 shadow-md"
                  : "border-gray-100 bg-white hover:border-green-200 hover:shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{point.name}</h3>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{point.distance}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <span>📍</span> {point.address}
              </p>
              <Stars rating={point.rating} />
              <div className="flex flex-wrap gap-1 mt-2">
                {point.categories.map((cat) => (
                  <span
                    key={cat}
                    className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[cat] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>Бұл санат бойынша нүкте табылмады</p>
            </div>
          )}
        </div>

        {/* Карта + мәліметтер */}
        <div className="lg:col-span-2 space-y-4">
          {/* Динамикалық Карта (OpenStreetMap) */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-[400px] relative border border-gray-200">
            <iframe
              src={
                selectedPoint 
                  ? `https://www.openstreetmap.org/export/embed.html?bbox=${selectedPoint.lng-0.01}%2C${selectedPoint.lat-0.005}%2C${selectedPoint.lng+0.01}%2C${selectedPoint.lat+0.005}&layer=mapnik&marker=${selectedPoint.lat}%2C${selectedPoint.lng}`
                  : "https://www.openstreetmap.org/export/embed.html?bbox=65.48%2C44.83%2C65.55%2C44.88&layer=mapnik"
              }
              className="w-full h-full border-0 transition-all duration-500"
              title="Қызылорда картасы"
            />
            <div className="absolute bottom-3 right-3">
              <a
                href={selectedPoint ? `https://www.openstreetmap.org/#map=17/${selectedPoint.lat}/${selectedPoint.lng}` : "https://www.openstreetmap.org/#map=14/44.853/65.509"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-xs text-gray-600 px-3 py-1.5 rounded-lg shadow border border-gray-200 hover:bg-gray-50"
              >
                Үлкен картада ашу ↗
              </a>
            </div>
          </div>

          {/* Таңдалған нүкте мәліметі */}
          {selectedPoint ? (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {selectedPoint.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-base flex-shrink-0">📍</span>
                    <span>{selectedPoint.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">📞</span>
                    <a href={`tel:${selectedPoint.phone}`} className="hover:text-green-600">
                      {selectedPoint.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">🕐</span>
                    <span>{selectedPoint.hours}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Қабылданатын қалдықтар:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPoint.categories.map((cat) => (
                      <span
                        key={cat}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[cat] ?? "bg-gray-100 text-gray-600"}`}
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
                className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
              >
                🗺️ Маршрут құру (2GIS)
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-400">
              <p className="text-3xl mb-2">👆</p>
              <p className="text-sm">Мәліметті көру үшін сол жақтан нүктені таңдаңыз</p>
            </div>
          )}
        </div>
      </div>

      {/* Жалпы ақпарат блоктары */}
      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        {[
          { icon: "📦", title: "Жалпы саны", desc: `${points.length} қабылдау нүктесі` },
          { icon: "🕐", title: "Жұмыс уақыты", desc: "Көпшілігі 08:00–19:00" },
          { icon: "📞", title: "Анықтама", desc: "+7 724 100-00-00" },
        ].map((item) => (
          <div key={item.title} className="bg-green-50 border border-green-100 rounded-2xl p-5 flex gap-4 items-start">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}