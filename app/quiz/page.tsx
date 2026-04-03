"use client";

import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Пластик бөтелкенің табиғатта ыдырауына қанша уақыт кетеді?",
    options: ["50 жыл", "100 жыл", "450 жыл", "1000 жыл"],
    answer: "450 жыл",
    info: "Пластик өте ұзақ ыдырайды, сондықтан оны қайта өңдеуге тапсыру маңызды."
  },
  {
    id: 2,
    question: "Қай қалдық түрін шексіз рет қайта өңдеуге болады?",
    options: ["Қағаз", "Шыны", "Пластик", "Картон"],
    answer: "Шыны",
    info: "Шыны өзінің сапасын жоғалтпай, шексіз рет қайта өңделе береді."
  },
  {
    id: 3,
    question: "1 тонна макулатура (ескі қағаз) қанша ағашты сақтап қалады?",
    options: ["5 ағаш", "17 ағаш", "50 ағаш", "100 ағаш"],
    answer: "17 ағаш",
    info: "Қағазды қайта өңдеу орман алқаптарын сақтауға тікелей көмектеседі."
  },
  {
    id: 4,
    question: "Энергияны үнемдейтін шамдарды (лампочка) қайда тастау керек?",
    options: ["Кәдімгі қоқысқа", "Пластик контейнеріне", "Арнайы қауіпті қалдық жинау нүктесіне", "Өзенге"],
    answer: "Арнайы қауіпті қалдық жинау нүктесіне",
    info: "Мұндай шамдарда сынап болады, сондықтан олар ерекше кәдеге жаратуды қажет етеді."
  }
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (option: string) => {
    if (selectedOption) return; // Жауап беріліп қойса, ештеңе істемеу

    setSelectedOption(option);
    const correct = option === questions[currentStep].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    const next = currentStep + 1;
    if (next < questions.length) {
      setCurrentStep(next);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-[#107c41] text-white pt-16 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Эко-Викторина</h1>
          <p className="text-green-100 opacity-90">Өз біліміңізді тексеріп, табиғатты қорғауға үлес қосыңыз</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 -mt-12">
        {!showResult ? (
          <div className="bg-white rounded-[40px] shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Progress */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">
                Сұрақ {currentStep + 1} / {questions.length}
              </span>
              <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-500" 
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
              {questions[currentStep].question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentStep].options.map((option) => {
                let buttonStyle = "border-gray-100 bg-gray-50 text-gray-700 hover:border-green-200";
                
                if (selectedOption === option) {
                  buttonStyle = option === questions[currentStep].answer 
                    ? "border-green-500 bg-green-50 text-green-700" 
                    : "border-red-500 bg-red-50 text-red-700";
                } else if (selectedOption && option === questions[currentStep].answer) {
                  buttonStyle = "border-green-500 bg-green-50 text-green-700";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedOption}
                    className={`w-full text-left p-5 rounded-2xl border-2 font-semibold transition-all flex justify-between items-center ${buttonStyle}`}
                  >
                    {option}
                    {selectedOption === option && (
                      <span>{option === questions[currentStep].answer ? "✅" : "❌"}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Info Box */}
            {selectedOption && (
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in zoom-in duration-300">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <span className="font-bold">Білгенге маржан:</span> {questions[currentStep].info}
                </p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 w-full bg-[#107c41] text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                >
                  {currentStep + 1 === questions.length ? "Нәтижені көру" : "Келесі сұрақ"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Result Card */
          <div className="bg-white rounded-[40px] shadow-xl p-12 text-center border border-gray-100 animate-in zoom-in duration-500">
            <div className="text-6xl mb-6">
              {score === questions.length ? "🏆" : "🌱"}
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Викторина аяқталды!</h2>
            <p className="text-gray-500 mb-8">Сіздің нәтижеңіз:</p>
            
            <div className="inline-block bg-green-50 px-10 py-6 rounded-[30px] border border-green-100 mb-10">
              <span className="text-5xl font-black text-[#107c41]">{score}</span>
              <span className="text-2xl font-bold text-green-300"> / {questions.length}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={resetQuiz}
                className="bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all"
              >
                Қайта бастау
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="bg-[#107c41] text-white font-bold py-4 rounded-2xl hover:bg-green-800 transition-all shadow-lg shadow-green-100"
              >
                Басты бетке
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {!showResult && (
        <div className="max-w-3xl mx-auto px-6 mt-12 text-center">
          <p className="text-gray-400 text-sm font-medium">
            Викторинадан өткен сайын сіздің эко-рейтингіңіз өседі! 🚀
          </p>
        </div>
      )}
    </div>
  );
}