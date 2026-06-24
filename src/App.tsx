import React, { useState, useEffect } from "react";
import { 
  Download, 
  RefreshCw, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Network, 
  Cpu, 
  Activity, 
  PieChart, 
  Award, 
  ChevronRight, 
  Terminal, 
  ExternalLink 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Slide {
  num: number;
  title: string;
  summary: string;
}

interface Presentation {
  id: number;
  file: string;
  title: string;
  topic: string;
  description: string;
  slidesCount: number;
  slides: Slide[];
  generated: boolean;
  size: string;
  generatedAt: string | null;
}

export default function App() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [genLog, setGenLog] = useState<string>("");
  const [showLog, setShowLog] = useState<boolean>(false);

  // Fetch presentations status on load
  const fetchPresentations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/presentations");
      const data = await res.json();
      if (data.success) {
        setPresentations(data.presentations);
      }
    } catch (e) {
      console.error("Error fetching presentations:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setGenLog("Запуск компилятора презентаций pptxgenjs...\n");
    setShowLog(true);
    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setGenLog((prev) => prev + data.output + "\n\n🎉 Все презентации успешно сгенерированы!");
        fetchPresentations();
      } else {
        setGenLog((prev) => prev + `❌ Ошибка генерации:\n${data.error}\n${data.details || ""}`);
      }
    } catch (e: any) {
      setGenLog((prev) => prev + `❌ Сетевая ошибка: ${e.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const getTopicIcon = (id: number) => {
    switch (id) {
      case 1: return <Network className="w-5 h-5 text-cyan-600" />;
      case 2: return <Award className="w-5 h-5 text-indigo-600" />;
      case 3: return <Cpu className="w-5 h-5 text-teal-600" />;
      case 4: return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 5: return <PieChart className="w-5 h-5 text-amber-600" />;
      case 6: return <Activity className="w-5 h-5 text-emerald-600" />;
      default: return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  const selectedPres = presentations.find((p) => p.id === selectedId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white py-8 px-6 shadow-md border-b border-indigo-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              Проект ТППО • ИМИТ ПетрГУ 2024/25
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-serif">
              Личный кабинет клиента «Неосистемы Северо-Запад»
            </h1>
            <p className="text-slate-300 max-w-3xl text-sm md:text-base font-normal">
              Архитектурный Хаб и Презентационный Центр. Скачивайте и компилируйте презентации по ключевым проектным модулям, спроектированным и верифицированным в рамках курса ТППО.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 self-start md:self-center">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
              {generating ? "Компиляция..." : "Перегенерировать PPTX"}
            </button>
            <a
              href="https://github.com/lenk6663/client-portal"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 text-slate-300"
            >
              <ExternalLink className="w-4 h-4" />
              Репозиторий
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Presentations List & Statuses */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h2 className="font-serif font-bold text-lg text-slate-900">
                Темы курсовых презентаций
              </h2>
              <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                Всего: 6
              </span>
            </div>

            <div className="space-y-3">
              {presentations.map((p) => {
                const isSelected = p.id === selectedId;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col gap-3 ${
                      isSelected 
                        ? "border-indigo-500 bg-indigo-50/30 ring-1 ring-indigo-500" 
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-white shadow-sm" : "bg-slate-100"}`}>
                          {getTopicIcon(p.id)}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase">
                            {p.topic}
                          </span>
                          <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                            {p.title}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        {p.generated ? (
                          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold bg-emerald-50 px-2 py-1 rounded">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Создан</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold bg-amber-50 px-2 py-1 rounded">
                            <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                            <span>Пусто</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2.5">
                      <span>Размер: {p.size}</span>
                      <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                        Подробнее <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compilation Logs Console */}
          {showLog && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-5 text-slate-300 font-mono text-xs overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-slate-400">Лог компиляции PPTX</span>
                </div>
                <button 
                  onClick={() => setShowLog(false)}
                  className="text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed text-slate-400 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {genLog}
              </pre>
            </motion.div>
          )}

          {/* Author Block */}
          <div className="bg-gradient-to-r from-slate-100 to-slate-200/50 rounded-xl border border-slate-300/40 p-5 text-xs text-slate-600 space-y-2.5">
            <h4 className="font-bold text-slate-900 font-serif">Авторство проекта ТППО:</h4>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
              <div><strong>Выполнила:</strong></div>
              <div>Ломазина А. А., гр. 22307</div>
              <div><strong>Руководитель:</strong></div>
              <div>Корзун Д. Ж., доцент</div>
              <div><strong>Кафедра:</strong></div>
              <div>ИМИТ ПетрГУ</div>
              <div><strong>Академ. год:</strong></div>
              <div>2024/2025</div>
            </div>
          </div>
        </div>

        {/* Right Side: Selected Presentation Details & Download Links */}
        <div className="lg:col-span-7">
          {selectedPres ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 flex flex-col h-full gap-5">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 border border-indigo-200/40 px-3 py-1 rounded-full">
                    {selectedPres.topic}
                  </span>
                  <h2 className="text-2xl font-bold font-serif text-slate-900 mt-2.5">
                    {selectedPres.title}
                  </h2>
                </div>
                <div className="text-right text-xs text-slate-400 font-medium">
                  Слайдов: <strong className="text-slate-800 font-bold">{selectedPres.slidesCount}</strong>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-indigo-500 pl-4 italic bg-slate-50/50 py-2 rounded-r-lg">
                {selectedPres.description}
              </p>

              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-indigo-500" />
                  Структура презентации и слайдов:
                </h3>

                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  {selectedPres.slides.map((s) => (
                    <div key={s.num} className="bg-slate-50/70 p-3 rounded-lg border border-slate-150 flex gap-3.5 items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {s.num}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                        <p className="text-xs text-slate-500 leading-normal">{s.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400 font-mono">Файл: {selectedPres.file}</span>
                {selectedPres.generated ? (
                  <a
                    href={`/api/download/${selectedPres.file}`}
                    className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-bold shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-indigo-700 transition transform hover:-translate-y-0.5 text-sm cursor-pointer"
                    download
                  >
                    <Download className="w-4.5 h-4.5" />
                    Скачать презентацию (.pptx)
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-slate-100 text-slate-400 font-bold text-sm cursor-not-allowed border border-slate-200"
                  >
                    <Download className="w-4.5 h-4.5" />
                    Сначала сгенерируйте файл
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
              <BookOpen className="w-12 h-12 text-slate-300 mb-4" />
              <span>Выберите тему презентации в списке, чтобы увидеть её подробную структуру и слайды</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
