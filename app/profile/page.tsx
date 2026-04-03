'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { firebaseUser, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  
  // Firestore деректерін сақтау үшін
  const [userData, setUserData] = useState({ points: 0, completedCount: 0 });
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Дерекқордан ұпайларды тарту
  useEffect(() => {
    async function fetchStats() {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              points: data.points || 0,
              completedCount: data.completedChallenges ? data.completedChallenges.length : 0
            });
          }
        } catch (error) {
          console.error("Деректерді алуда қате кетті", error);
        } finally {
          setDataLoading(false);
        }
      }
    }
    fetchStats();
  }, [firebaseUser]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Шығу кезінде қате кетті:", error);
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!firebaseUser) return null;

  // Тіркелген күнді пішімдеу (қарапайым нұсқа)
  const joinDate = firebaseUser.metadata.creationTime 
    ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString('kk-KZ', { month: 'long', year: 'numeric' })
    : 'Жақында';

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-green-500 to-green-700"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="p-1 bg-white rounded-full">
              {firebaseUser.photoURL ? (
                <img 
                  src={firebaseUser.photoURL} 
                  alt="Профиль" 
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-sm">👤</div>
              )}
            </div>
            
            <button onClick={handleLogout} className="px-6 py-2 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors border border-red-100">
              Жүйеден шығу
            </button>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{firebaseUser.displayName || "Қолданушы"}</h1>
            <p className="text-gray-500">{firebaseUser.email}</p>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* ШЫНАЙЫ СТАТИСТИКА */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Эко-ұпайлар</p>
              <p className="text-xl font-bold text-green-700">{userData.points} XP</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Орындалған челлендж</p>
              <p className="text-xl font-bold text-green-700">{userData.completedCount}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Тіркелген күні</p>
              <p className="text-xl font-bold text-gray-700 capitalize">{joinDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}