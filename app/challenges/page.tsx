"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import allChallenges from "./challenges.json";
import { increment } from "firebase/firestore";

const LEVELS = [
  { name: "Эко-бастаушы", minXP: 0, icon: "🌱", color: "text-green-500" },
  { name: "Эко-белсенді", minXP: 300, icon: "🌿", color: "text-emerald-500" },
  { name: "Эко-қорғаушы", minXP: 800, icon: "🌳", color: "text-teal-600" },
  { name: "Эко-батыр", minXP: 1500, icon: "🦸‍♂️", color: "text-orange-500" },
  { name: "Табиғат елшісі", minXP: 3000, icon: "🌍", color: "text-blue-600" },
];

export default function ChallengesPage() {
  const { firebaseUser, isAuthenticated } = useAuth();
  const router = useRouter();

  const [localCompleted, setLocalCompleted] = useState<number[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [displayChallenges, setDisplayChallenges] = useState<any[]>([]);
  const [challengePhotos, setChallengePhotos] = useState<{ [key: number]: string }>({});
  
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); // ЖАҢА: ВИДЕО МОДАЛІ ҮШІН

  const refreshChallenges = () => {
    const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    setDisplayChallenges(selected);
    setLocalCompleted([]);
    setChallengePhotos({});
    localStorage.setItem("current_challenges", JSON.stringify(selected));
    localStorage.setItem("local_completed", JSON.stringify([]));
    localStorage.removeItem("challenge_photos");
  };

  useEffect(() => {
    const savedChallenges = localStorage.getItem("current_challenges");
    const savedCompleted = localStorage.getItem("local_completed");
    const savedPhotos = localStorage.getItem("challenge_photos");
    if (savedChallenges) setDisplayChallenges(JSON.parse(savedChallenges));
    else refreshChallenges();
    if (savedCompleted) setLocalCompleted(JSON.parse(savedCompleted));
    if (savedPhotos) setChallengePhotos(JSON.parse(savedPhotos));
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) setUserPoints(docSnap.data().points || 0);
        } catch (error) {
          console.error("Деректерді алу қатесі:", error);
        }
      }
    }
    fetchUserData();
  }, [firebaseUser]);

  const currentLevel = useMemo(() => {
    return [...LEVELS].reverse().find(lvl => userPoints >= lvl.minXP) || LEVELS[0];
  }, [userPoints]);

  const nextLevel = useMemo(() => LEVELS.find(lvl => lvl.minXP > userPoints), [userPoints]);
  const levelProgress = nextLevel ? ((userPoints - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100 : 100;

  const badges = useMemo(() => {
    const list = [];
    if (userPoints >= 100) list.push({ name: "Алғашқы қадам", icon: "🥇" });
    if (userPoints >= 500) list.push({ name: "Тәжірибелі", icon: "🌟" });
    if (userPoints >= 1500) list.push({ name: "Эко-маман", icon: "💎" });
    return list;
  }, [userPoints]);

  const handlePhotoUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newPhotos = { ...challengePhotos, [id]: base64String };
        setChallengePhotos(newPhotos);
        localStorage.setItem("challenge_photos", JSON.stringify(newPhotos));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleChallenge = async (id: number, points: number) => {
    if (!isAuthenticated) {
      alert("Жүйеге кіріңіз!");
      router.push('/login');
      return;
    }
    if (isSaving || !firebaseUser) return;
    setIsSaving(true);
    const isAlreadyDone = localCompleted.includes(id);
    const newPoints = isAlreadyDone ? Math.max(0, userPoints - points) : userPoints + points;
    const newLocalCompleted = isAlreadyDone ? localCompleted.filter(itemId => itemId !== id) : [...localCompleted, id];
    setLocalCompleted(newLocalCompleted);
    setUserPoints(newPoints);
    localStorage.setItem("local_completed", JSON.stringify(newLocalCompleted));
    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userRef, { 
        points: newPoints, 
        level: currentLevel.name, 
        completedCount: isAlreadyDone ? increment(-1) : increment(1),
        lastUpdated: new Date() 
      }, { merge: true });
    } catch (error) {
      console.error("Сақтау қатесі:", error);
      setUserPoints(userPoints);
      setLocalCompleted(localCompleted);
    } finally {
      setIsSaving(false);
    }
  };

  if (displayChallenges.length === 0) return null;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-800 text-white relative py-12 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="inline-block bg-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/30 shadow-sm">
                Белсенділік аймағы
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">
                Эко-челлендж: <br />
                <span className="text-emerald-300">Әлемді бірге өзгерт</span>
              </h1>
              <p className="text-emerald-50 text-lg md:text-xl mb-8 opacity-90 font-medium">
                Күнделікті шағын тапсырмаларды орындап, ұпай жина және жаңа деңгейлерге көтеріл.
              </p>
              {badges.length > 0 && (
                <div className="flex gap-3 mb-6">
                  {badges.map(badge => (
                    <div key={badge.name} className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-lg border border-white/30 animate-bounce">
                      {badge.icon}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 shadow-2xl animate-in zoom-in-95 duration-700 delay-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-emerald-200 text-xs font-black uppercase tracking-widest">Қазіргі деңгей</p>
                  <h2 className="text-3xl font-black flex items-center gap-2 text-white mt-1">
                    {currentLevel.icon} {currentLevel.name}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-white">{userPoints}</p>
                  <p className="text-emerald-200 text-xs uppercase font-black tracking-widest">Жалпы XP</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-white/80">
                  <span>{currentLevel.minXP} XP</span>
                  <span>{nextLevel ? `${nextLevel.minXP} XP` : 'MAX'}</span>
                </div>
                <div className="h-4 bg-white/20 rounded-full overflow-hidden p-1 shadow-inner">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-green-300 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${levelProgress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЖАҢА ВЕРТИКАЛДЫ ВИДЕО СЕКЦИЯСЫ */}
      <section className="max-w-7xl mx-auto px-6 pt-12 -mb-4 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row gap-8 items-center animate-in slide-in-from-bottom-10 fade-in duration-700">
          
          {/* Текст бөлігі */}
          <div className="w-full md:w-3/5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 text-xl mb-4 border border-emerald-100 shadow-sm">
              🎬
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase leading-tight">
              Біздің <br className="hidden md:block" /><span className="text-emerald-600">нақты істеріміз</span>
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-6 text-base md:text-lg max-w-xl">
              Сөзден — іске! Біздің оқушылар қаламызды тазартуға қалай үлес қосып жатқанын осы қысқа видеодан көріңіз. Олар бастады, ендігі кезек — сізде! 
            </p>
          </div>

          {/* Вертикалды видео ПРЕВЬЮ (Кішірейтілген: max-w-[240px]) */}
          <div className="w-full md:w-2/5 flex justify-center">
            <div 
              className="relative w-full max-w-[240px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] border-[5px] border-slate-50 bg-slate-900 group cursor-pointer"
              onClick={() => setIsVideoModalOpen(true)} // БАСҚАНДА ҮЛКЕН ВИДЕО АШЫЛАДЫ
            >
              <video
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/cleanup-video.mp4" type="video/mp4" />
              </video>
              
              {/* Ойнату батырмасы (Overlay) */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white translate-x-1">▶</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Тапсырмалар секциясы */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
            <span className="bg-emerald-100 p-2.5 rounded-2xl text-2xl border border-emerald-200">🎯</span> 
            Жаңа тапсырмалар
          </h2>
          <button
            onClick={refreshChallenges}
            className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-6 py-3.5 rounded-2xl transition-all duration-300 font-bold border border-slate-200 active:scale-95 shadow-sm"
          >
            <span className="text-lg">🔄</span> Жаңарту
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayChallenges.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`group bg-white rounded-[2.5rem] border-2 transition-all duration-300 p-8 relative overflow-hidden flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] ${localCompleted.includes(item.id)
                  ? "border-emerald-400 bg-emerald-50/50"
                  : "border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1.5"
                }`}
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed h-12 overflow-hidden flex-grow font-medium">{item.desc}</p>

              <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto">
                <div className="bg-emerald-100 text-emerald-700 px-3.5 py-1.5 rounded-xl text-sm font-black flex-shrink-0 tracking-wide border border-emerald-200">
                  +{item.points} XP
                </div>
                
                <div className="flex items-center gap-2">
                  {!localCompleted.includes(item.id) && (
                    <label className={`cursor-pointer w-11 h-11 flex items-center justify-center rounded-xl transition-all border-2 flex-shrink-0 ${challengePhotos[item.id] ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-200"}`} title={challengePhotos[item.id] ? "Фотоны өзгерту" : "Фото тіркеу (міндетті емес)"}>
                      <span className="text-lg">{challengePhotos[item.id] ? "🔄" : "📷"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(item.id, e)} />
                    </label>
                  )}
                  
                  {challengePhotos[item.id] && (
                    <div 
                      onClick={() => setSelectedPhoto(challengePhotos[item.id])}
                      className="w-11 h-11 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm flex-shrink-0 cursor-pointer hover:scale-110 transition-transform relative group/img"
                      title="Толық көру"
                    >
                      <img src={challengePhotos[item.id]} className="w-full h-full object-cover" alt="Proof" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                         <span className="text-white text-xs">👁️</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => toggleChallenge(item.id, item.points)}
                    disabled={isSaving}
                    className={`group px-6 py-2.5 rounded-xl text-sm font-bold transition-all min-w-[120px] shadow-sm ${
                      localCompleted.includes(item.id)
                        ? "bg-emerald-600 text-white shadow-emerald-600/30 shadow-lg hover:bg-rose-500 hover:shadow-rose-500/30"
                        : "bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/30"
                    }`}
                  >
                    {localCompleted.includes(item.id) ? (
                      <>
                        <span className="block group-hover:hidden">Орындалды ✓</span>
                        <span className="hidden group-hover:block">Болдырмау ✖</span>
                      </>
                    ) : "Орындау"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ақпараттық блок */}
      <section className="max-w-7xl mx-auto px-6 pb-24 font-sans">
        <div className="bg-slate-900 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
          <div className="w-24 h-24 bg-white/10 rounded-[2rem] border border-white/20 shadow-inner flex items-center justify-center text-5xl flex-shrink-0 z-10">
             💡
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">Бұл қалай жұмыс істейді?</h3>
            <p className="text-slate-300 leading-relaxed max-w-2xl font-medium text-lg">
              Әрбір орындалған тапсырма сізге <b className="text-emerald-400">XP (тәжірибе ұпайларын)</b> береді.
              Ұпай жинаған сайын жаңа атақтар аласыз.
              <b className="text-white"> Эко-батыр</b> атану үшін күнделікті кішігірім қадамдар жасау жеткілікті!
            </p>
          </div>
        </div>
      </section>

      {/* ТОЛЫҚ ЭКРАНДЫ СУРЕТ МОДАЛІ */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <img src={selectedPhoto} alt="Толық көрініс" className="max-w-full max-h-[90vh] rounded-[2rem] object-contain shadow-2xl border border-white/10" />
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center text-xl font-bold shadow-xl hover:scale-110 hover:bg-slate-100 transition-transform"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ЖАҢА: ТОЛЫҚ ЭКРАНДЫ ВИДЕО МОДАЛІ (Дәл осы код видеоны вертикалды ұстайды) */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setIsVideoModalOpen(false)}
        >
          {/* Вертикалды пропорцияны күштеп сақтайтын контейнер */}
          <div 
            className="relative h-full max-h-[90vh] aspect-[9/16] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-800 bg-black animate-in zoom-in-95 duration-300" 
            onClick={e => e.stopPropagation()}
          >
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            >
              <source src="/cleanup-video.mp4" type="video/mp4" />
            </video>
            
            {/* Жабу батырмасы */}
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xl font-bold backdrop-blur-md transition-colors z-10 border border-white/20"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}