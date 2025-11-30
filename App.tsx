import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionData, SectionId, ViewState } from './types';
import Header from './components/common/Header';
import LandingSection from './components/landing/LandingSection';
import { trackEvent } from './lib/analytics';
import { ArrowLeft, CheckCircle, Cpu, FileText, Layers } from 'lucide-react';

const SECTIONS: SectionData[] = [
  {
    id: 'ai-tool',
    title: '무료 AI 디자인 툴',
    description: 'AI로 3초 만에 만드는 우리 팀 디자인. 복잡한 툴 없이 아이디어만으로 시작하세요.',
    ctaText: 'AI 디자인 시작하기',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 'quote',
    title: '빠른 견적/주문',
    description: '기다림 없이 바로 확인하는 예상 견적. 수량과 재질만 선택하면 즉시 가격을 알려드립니다.',
    ctaText: '빠른 견적 받기',
    gradient: 'from-emerald-400 to-cyan-500',
  },
  {
    id: 'lineup',
    title: '최상의 라인업',
    description: '10년 제작 노하우가 담긴 프리미엄 퀄리티. 실패 없는 단체복 제작을 약속합니다.',
    ctaText: '제품 라인업 보기',
    gradient: 'from-orange-400 to-pink-500',
  },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('main');

  const handleSectionClick = (id: SectionId) => {
    trackEvent('cta_click', { section: id });
    setActiveView(id);
  };

  const handleBack = () => {
    setActiveView('main');
  };

  return (
    <div className="bg-background min-h-screen text-white overflow-hidden relative font-sans selection:bg-accent selection:text-white">
      <Header />

      <AnimatePresence mode="wait">
        {activeView === 'main' ? (
          <motion.main
            key="main"
            className="h-screen w-full flex flex-col md:grid md:grid-cols-3 pt-20 md:pt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {SECTIONS.map((section, index) => (
              <LandingSection
                key={section.id}
                index={index}
                {...section}
                onClick={handleSectionClick}
              />
            ))}
          </motion.main>
        ) : (
          <DetailView 
            view={activeView as SectionId} 
            onBack={handleBack} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Detail View Component (Placeholder for actual features)
const DetailView: React.FC<{ view: SectionId; onBack: () => void }> = ({ view, onBack }) => {
  const section = SECTIONS.find((s) => s.id === view);

  if (!section) return null;

  const renderContent = () => {
    switch (view) {
      case 'ai-tool':
        return (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/20">
              <Cpu className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
              AI Design Studio
            </h1>
            <p className="text-xl text-secondary">
              텍스트를 입력하면 AI가 팀 로고와 티셔츠 디자인을 생성합니다. 지금 바로 시작해보세요.
            </p>
            <div className="w-full bg-slate-800/50 rounded-xl p-6 border border-white/10 backdrop-blur-md">
              <div className="flex gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="예: 강렬한 불꽃 무늬가 들어간 크로스핏 팀 로고" 
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  생성하기
                </button>
              </div>
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg text-secondary">
                생성된 디자인이 여기에 표시됩니다
              </div>
            </div>
          </div>
        );
      case 'quote':
        return (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 pb-2">
              Instant Quote
            </h1>
            <p className="text-xl text-secondary">
              복잡한 상담 없이 수량과 제품만 선택하세요. 
              <br />최적의 가격을 즉시 제안해 드립니다.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 text-left">
                <span className="text-sm text-secondary block mb-2">예상 수량</span>
                <div className="text-3xl font-bold">50장</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 text-left">
                <span className="text-sm text-secondary block mb-2">예상 견적</span>
                <div className="text-3xl font-bold text-emerald-400">450,000원~</div>
              </div>
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg transition-colors">
              상세 견적서 받기
            </button>
          </div>
        );
      case 'lineup':
        return (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-2xl shadow-orange-500/20">
              <Layers className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 pb-2">
              Premium Lineup
            </h1>
            <p className="text-xl text-secondary">
              기능성 운동복부터 데일리 코튼까지. 
              <br />직접 검증한 최고의 원단만 사용합니다.
            </p>
             <div className="w-full space-y-4 text-left">
              {[
                "쿨에버 기능성 원단 (운동용)",
                "20수 코마사 (데일리용)",
                "프리미엄 헤비웨이트 (스트릿용)"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg border border-white/5">
                  <CheckCircle className="text-orange-400 w-6 h-6" />
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
             <button className="w-full bg-white text-black hover:bg-gray-200 py-4 rounded-xl font-bold text-lg transition-colors mt-4">
              전체 카탈로그 보기
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-background flex flex-col pt-20 px-6 pb-6 overflow-y-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        <button 
          onClick={onBack}
          className="self-start flex items-center gap-2 text-secondary hover:text-white transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span>메인으로 돌아가기</span>
        </button>

        <div className="flex-1 flex flex-col justify-center">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
};

export default App;