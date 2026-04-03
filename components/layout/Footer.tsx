// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">♻️</span>
              <span className="font-bold text-lg">EcoLife KZ</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Қызылорда қаласының экологиялық хал-жағдайын жақсартуға бағытталған платформа.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-green-100">Бөлімдер</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li><a href="/sort"       className="hover:text-white transition-colors">Қоқыс сұрыптау</a></li>
              <li><a href="/map"        className="hover:text-white transition-colors">Қабылдау нүктелері</a></li>
              <li><a href="/challenges" className="hover:text-white transition-colors">Эко-челлендж</a></li>
              <li><a href="/quiz"       className="hover:text-white transition-colors">Викторина</a></li>
              <li><a href="/diy"        className="hover:text-white transition-colors">Қоқыстан өнер</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-green-100">Байланыс</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li>📍 Қызылорда қаласы</li>
              <li>📧 info@ecolife.kz</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-green-700 mt-8 pt-6 text-center text-sm text-green-300">
          © 2026 EcoLife KZ. Барлық құқықтар қорғалған.
        </div>
      </div>
    </footer>
  );
}