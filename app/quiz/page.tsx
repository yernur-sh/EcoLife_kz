"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; 
import { db } from "@/lib/firebase"; 
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import quizData from "./quiz.json";

export default function QuizPage() {
  const { firebaseUser, isAuthenticated } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const generateRandomQuestions = () => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
  };

  useEffect(() => {
    generateRandomQuestions();
  }, []);

  const handleAnswer = (option: string) => {
    if (selectedOption || !questions[currentStep]) return;
    setSelectedOption(option);
    if (option === questions[currentStep].answer) {
      setScore(score + 1);
    }
  };

  // Ұпайды сақтау функциясы
  const saveQuizResult = async (finalScore: number) => {
    if (!isAuthenticated || !firebaseUser) return;
    
    setIsSaving(true);
    const xpToAdd = finalScore * 20; // Әр сұраққа 20 XP

    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      
      // increment(xpToAdd) - Firestore-дағы бар ұпайға автоматты түрде қосады
      await setDoc(userRef, {
        points: increment(xpToAdd),
        lastQuizAt: new Date(),
      }, { merge: true });
      
      console.log(`${xpToAdd} XP сәтті қосылды!`);
    } catch (error) {
      console.error("Ұпай сақтау кезінде қате кетті:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const nextQuestion = () => {
    const next = currentStep + 1;
    if (next < questions.length) {
      setCurrentStep(next);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      saveQuizResult(score); // Викторина біткенде ұпайды сақтау
    }
  };

  const resetQuiz = () => {
    generateRandomQuestions();
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-emerald-500 z-10"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900 text-white pt-16 pb-28">
        {/* Декоративті фон элементтері */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-emerald-400 opacity-10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
            Эко-Викторина
          </h1>
          <p className="text-emerald-100/90 text-lg font-medium">
            <span className="inline-block border-b-2 border-emerald-400/60 pb-1">5 сұрақ — 5 мүмкіндік!</span>
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
        {!showResult ? (
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 md:p-12 border border-slate-100 transition-all duration-500">
            {/* Прогресс бар */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/50">
                Сұрақ {currentStep + 1} / 5
              </span>
              <div className="h-2.5 w-32 md:w-48 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                  style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Сұрақ мәтіні */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-8 leading-tight min-h-[64px]">
              {questions[currentStep].question}
            </h2>

            {/* Жауап нұсқалары */}
            <div className="grid grid-cols-1 gap-4">
              {questions[currentStep].options.map((option: string) => {
                // Динамикалық стильдер
                let buttonStyle = "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm";
                let iconStyle = "border-slate-200 text-transparent group-hover:border-emerald-400";
                
                if (selectedOption === option) {
                  if (option === questions[currentStep].answer) {
                    buttonStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-[0_4px_15px_rgb(16,185,129,0.15)] scale-[1.01]";
                    iconStyle = "bg-emerald-500 border-emerald-500 text-white";
                  } else {
                    buttonStyle = "border-rose-500 bg-rose-50 text-rose-800 shadow-[0_4px_15px_rgb(244,63,94,0.15)] scale-[1.01]";
                    iconStyle = "bg-rose-500 border-rose-500 text-white";
                  }
                } else if (selectedOption && option === questions[currentStep].answer) {
                  // Басқа қате жауап таңдалғанда дұрыс жауапты көрсету
                  buttonStyle = "border-emerald-400 bg-emerald-50/60 text-emerald-700 opacity-90";
                  iconStyle = "bg-emerald-400 border-emerald-400 text-white";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedOption}
                    className={`group w-full text-left p-5 rounded-2xl border-2 font-bold transition-all duration-300 flex justify-between items-center cursor-pointer ${
                      !selectedOption ? "active:scale-[0.99]" : ""
                    } ${buttonStyle}`}
                  >
                    <span className="flex-1 pr-4 text-base md:text-lg">{option}</span>
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${iconStyle}`}>
                        {selectedOption && (
                           <span className="text-[14px] font-black">
                             {option === questions[currentStep].answer ? "✓" : (selectedOption === option ? "✕" : "")}
                           </span>
                        )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Нәтиже мен Келесі батырмасы */}
            {selectedOption && (
              <div className="mt-8 pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-4 duration-500 fade-in">
                <div className="mb-8 p-6 bg-sky-50 rounded-2xl border border-sky-100 flex gap-4 items-start shadow-sm">
                    <div className="text-2xl mt-0.5">💡</div>
                    <div>
                      <span className="font-bold text-sky-800 uppercase text-xs tracking-wider block mb-1.5">Білгенге маржан:</span> 
                      <p className="text-sm md:text-base text-sky-900/80 leading-relaxed font-medium">
                        {questions[currentStep].info}
                      </p>
                    </div>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full bg-emerald-600 text-white font-extrabold text-lg py-4 md:py-5 rounded-2xl hover:bg-emerald-700 hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)] transition-all duration-300 active:scale-[0.98] shadow-lg shadow-emerald-600/20"
                >
                  {currentStep + 1 === 5 ? "НӘТИЖЕНІ КӨРУ" : "КЕЛЕСІ СҰРАҚ"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-10 md:p-14 text-center border border-slate-100 animate-in zoom-in-95 duration-500 fade-in">
            <div className="text-7xl md:text-8xl mb-8 drop-shadow-lg animate-bounce duration-[2000ms]">
              {score === 5 ? "🏆" : score >= 3 ? "🌱" : "📚"}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">Викторина аяқталды!</h2>
            <p className="text-slate-500 mb-10 font-medium text-lg">
                {score === 5 ? "Керемет! Сіз нағыз эко-сарапшысыз!" : "Жақсы нәтиже! Біліміңізді толықтыра түсіңіз."}
            </p>
            
            <div className="relative inline-block mb-12 group">
                <div className="bg-emerald-50 px-14 py-8 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="text-7xl font-black text-emerald-600">{score}</span>
                  <span className="text-3xl font-bold text-emerald-300 ml-2">/ 5</span>
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-to-tr from-amber-400 to-orange-500 text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white animate-pulse">
                    +{score * 20} XP
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button
                onClick={resetQuiz}
                className="bg-slate-50 text-slate-700 border border-slate-200 font-bold py-4 rounded-2xl hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95"
              >
                ТАҒЫ КӨРУ
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="bg-emerald-600 text-white font-extrabold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                БАСТЫ БЕТКЕ
              </button>
            </div>
            {isSaving && (
              <p className="mt-6 text-sm font-medium text-emerald-600 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Ұпайлар сақталуда...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}