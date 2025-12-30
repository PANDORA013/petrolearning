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
  Home, Menu, Bell, Settings, FileText, LayoutDashboard, Calendar, ChevronDown, CheckCircle,
  LogOut, GraduationCap, Layers, Database, Sparkles, AlertCircle
} from 'lucide-react';

// --- KOMPONEN UI REUSABLE ---

const GlassCard = ({ children, className = "", noHover = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden ${!noHover && 'hover:shadow-lg hover:border-emerald-100 cursor-pointer transition-all duration-300'} ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, type = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    brand: "bg-blue-50 text-blue-700 border-blue-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border tracking-wide uppercase ${styles[type] || styles.default}`}>{children}</span>;
};

// --- DATA MOCK untuk Model Stats Chart ---
const MODEL_STATS = [
  { name: 'Jan', acc: 78 }, { name: 'Feb', acc: 80 }, { name: 'Mar', acc: 82 },
  { name: 'Apr', acc: 81 }, { name: 'May', acc: 83 }, { name: 'Jun', acc: 85 },
];

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard({ auth, aiData, serverData }) {
  const user = auth.user;
  
  // Data dari Backend (dengan fallback ke mock data jika tidak ada)
  const EMPLOYEES = serverData?.employees || [
    { id: 1, name: 'Budi Santoso', position: 'Staff Process', unit: 'Produksi I', gap: 2, readiness: 45 },
    { id: 2, name: 'Siti Aminah', position: 'Analyst Lab', unit: 'Quality Control', gap: 0, readiness: 92 },
  ];
  
  const COURSES = serverData?.courses || [
    { id: 101, title: 'Sertifikasi K3 Tingkat Lanjut', category: 'Safety', level: 'Advanced', progress: 0, modules: 12, rating: 4.8, type: 'GAP', xgboost_score: 95, svd_score: 70 },
    { id: 102, title: 'Manajemen Proyek Supervisor', category: 'Manajemen', level: 'Intermediate', progress: 0, modules: 8, rating: 4.5, type: 'GAP', xgboost_score: 92, svd_score: 65 },
  ];
  
  const COMPETENCIES = [
    { name: 'Teknis', level: 2, target: 4, fullMark: 5 }, 
    { name: 'K3', level: 3, target: 4, fullMark: 5 }, 
    { name: 'Manajemen', level: 1, target: 3, fullMark: 5 }, 
    { name: 'Leadership', level: 2, target: 3, fullMark: 5 },
    { name: 'Digital', level: 3, target: 3, fullMark: 5 }
  ];
  
  // Data dari AI Service
  const careerPredictions = aiData?.career_predictions?.predictions || [];
  const courseRecommendations = aiData?.course_recommendations?.predictions || [];
  
  const [appMode, setAppMode] = useState('user'); // Toggle: 'admin' atau 'user'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // State Logika AI
  const [activeModel, setActiveModel] = useState('XGBoost'); // 'XGBoost' (Prediksi) atau 'SVD' (Rekomendasi)
  
  // State Simulasi Karir
  const [careerTarget, setCareerTarget] = useState('');
  
  // Filter Data
  const inProgress = COURSES.filter(c => c.progress > 0);
  
  // Logic Rekomendasi vs Prediksi
  // XGBoost fokus pada kursus yang menutup GAP (sort by xgboost_score)
  // SVD fokus pada kursus populer/rating tinggi (sort by svd_score)
  const recommendations = activeModel === 'XGBoost' 
    ? COURSES.filter(c => c.progress === 0)
        .sort((a, b) => (b.xgboost_score || 0) - (a.xgboost_score || 0))
        .slice(0, 5) // Top 5 dari XGBoost
    : COURSES.filter(c => c.progress === 0)
        .sort((a, b) => (b.svd_score || 0) - (a.svd_score || 0))
        .slice(0, 5); // Top 5 dari SVD

  // --- SUB-VIEWS ---

  // 1. TOP BAR (HEADER)
  const TopBar = () => (
    <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 flex justify-between items-center sticky top-0 z-40 transition-all shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors">
          <Menu size={20} />
        </button>
        <div className="hidden md:flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Halaman Aktif</span>
          <span className="font-bold text-slate-800 text-lg capitalize tracking-tight">{activeTab === 'career' ? 'Perencanaan Karir' : activeTab}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-slate-50 rounded-full px-4 py-2.5 w-64 border border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
           <Search size={16} className="text-slate-400 mr-2"/>
           <input type="text" placeholder="Cari data..." className="bg-transparent border-none text-sm w-full outline-none text-slate-700 placeholder-slate-400" />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
             <Bell size={20} />
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          
          <div className="flex items-center gap-3 cursor-pointer group">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{user.name}</p>
                <p className="text-xs text-slate-500 font-medium">{appMode === 'user' ? 'Pegawai' : 'Administrator'}</p>
             </div>
             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-transform group-hover:scale-105 ${appMode === 'user' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-slate-700 to-slate-900'}`}>
                {user.name.charAt(0)}
             </div>
          </div>
        </div>
      </div>
    </header>
  );

  // 2. USER DASHBOARD VIEW
  const UserDashboard = () => (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Hero Section: Status Karir */}
      <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 text-white shadow-2xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center group">
         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -mr-20 -mt-20 z-0 group-hover:bg-emerald-500/30 transition-all duration-1000"></div>
         
         <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <div>
                  <div className="flex items-center gap-2 mb-3">
                     <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-emerald-300 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest flex items-center gap-2">
                       <Sparkles size={12} fill="currentColor"/> AI Career Assistant
                     </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
                     {careerTarget ? `Target: ${careerTarget}` : 'Tentukan Target Karirmu'}
                  </h1>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                     {careerTarget 
                       ? 'Algoritma XGBoost sedang menganalisis kesenjangan (GAP) kompetensi Anda untuk mencapai target ini.'
                       : 'Aktifkan fitur Prediksi Karir untuk melihat peluang promosi dan rekomendasi pelatihan spesifik.'}
                  </p>
               </div>
               
               {!careerTarget ? (
                  <button onClick={() => setActiveTab('career')} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] flex items-center gap-3 transform hover:-translate-y-1">
                     <Target size={20}/> Mulai Rencana Karir
                  </button>
               ) : (
                  <div className="flex gap-4">
                     <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">GAP Kompetensi</p>
                        <p className="text-2xl font-bold text-white">3 Skill</p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">Peluang Sukses</p>
                        <p className="text-2xl font-bold text-emerald-400">45%</p>
                     </div>
                  </div>
               )}
            </div>

            {/* Radar Chart (Visualisasi GAP) */}
            {careerTarget && (
               <div className="hidden md:flex justify-end h-72 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={COMPETENCIES}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} />
                      <Radar name="Saat Ini" dataKey="level" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.4} />
                      <Radar name="Target" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" fill="#f59e0b" fillOpacity={0.1} />
                      <Tooltip 
                        contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff'}}
                        itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
               </div>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Kolom Kiri: AI & Learning */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* AI SWITCHER & EXPLANATION */}
            {currentUser && (
               <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex bg-slate-100 p-1 rounded-xl relative">
                     <button 
                        onClick={() => setActiveModel('XGBoost')} 
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeModel==='XGBoost'?'bg-white shadow text-emerald-700':'text-slate-500 hover:text-slate-700'}`}
                     >
                        <Zap size={16} className={activeModel==='XGBoost' ? "fill-emerald-500 text-emerald-500" : ""}/> 
                        Mode Prediksi (XGBoost)
                     </button>
                     <button 
                        onClick={() => setActiveModel('SVD')} 
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeModel==='SVD'?'bg-white shadow text-blue-700':'text-slate-500 hover:text-slate-700'}`}
                     >
                        <Star size={16} className={activeModel==='SVD' ? "fill-blue-500 text-blue-500" : ""}/> 
                        Mode Rekomendasi (SVD)
                     </button>
                  </div>
                  <div className="px-4 py-3 text-xs text-slate-500 text-center">
                     {activeModel === 'XGBoost' 
                        ? "Menggunakan XGBoost untuk memprediksi kelayakan promosi berdasarkan pemenuhan GAP kompetensi (Hard Skill)." 
                        : "Menggunakan Matrix Factorization (SVD) untuk merekomendasikan materi populer berdasarkan minat (Soft Skill)."
                     }
                  </div>
               </div>
            )}

            {/* Rekomendasi Course */}
            <section>
               <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  {activeModel === 'XGBoost' ? <BrainCircuit className="text-emerald-600"/> : <Database className="text-blue-600"/>}
                  {activeModel === 'XGBoost' ? 'Materi Wajib (Menutup GAP)' : 'Materi Populer (Minat)'}
               </h3>
               <div className="space-y-4">
                  {recommendations.slice(0, 3).map((c, idx) => (
                     <GlassCard key={c.id} className="p-0 flex flex-col md:flex-row group border-slate-200">
                        <div className={`w-2 md:w-1.5 ${activeModel==='XGBoost' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                        <div className="p-5 flex-1">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <div className="flex gap-2 mb-1">
                                    <Badge>{c.category}</Badge>
                                    {activeModel==='XGBoost' && idx===0 && <Badge type="success">Prioritas Tinggi</Badge>}
                                 </div>
                                 <h4 className="font-bold text-lg text-slate-800 group-hover:text-emerald-700 transition-colors">{c.title}</h4>
                                 <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 font-medium">
                                    <span className="flex items-center gap-1"><Layers size={14}/> {c.level}</span>
                                    <span className="flex items-center gap-1"><Clock size={14}/> 12 Jam</span>
                                    <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400"/> {c.rating}</span>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className={`text-2xl font-bold ${activeModel==='XGBoost'?'text-emerald-600':'text-blue-600'}`}>
                                    {activeModel==='XGBoost' ? '95%' : '88%'}
                                 </div>
                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Match</div>
                              </div>
                           </div>
                        </div>
                        <div className="p-4 flex items-center border-t md:border-t-0 md:border-l border-slate-100 bg-slate-50/50 group-hover:bg-emerald-50/30 transition-colors">
                           <button className="w-full md:w-auto px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                              Mulai
                           </button>
                        </div>
                     </GlassCard>
                  ))}
               </div>
            </section>
         </div>

         {/* Kolom Kanan: Stats Sidebar */}
         <div className="space-y-8">
            <GlassCard className="p-6 bg-gradient-to-br from-white to-slate-50">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Activity size={18}/> Statistik Belajar</h3>
               
               <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-slate-900">34</span>
                  <span className="text-lg font-bold text-slate-400">/ 40 Jam</span>
               </div>
               
               <div className="w-full bg-slate-200 rounded-full h-3 mb-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full w-[85%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
               </div>
               <p className="text-xs text-slate-500 mb-6 font-medium">Target bulan ini hampir tercapai!</p>

               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                     <div className="text-xl font-bold text-blue-600">12</div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase">Sertifikat</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                     <div className="text-xl font-bold text-amber-500">4.8</div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Score</div>
                  </div>
               </div>
            </GlassCard>
            
            {/* Gamification Card */}
            <GlassCard className="p-6 border-amber-200 bg-amber-50/30">
               <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2"><Award size={18}/> Skor Keaktifan</h3>
               <p className="text-sm text-amber-700 mb-4">Pertahankan skormu agar fitur Simulasi Karir tidak terkunci.</p>
               <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-amber-600">{auth.user.score || 100}</span>
                  <Badge type="warning">Gold Tier</Badge>
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );

  // 3. ADMIN DASHBOARD VIEW
  const AdminDashboard = () => (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
       <div className="flex justify-between items-end">
          <div>
             <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Ringkasan Eksekutif</h2>
             <p className="text-slate-500 mt-1">Laporan kinerja pembelajaran & efektivitas model AI secara real-time.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                <Calendar size={16}/> Bulan Ini <ChevronDown size={14}/>
             </button>
             <button className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                <FileText size={16}/> Export Laporan
             </button>
          </div>
       </div>

       {/* Bento Grid Stats */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-6 bg-slate-900 text-white border-none shadow-xl shadow-slate-900/10 col-span-1 lg:col-span-2 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-700"></div>
             <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                   <div>
                      <p className="text-slate-400 text-sm font-bold mb-1 uppercase tracking-wider">Akurasi Model Prediksi</p>
                      <h3 className="text-4xl font-bold text-white">82.4%</h3>
                   </div>
                   <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
                      <Activity size={24}/>
                   </div>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-2 overflow-hidden">
                   <div className="bg-emerald-500 h-full w-[82%] shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>
                </div>
                <p className="text-xs text-slate-400">+5.2% peningkatan akurasi XGBoost bulan ini.</p>
             </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-blue-500">
             <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-4 w-fit"><Users size={24}/></div>
                <Badge type="brand">+12%</Badge>
             </div>
             <div>
                <h3 className="text-3xl font-bold text-slate-800">1,240</h3>
                <p className="text-sm font-bold text-slate-400 uppercase mt-1">Total Pegawai</p>
             </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-amber-500">
             <div className="flex justify-between items-start">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl mb-4 w-fit"><TrendingUp size={24}/></div>
                <Badge type="warning">128</Badge>
             </div>
             <div>
                <h3 className="text-3xl font-bold text-slate-800">High Pot.</h3>
                <p className="text-sm font-bold text-slate-400 uppercase mt-1">Talent Pool</p>
             </div>
          </GlassCard>
       </div>

       {/* Analytics Row */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard className="p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Tren Kinerja Model (Akurasi)</h3>
                <Badge>Real-time</Badge>
             </div>
             <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={MODEL_STATS}>
                      <defs>
                         <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10}/>
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}}/>
                      <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}/>
                      <Area type="monotone" dataKey="acc" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </GlassCard>

          {/* Table Pegawai */}
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Daftar Pegawai (High Priority)</h3>
                <button className="text-sm font-bold text-emerald-600 hover:underline">Lihat Semua</button>
             </div>
             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                      <tr>
                         <th className="px-6 py-4">Nama</th>
                         <th className="px-6 py-4">Jabatan</th>
                         <th className="px-6 py-4 text-center">GAP</th>
                         <th className="px-6 py-4 text-center">Kesiapan</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {EMPLOYEES.map((emp) => (
                         <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-800">{emp.name}</td>
                            <td className="px-6 py-4 text-slate-600">{emp.position}</td>
                            <td className="px-6 py-4 text-center">
                               {emp.gap > 0 
                                 ? <Badge type="danger">{emp.gap} Skill</Badge>
                                 : <Badge type="success">Clear</Badge>
                               }
                            </td>
                            <td className="px-6 py-4 text-center">
                               <div className="w-20 h-1.5 bg-slate-100 rounded-full mx-auto mb-1">
                                  <div className={`h-full rounded-full ${emp.readiness > 75 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: `${emp.readiness}%`}}></div>
                               </div>
                               <span className="text-xs font-bold text-slate-600">{emp.readiness}%</span>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  );

  // 4. HALAMAN PERENCANAAN KARIR
  const CareerPlanner = () => (
    <div className="p-8 max-w-3xl mx-auto animate-fade-in">
       <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-sm border border-emerald-100">
             <TrendingUp size={32}/>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Simulasi Karir Masa Depan</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Pilih posisi targetmu. AI kami akan menghitung peluang keberhasilan dan menyusun kurikulum penutup GAP.</p>
       </div>

       <GlassCard className="p-8 md:p-10 border-t-4 border-t-emerald-500">
          <div className="space-y-6">
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Posisi Saat Ini</label>
                   <div className="font-bold text-lg text-slate-700 flex items-center gap-2">
                      <Briefcase size={20} className="text-slate-400"/> Staff Process
                   </div>
                </div>
                <div className="text-xs font-bold bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-500">Level 2</div>
             </div>

             <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-white p-2 rounded-full border border-slate-200 text-slate-400 shadow-sm">
                   <ArrowRight className="rotate-90 md:rotate-0" />
                </div>
             </div>

             <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500">
                <label className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">Pilih Target Promosi</label>
                <div className="relative">
                   <Target className="absolute left-0 top-1 text-emerald-600" size={24}/>
                   <select 
                     className="w-full bg-transparent border-none text-2xl font-bold text-emerald-900 placeholder-emerald-300 outline-none pl-8 cursor-pointer appearance-none"
                     onChange={(e) => setCareerTarget(e.target.value)}
                     defaultValue=""
                   >
                      <option value="" disabled>Pilih Jabatan...</option>
                      <option value="Supervisor Process">Supervisor Process</option>
                      <option value="Manager Production">Manager Production</option>
                      <option value="Head of Engineering">Head of Engineering</option>
                   </select>
                   <ChevronDown className="absolute right-0 top-2 text-emerald-600 pointer-events-none" size={20}/>
                </div>
             </div>

             <button 
               onClick={() => setActiveTab('dashboard')} 
               disabled={!careerTarget}
               className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all flex items-center justify-center gap-3 mt-4"
             >
                <Zap size={24} className={careerTarget ? "text-emerald-400" : "text-slate-400"}/>
                Jalankan Prediksi AI
             </button>
          </div>
       </GlassCard>
    </div>
  );

  // --- RENDER UTAMA & LAYOUT ---

  const sidebarItems = appMode === 'user' ? [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'career', label: 'Rencana Karir', icon: Target },
    { id: 'catalog', label: 'Katalog', icon: BookOpen },
    { id: 'profile', label: 'Profil Saya', icon: User },
  ] : [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Model Analytics', icon: Activity },
    { id: 'users', label: 'Data Pegawai', icon: Users },
    { id: 'settings', label: 'Konfigurasi', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Head title="Dashboard" />

      {/* SIDEBAR */}
      <aside className={`fixed lg:static top-0 left-0 z-50 h-screen bg-slate-900 text-white transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-72' : 'w-20'} flex flex-col shrink-0 shadow-2xl`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-800/50">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-emerald-500/20">P</div>
          <div className={`ml-3 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
             <h1 className="font-bold text-xl tracking-tight">PETRO<span className="text-emerald-400">LEARN</span></h1>
             <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">LMS & Career AI</p>
          </div>
        </div>

        <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          <div className={`mb-6 px-2 transition-all ${!sidebarOpen && 'opacity-0'}`}>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{appMode === 'user' ? 'Menu Karyawan' : 'Admin Area'}</p>
          </div>
          
          {sidebarItems.map((item) => (
             <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3.5 rounded-xl transition-all duration-200 group relative ${activeTab === item.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'} ${!sidebarOpen && 'justify-center'}`}
             >
                <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} className={activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}/>
                {sidebarOpen && <span className="ml-3 text-sm font-medium tracking-wide">{item.label}</span>}
                {!sidebarOpen && (
                   <div className="absolute left-14 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                      {item.label}
                   </div>
                )}
             </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800/50 bg-slate-900">
          <button 
            onClick={() => {
               setAppMode(m => m === 'user' ? 'admin' : 'user');
               setActiveTab('dashboard');
            }}
            className={`w-full flex items-center p-3.5 rounded-xl transition-all duration-300 group hover:bg-slate-800 border border-transparent hover:border-slate-700 ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-white transition-colors" />
            {sidebarOpen && (
              <div className="ml-3 text-left">
                <p className="text-sm font-bold text-slate-300 group-hover:text-white">Ganti Mode</p>
                <p className="text-[10px] text-slate-500 group-hover:text-slate-400">Ke {appMode === 'user' ? 'Admin' : 'User'}</p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
         <TopBar />
         
         <main className="flex-1 overflow-y-auto p-0 scroll-smooth bg-slate-50">
            {appMode === 'user' ? (
               <>
                  {activeTab === 'dashboard' && <UserDashboard />}
                  {activeTab === 'career' && <CareerPlanner />}
                  {activeTab === 'catalog' && <div className="flex h-full items-center justify-center text-slate-400">Halaman Katalog Kursus</div>}
                  {activeTab === 'profile' && <div className="flex h-full items-center justify-center text-slate-400">Halaman Profil</div>}
               </>
            ) : (
               <>
                  {(activeTab === 'dashboard' || activeTab === 'analytics') && <AdminDashboard />}
                  {activeTab === 'users' && <div className="flex h-full items-center justify-center text-slate-400">Halaman Data Pegawai</div>}
                  {activeTab === 'settings' && <div className="flex h-full items-center justify-center text-slate-400">Halaman Konfigurasi</div>}
               </>
            )}
         </main>
      </div>
    </div>
  );
}