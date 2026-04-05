"use client";

import { useState } from "react";

// Нүктелер тізімі
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
  "Пластик":     "bg-blue-50 text-blue-700 border border-blue-200",
  "Қағаз":       "bg-amber-50 text-amber-700 border border-amber-200",
  "Шыны":        "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Металл":      "bg-slate-100 text-slate-700 border border-slate-200",
  "Электроника": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Батарейка":   "bg-rose-50 text-rose-700 border border-rose-200",
  "Органика":    "bg-orange-50 text-orange-700 border border-orange-200",
};

// Жұлдызшалар
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-[13px] ${star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs font-bold text-slate-400 ml-1.5">{rating}</span>
    </div>
  );
}

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState("Барлығы");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = activeFilter === "Барлығы" ? points : points.filter((p) => p.categories.includes(activeFilter));
  const selectedPoint = points.find((p) => p.id === selectedId);

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24">
      
      {/* 100% Ортақ стильдегі Hero Section (Градиент) */}
      <section className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-800 text-white relative py-20 overflow-hidden">
        {/* Артқы фондағы анимациялық шеңберлер */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-[80px] -ml-20 -mb-20 animate-[pulse_6s_ease-in-out_infinite]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center animate-in fade-in zoom-in-95 duration-1000">
          <span className="inline-block bg-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/30 shadow-sm">
            Қала картасы
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
            Қабылдау нүктелері
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto">
            Қызылорда қаласындағы барлық қалдық қабылдау пункттері. Өзіңізге жақын нүктені картадан оңай табыңыз.
          </p>
        </div>
      </section>

      {/* Негізгі Контент (Жоғарыға шығып тұрады -mt-10) */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* Фильтр (Ақ блок ішіндегі Pills) */}
        <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-slate-100 p-4 md:p-6 mb-8 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {allCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setSelectedId(null); // Фильтр ауысқанда таңдауды алып тастау
                  }}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 -translate-y-0.5"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Грид: Тізім + Карта */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Нүктелер тізімі (Сол жақ бағана) */}
          <div className="lg:col-span-4 space-y-4 max-h-[700px] overflow-y-auto pr-2 pb-4 scrollbar-hide">
            {filtered.map((point, index) => {
              const isSelected = selectedId === point.id;
              return (
                <button
                  key={point.id}
                  onClick={() => setSelectedId(isSelected ? null : point.id)}
                  // Әр карточкаға кезектесіп шығатын анимация (staggered animation)
                  style={{ animationFillMode: "both", animationDelay: `${index * 80}ms` }}
                  className={`w-full text-left rounded-[2rem] p-6 transition-all duration-300 cursor-pointer border-2 group animate-in slide-in-from-left-8 fade-in ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 shadow-[0_10px_30px_rgb(16,185,129,0.2)] scale-[1.02] relative overflow-hidden"
                      : "border-slate-100 bg-white hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {/* Таңдалған кездегі бүйірдегі жасыл сызық анимациясы */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500 animate-in slide-in-from-left duration-300"></div>
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-black text-lg tracking-tight transition-colors ${isSelected ? "text-emerald-900" : "text-slate-800 group-hover:text-emerald-700"}`}>
                      {point.name}
                    </h3>
                    <span className={`text-xs font-extrabold px-2.5 py-1 rounded-xl flex-shrink-0 ml-3 transition-colors ${isSelected ? "bg-emerald-200 text-emerald-800" : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600"}`}>
                      {point.distance}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-slate-500 mb-4 flex items-start gap-2">
                    <span className="mt-0.5 opacity-70">📍</span> {point.address}
                  </p>
                  
                  <Stars rating={point.rating} />
                  
                  <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-200/60">
                    {point.categories.map((cat) => (
                      <span
                        key={cat}
                        className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-lg font-black ${categoryColors[cat] ?? "bg-slate-100 text-slate-600 border border-slate-200"}`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
            
            {/* Бос нәтиже */}
            {filtered.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-300 animate-in zoom-in fade-in">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
                  🔍
                </div>
                <p className="text-slate-500 font-bold text-lg">Бұл санат бойынша нүкте табылмады</p>
              </div>
            )}
          </div>

          {/* Карта + Мәліметтер (Оң жақ бағана) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Динамикалық Карта */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden h-[450px] relative border border-slate-100 shadow-[0_10px_40px_rgb(0,0,0,0.06)] group p-2 animate-in fade-in duration-700 delay-300">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-slate-100">
                <iframe
                  key={selectedId || "default"} // Key ауысқанда iframe жаңарады
                  src={
                    selectedPoint 
                      ? `https://www.openstreetmap.org/export/embed.html?bbox=${selectedPoint.lng-0.01}%2C${selectedPoint.lat-0.005}%2C${selectedPoint.lng+0.01}%2C${selectedPoint.lat+0.005}&layer=mapnik&marker=${selectedPoint.lat}%2C${selectedPoint.lng}`
                      : "https://www.openstreetmap.org/export/embed.html?bbox=65.48%2C44.83%2C65.55%2C44.88&layer=mapnik"
                  }
                  className="w-full h-full border-0 transition-opacity duration-1000 animate-in fade-in"
                  title="Қызылорда картасы"
                />
                
                {/* Карта үстіндегі батырма */}
                <div className="absolute bottom-5 right-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href={selectedPoint ? `https://www.openstreetmap.org/#map=17/${selectedPoint.lat}/${selectedPoint.lng}` : "https://www.openstreetmap.org/#map=14/44.853/65.509"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900/90 backdrop-blur-md text-sm font-bold text-white px-5 py-3 rounded-2xl shadow-xl hover:bg-emerald-600 transition-colors flex items-center gap-2"
                  >
                    Толық картада ашу ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Таңдалған нүкте мәліметі (Анимациямен шығады) */}
            {selectedPoint ? (
              <div 
                key={selectedPoint.id} 
                className="bg-white rounded-[2.5rem] border border-emerald-100 shadow-[0_20px_50px_rgb(16,185,129,0.1)] p-8 md:p-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    {selectedPoint.name}
                  </h2>
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl animate-bounce">
                    📍
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 text-slate-700">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-xl shadow-sm">🛣️</div>
                      <span className="font-bold">{selectedPoint.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xl shadow-sm">📞</div>
                      <a href={`tel:${selectedPoint.phone}`} className="font-bold hover:text-emerald-600 transition-colors">
                        {selectedPoint.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-xl shadow-sm">🕐</div>
                      <span className="font-bold">{selectedPoint.hours}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 shadow-inner">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Қабылдайды:</p>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedPoint.categories.map((cat) => (
                        <span
                          key={cat}
                          className={`text-xs px-3.5 py-2 rounded-xl font-black uppercase tracking-wider shadow-sm ${categoryColors[cat] ?? "bg-slate-200 text-slate-700"}`}
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
                  className="flex items-center justify-center w-full gap-3 bg-emerald-600 text-white text-base font-extrabold px-8 py-4 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 active:scale-95 transition-all duration-300"
                >
                  <span className="text-xl">🗺️</span> Маршрут құру (2GIS)
                </a>
              </div>
            ) : (
              /* Ештеңе таңдалмаған кездегі РАДАР (Pulse) анимациясы */
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-12 flex flex-col items-center justify-center text-center h-[350px]">
                <div className="relative flex justify-center items-center w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-emerald-200 shadow-md">
                    👆
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Нүктені таңдаңыз</h3>
                <p className="text-base font-medium text-slate-500 max-w-sm">
                  Толық мәлімет алу үшін және маршрут құру үшін сол жақтағы тізімнен бір нүктені таңдаңыз.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Төменгі Инфо-Блоктар */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { icon: "📦", title: "Жалпы саны", desc: `${points.length} қабылдау нүктесі`, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
            { icon: "🕐", title: "Жұмыс уақыты", desc: "Көпшілігі 08:00–19:00", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
            { icon: "📞", title: "Анықтама", desc: "+7 724 100-00-00", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          ].map((item, index) => (
            <div 
              key={item.title} 
              className="group bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex gap-5 items-center hover:-translate-y-1 animate-in slide-in-from-bottom-8 fade-in"
              style={{ animationDelay: `${index * 150 + 500}ms`, animationFillMode: 'both' }}
            >
              <div className={`w-16 h-16 rounded-[1.5rem] ${item.bg} ${item.color} border flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg tracking-tight">{item.title}</p>
                <p className="text-sm font-bold text-slate-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}