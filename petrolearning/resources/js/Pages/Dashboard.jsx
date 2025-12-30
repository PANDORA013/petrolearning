import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  BookOpen, Activity, Clock, Star, Users, Briefcase, 
  ArrowRight, Search, TrendingUp, Target, Zap, BrainCircuit, 
  Home, Menu, Bell, Settings, FileText, LayoutDashboard, Calendar, ChevronDown, CheckCircle
} from 'lucide-react';

// --- COMPONENTS ---
const GlassCard = ({ children, className = "", noHover = false }) => (
  <div className={`bg-white border border-slate-100 rounded-2xl shadow-sm ${!noHover && 'hover:shadow-md hover:border-slate-200 transition-all duration-300'} ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    brand: "bg-blue-50 text-blue-700 border-blue-100",
  };
  return <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${styles[type] || styles.default}`}>{children}</span>;
};

export default function Dashboard({ auth, aiData }) {
  const user = auth.user;
  const [appMode, setAppMode] = useState('user'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeModel, setActiveModel] = useState('XGBoost');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Data dari AI Service (dengan fallback)
  const careerPredictions = aiData?.career_predictions?.predictions || [];
  const courseRecommendations = aiData?.course_recommendations?.predictions || [];
  
  // Data Dummy untuk UI komponen lainnya
  const jobRoles = ['Staff Process', 'Supervisor Process', 'Staff Lab', 'Manager HR'];
  const competencies = [
      { name: 'Teknis', level: 2, target: 4 }, { name: 'K3', level: 3, target: 4 },
      { name: 'Manajemen', level: 1, target: 3 }, { name: 'Leadership', level: 2, target: 3 }
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Head title="Dashboard" />

      {/* SIDEBAR */}
      <aside className={`fixed lg:static top-0 left-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col shrink-0`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white shrink-0">P</div>
          {sidebarOpen && <span className="ml-3 font-bold text-lg tracking-tight">PETRO<span className="text-emerald-400">LEARN</span></span>}
        </div>

        <div className="flex-1 py-6 px-3 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Home size={20} />
            {sidebarOpen && <span className="ml-3 text-sm font-medium">Dashboard</span>}
          </button>
          <button onClick={() => setActiveTab('career')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'career' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Target size={20} />
            {sidebarOpen && <span className="ml-3 text-sm font-medium">Rencana Karir</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex justify-between items-center sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><Menu size={20}/></button>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {activeTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* HERO BANNER */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl p-8 md:p-12 min-h-[280px] flex flex-col justify-center">
                 <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-0"></div>
                 <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                       <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/30 uppercase">Status Karir</span>
                       <h1 className="text-4xl font-bold">Halo, {user.name}!</h1>
                       <p className="text-slate-400">Skor Gamifikasi Anda: <span className="text-white font-bold">{auth.user.score || 100} Poin</span></p>
                       <button onClick={() => setActiveTab('career')} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full font-bold flex items-center gap-2 transition-all">
                          <Zap size={18}/> Mulai Prediksi Karir
                       </button>
                    </div>
                    <div className="hidden md:block h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencies}>
                          <PolarGrid stroke="#334155" />
                          <PolarAngleAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} />
                          <Radar name="Current" dataKey="level" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                          <Radar name="Target" dataKey="target" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
              </div>

              {/* MODEL SWITCHER & CONTENT */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200">
                       <div className="px-4">
                          <span className="text-xs font-bold text-slate-400 uppercase block">Model AI</span>
                          <span className="font-bold text-slate-800 text-sm">
                             {activeModel === 'XGBoost' ? 'Prediksi (XGBoost)' : 'Rekomendasi (SVD)'}
                          </span>
                       </div>
                       <div className="flex bg-slate-100 rounded-xl p-1">
                          <button onClick={() => setActiveModel('XGBoost')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeModel==='XGBoost'?'bg-white shadow text-emerald-700':'text-slate-500'}`}>XGBoost</button>
                          <button onClick={() => setActiveModel('SVD')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeModel==='SVD'?'bg-white shadow text-blue-700':'text-slate-500'}`}>SVD</button>
                       </div>
                    </div>

                    {/* DYNAMIC CONTENT FROM LARAVEL/PYTHON */}
                    <div>
                       <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          {activeModel === 'XGBoost' ? <TrendingUp className="text-emerald-500"/> : <Star className="text-blue-500"/>}
                          {activeModel === 'XGBoost' ? 'Analisis Peluang Karir' : 'Rekomendasi Materi'}
                       </h3>
                       
                       {/* REAL DATA FROM AI SERVICE */}
                       <div className="space-y-4">
                          {activeModel === 'XGBoost' ? (
                             // Career Predictions (XGBoost)
                             careerPredictions.length > 0 ? (
                                careerPredictions.slice(0, 3).map((prediction, i) => (
                                   <GlassCard key={i} className="p-5 flex items-start gap-4">
                                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold bg-emerald-500">
                                         {Math.round(prediction.probability * 100)}%
                                      </div>
                                      <div className="flex-1">
                                         <h4 className="font-bold text-slate-800">
                                            Peluang Promosi: {prediction.target_role}
                                         </h4>
                                         <p className="text-sm text-slate-500 mt-1">
                                            Kompetensi Anda memenuhi {Math.round(prediction.probability * 100)}% persyaratan.
                                         </p>
                                         {prediction.gap_analysis && (
                                            <div className="mt-2 text-xs text-slate-400">
                                               <span className="font-medium">Gap: </span>
                                               {prediction.gap_analysis.current_status}
                                            </div>
                                         )}
                                      </div>
                                   </GlassCard>
                                ))
                             ) : (
                                <p className="text-slate-400 text-sm">Tidak ada prediksi tersedia.</p>
                             )
                          ) : (
                             // Course Recommendations (SVD)
                             courseRecommendations.length > 0 ? (
                                courseRecommendations.slice(0, 3).map((course, i) => (
                                   <GlassCard key={i} className="p-5 flex items-start gap-4">
                                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold bg-blue-500">
                                         {course.predicted_rating}
                                      </div>
                                      <div className="flex-1">
                                         <h4 className="font-bold text-slate-800">
                                            Kursus: {course.title}
                                         </h4>
                                         <p className="text-sm text-slate-500 mt-1">
                                            {course.reason}
                                         </p>
                                         <div className="mt-2">
                                            <Badge type="brand">{course.category}</Badge>
                                         </div>
                                      </div>
                                   </GlassCard>
                                ))
                             ) : (
                                <p className="text-slate-400 text-sm">Tidak ada rekomendasi tersedia.</p>
                             )
                          )}
                       </div>
                    </div>
                 </div>

                 {/* STATS */}
                 <div className="space-y-6">
                    <GlassCard className="p-6">
                       <h3 className="font-bold text-slate-800 mb-4">Statistik Belajar</h3>
                       <div className="flex justify-between items-end mb-2">
                          <span className="text-4xl font-bold text-slate-800">34<span className="text-lg text-slate-400 font-medium">h</span></span>
                          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">+12%</span>
                       </div>
                       <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-3/4"></div>
                       </div>
                       <p className="text-xs text-slate-400 mt-2">Target bulan ini: 40 jam</p>
                    </GlassCard>
                 </div>
              </div>
            </div>
          )}
          
          {activeTab === 'career' && (
             <div className="max-w-4xl mx-auto text-center py-20">
                <Target size={64} className="mx-auto text-slate-300 mb-4"/>
                <h2 className="text-2xl font-bold text-slate-700">Halaman Perencanaan Karir</h2>
                <p className="text-slate-500">Fitur simulasi akan muncul di sini setelah backend AI terhubung.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}