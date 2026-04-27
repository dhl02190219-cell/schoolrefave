import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Map as MapIcon } from 'lucide-react';

type Character = {
  id: number;
  name: string;
  role: string;
  traits: string;
  genderId: string;
  imageUrl: string;
  modalImageUrl: string;
};

const characters: Character[] = [
  { id: 1, name: '강효린', role: '실업팀 육상 선수', traits: '실용주의 · 신체능력 · 조용한 조력', genderId: '여자 1번', imageUrl: 'https://w9r.uk/Z01.webp', modalImageUrl: 'https://w9r.uk/X01.webp' },
  { id: 2, name: '고승호', role: '말단 조직원', traits: '과거 일진 · 기회주의 · 허세', genderId: '남자 1번', imageUrl: 'https://w9r.uk/Z02.webp', modalImageUrl: 'https://w9r.uk/X02.webp' },
  { id: 3, name: '김수빈', role: '심리학과 대학생', traits: '왕따 피해자 · 피해의식 · 트라우마', genderId: '여자 2번', imageUrl: 'https://w9r.uk/Z03.webp', modalImageUrl: 'https://w9r.uk/X03.webp' },
  { id: 4, name: '노예찬', role: '의예과 대학생', traits: '완벽주의 · 통제욕 · 선민의식', genderId: '남자 2번', imageUrl: 'https://w9r.uk/Z04.webp', modalImageUrl: 'https://w9r.uk/X04.webp' },
  { id: 5, name: '류현승', role: '연기과 대학생', traits: '처세술 · 호감작 · 실리주의', genderId: '남자 3번', imageUrl: 'https://w9r.uk/Z05.webp', modalImageUrl: 'https://w9r.uk/X05.webp' },
  { id: 6, name: '문고은', role: '경영학과 대학생', traits: '약육강식 · 서열주의 · 지배욕', genderId: '여자 3번', imageUrl: 'https://w9r.uk/Z06.webp', modalImageUrl: 'https://w9r.uk/X06.webp' },
  { id: 7, name: '박소희', role: '물리학과 대학생', traits: '정보수집 · 관찰자 · 시스템 분석', genderId: '여자 4번', imageUrl: 'https://w9r.uk/Z07.webp', modalImageUrl: 'https://w9r.uk/X07.webp' },
  { id: 8, name: '백지우', role: 'SNS 인플루언서', traits: '미인 이미지 집착 · 허영심 · 이기적 생존', genderId: '여자 5번', imageUrl: 'https://w9r.uk/Z08.webp', modalImageUrl: 'https://w9r.uk/X08.webp' },
  { id: 9, name: '성혜인', role: '의예과 대학생', traits: '성과주의 · 열등감 · 완벽주의', genderId: '여자 6번', imageUrl: 'https://w9r.uk/Z09.webp', modalImageUrl: 'https://w9r.uk/X09.webp' },
  { id: 10, name: '손서율', role: '무직 백수', traits: '과거 일진 · 가학성 · 쾌락주의', genderId: '여자 7번', imageUrl: 'https://w9r.uk/Z10.webp', modalImageUrl: 'https://w9r.uk/X10.webp' },
  { id: 11, name: '손온유', role: '국문과 대학생', traits: '보호본능 유발 · 자아 의탁 · 의존', genderId: '남자 4번', imageUrl: 'https://w9r.uk/Z11.webp', modalImageUrl: 'https://w9r.uk/X11.webp' },
  { id: 12, name: '심하민', role: '체육교육과 대학생', traits: '맹목적 이타주의 · 정의감 · 희망', genderId: '남자 5번', imageUrl: 'https://w9r.uk/Z12.webp', modalImageUrl: 'https://w9r.uk/X12.webp' },
  { id: 13, name: '유승아', role: '조소과 대학생', traits: '긍정적 · 분위기 메이커', genderId: '여자 8번', imageUrl: 'https://w9r.uk/Z13.webp', modalImageUrl: 'https://w9r.uk/X13.webp' },
  { id: 14, name: '윤정훈', role: '아이돌 연습생', traits: '심미적 강박 · 결벽 · 우아함 집착', genderId: '남자 6번', imageUrl: 'https://w9r.uk/Z14.webp', modalImageUrl: 'https://w9r.uk/X14.webp' },
  { id: 15, name: '임동욱', role: '프로축구선수', traits: '개인주의 · 자기보존 · 에고이스트', genderId: '남자 7번', imageUrl: 'https://w9r.uk/Z15.webp', modalImageUrl: 'https://w9r.uk/X15.webp' },
  { id: 16, name: '장단비', role: '쇼핑몰 모델', traits: '갈등 회피 · 수동적 의존 · 무의식적 조종', genderId: '여자 9번', imageUrl: 'https://w9r.uk/Z16.webp', modalImageUrl: 'https://w9r.uk/X16.webp' },
  { id: 17, name: '정이현', role: '백수 / 히키코모리', traits: '과거 학폭 피해자 · 자기혐오 · 대인기피', genderId: '남자 8번', imageUrl: 'https://w9r.uk/Z17.webp', modalImageUrl: 'https://w9r.uk/X17.webp' },
  { id: 18, name: '한다빈', role: '클럽 직원', traits: '과거 일진 · 허무주의 · 방관자', genderId: '여자 10번', imageUrl: 'https://w9r.uk/Z18.webp', modalImageUrl: 'https://w9r.uk/X18.webp' },
  { id: 19, name: '허범준', role: '아티스트', traits: '자유분방 · 쾌락주의', genderId: '남자 9번', imageUrl: 'https://w9r.uk/Z19.webp', modalImageUrl: 'https://w9r.uk/X19.webp' },
  { id: 20, name: '홍우람', role: '컴공과 대학생', traits: '체스형 수싸움 · 합리성', genderId: '남자 10번', imageUrl: 'https://w9r.uk/Z20.webp', modalImageUrl: 'https://w9r.uk/X20.webp' },
];

export default function App() {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStartX - clientX;
    
    if (diff > 50 && activeIndex < characters.length) {
      setActiveIndex(prev => prev + 1);
    } else if (diff < -50 && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const scrollByItem = (direction: 1 | -1) => {
    setActiveIndex(prev => Math.max(0, Math.min(characters.length, prev + direction)));
  };

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden p-4">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img 
            src="https://i.postimg.cc/wxkT764g/chogihwamyeon.png" 
            alt="Main Poster" 
            className="w-full h-full object-contain opacity-40 max-w-5xl mx-auto"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-[#fff0f5] border-4 border-[#ffb6c1] p-8 md:p-12 rounded-2xl shadow-[0_0_40px_rgba(255,182,193,0.2)] max-w-lg w-full text-center transform rotate-1"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 bg-[#ff69b4]/30 rotate-[-3deg] backdrop-blur-sm" />
          
          <div className="font-sans text-center space-y-6 text-[#ff1493] font-bold">
            <p className="text-2xl mb-6">환영합니다ꉂ(˵&gt; ᗜ &lt;˵)</p>
            
            <div className="space-y-6 text-lg">
              <div className="space-y-1">
                <p className="text-[#ff69b4]">1. 도망치지 마요!</p>
                <p className="text-[#ff0000] animate-pulse">목의 폭탄이 펑! (っ˘ ˘ς)</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-[#ff69b4]">2. 여기선 뭐든지 해도 돼요!</p>
                <p className="text-[#ff1493]">☆٩(｡•ω&lt;｡)و</p>
                <p className="text-[#ff0000] text-xl">★죽이든, 따먹든★ 뭐든 맘대로!</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-[#ff69b4]">3. 숨겨진 물건들을 찾아봐요!</p>
                <p className="text-[#ff1493]">٩(๑•̀o•́๑)و</p>
              </div>
            </div>

            <p className="text-xl mt-6">너무 즐거운 동창회!</p>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={() => setHasEntered(true)}
            className="mt-10 group flex items-center justify-center gap-2 w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl tracking-widest rounded-xl transition-all shadow-lg hover:shadow-red-600/50"
          >
            입장하기
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-red-900 selection:text-white">
      <main className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            동창회의 목적 <span className="text-red-600">REMAKE</span>
          </h1>
          <p className="text-zinc-500 font-mono tracking-widest uppercase">PREMIERE</p>
        </div>

        <div className="relative w-full max-w-[100vw] mx-auto h-[600px] md:h-[800px] flex items-center overflow-hidden mt-8">
          
          {/* Spotlight Background */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden flex justify-center">
            {/* Ceiling Structure */}
            <div className="absolute top-0 left-0 w-full h-12 bg-[#0a0a0a] border-b border-[#1f1f1f] shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20" />
            
            {/* Smooth Radial Light Cone */}
            <div 
              className="absolute top-0 w-[150vw] md:w-[1400px] h-[800px] z-10"
              style={{
                background: 'radial-gradient(50% 100% at 50% 0%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 45%, transparent 80%)'
              }}
            />
            
            {/* Bright center source at the ceiling */}
            <div className="absolute top-[-20px] w-[500px] h-[100px] bg-white/20 blur-[40px] rounded-full z-10" />
            <div className="absolute top-[-10px] w-[250px] h-[40px] bg-white/40 blur-[20px] rounded-full z-10" />
            <div className="absolute top-[-5px] w-[120px] h-[20px] bg-white/80 blur-[10px] rounded-full z-10" />
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => scrollByItem(-1)}
            className="absolute left-4 md:left-12 z-30 p-4 bg-black/50 hover:bg-red-900/80 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:scale-110"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={() => scrollByItem(1)}
            className="absolute right-4 md:right-12 z-30 p-4 bg-black/50 hover:bg-red-900/80 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:scale-110"
          >
            <ChevronRight size={32} />
          </button>

          {/* Scroll Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center z-10 cursor-grab active:cursor-grabbing"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            {characters.map((char, index) => {
              const diff = index - activeIndex;
              const isCenter = diff === 0;
              const isSide = Math.abs(diff) === 1;
              const isHidden = Math.abs(diff) > 2;
              
              const translateX = diff * (typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 380);
              const scale = isCenter ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 1.1 : 1.3) : (isSide ? 0.8 : 0.6);
              const zIndex = 20 - Math.abs(diff);
              
              return (
                <div 
                  key={char.id}
                  className="absolute transition-all duration-500 ease-in-out cursor-pointer"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex,
                    opacity: isHidden ? 0 : 1,
                    pointerEvents: isHidden ? 'none' : 'auto',
                  }}
                  onClick={() => {
                    if (isCenter) setSelectedChar(char);
                    else setActiveIndex(index);
                  }}
                >
                  <div className={`relative w-[280px] md:w-[400px] aspect-[2/3] transition-all duration-500 ease-in-out ${
                    isCenter ? 'brightness-110 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'brightness-[0.2] grayscale-[60%]'
                  }`}>
                    <div className="absolute inset-0 border-[8px] md:border-[16px] border-zinc-900 shadow-2xl rounded-sm overflow-hidden bg-zinc-800">
                      <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" draggable={false} />
                      
                      {/* Soft Glare Effect on Center Poster */}
                      <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* USER Card */}
            {(() => {
              const userIndex = characters.length;
              const diff = userIndex - activeIndex;
              const isCenter = diff === 0;
              const isSide = Math.abs(diff) === 1;
              const isHidden = Math.abs(diff) > 2;

              const translateX = diff * (typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 380);
              const scale = isCenter ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 1.1 : 1.2) : (isSide ? 0.8 : 0.6);
              const zIndex = 20 - Math.abs(diff);

              return (
                <div
                  className="absolute transition-all duration-500 ease-in-out cursor-pointer"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex,
                    opacity: isHidden ? 0 : 1,
                    pointerEvents: isHidden ? 'none' : 'auto',
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(userIndex);
                    } else {
                      window.open('https://faveai.io/story/019d81f1-646d-7822-9df8-bfb2cbfe61ed', '_blank');
                    }
                  }}
                >
                  <div className={`relative w-[300px] md:w-[800px] h-[420px] md:h-[600px] transition-all duration-500 ease-in-out ${
                    isCenter ? 'brightness-110 drop-shadow-[0_0_50px_rgba(220,38,38,0.3)]' : 'brightness-[0.2] grayscale-[60%]'
                  }`}>
                    <div className="absolute inset-0 border-[8px] md:border-[16px] border-zinc-900 shadow-2xl rounded-sm overflow-hidden bg-zinc-950 flex flex-col items-center justify-center">
                      <div className="absolute inset-0 border-2 border-red-900/50 z-10 pointer-events-none" />
                      
                      <div className="text-center z-20">
                        <h3 className="text-5xl md:text-8xl font-black text-red-600 tracking-tighter mb-4">
                          USER
                        </h3>
                        <p className="text-zinc-600 text-xl md:text-2xl font-bold tracking-widest">21번째 참가자</p>
                      </div>
                      
                      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
                      
                      {/* Soft Glare Effect on Center Poster */}
                      <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Map Section Moved Below */}
        <section className="mt-32 mb-24 max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 text-red-500 mb-8 justify-center">
            <MapIcon size={28} />
            <h2 className="text-3xl font-bold text-white">무대 : 폐교 세트장</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-red-900/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">본관</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li><strong className="text-zinc-200">4층:</strong> 1학년 교실, 음악실, 가정실습실, 미술실, 방송실</li>
                <li><strong className="text-zinc-200">3층:</strong> 2학년 교실, 컴퓨터실(작동 불가), 시청각실, 외국어 교실</li>
                <li><strong className="text-zinc-200">2층:</strong> 3학년 교실, 화학실, 생명과학실, 야간자습실</li>
                <li><strong className="text-zinc-200">1층:</strong> 교무실, 행정실, 보건실, 도서관, 교사 휴게실 및 샤워실</li>
                <li><strong className="text-zinc-200">지하 1층:</strong> 지하 체육관, 학생회실</li>
              </ul>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-red-900/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">별관 (체육관 건물)</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li><strong className="text-zinc-200">2층:</strong> 체육관 관객석, 체육관 방송시설</li>
                <li><strong className="text-zinc-200">1층:</strong> 식당, 체육관, 매점, 샤워실, 탈의실</li>
                <li><strong className="text-zinc-200">지하 1층:</strong> 창고</li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-red-900/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">야외</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li><strong className="text-zinc-200">운동장:</strong> 핏빛으로 물들 흙운동장</li>
                <li><strong className="text-zinc-200">세트장 뒤편:</strong> 소각장 및 쓰레기장</li>
                <li><strong className="text-zinc-200">외곽:</strong> 도망칠 곳 없는 깎아지른 절벽</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Character Modal */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedChar(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-7xl w-full bg-zinc-900 overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full relative aspect-[3/2] bg-black">
                <img 
                  src={selectedChar.modalImageUrl} 
                  alt={selectedChar.name}
                  className="w-full h-full object-contain"
                />
                <button 
                  onClick={() => setSelectedChar(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="w-full p-6 md:p-8 flex flex-col justify-center bg-zinc-950 border-t border-zinc-800">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <div className="text-red-500 font-mono text-sm mb-2 tracking-widest">
                        {selectedChar.genderId}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{selectedChar.name}</h3>
                      <p className="text-lg md:text-xl text-zinc-400">{selectedChar.role}</p>
                    </div>
                    
                    <div className="hidden md:block w-px h-16 bg-zinc-800 mx-4" />
                    
                    <div className="flex-1">
                      <h4 className="text-xs font-mono text-zinc-500 mb-3 uppercase tracking-widest">Traits</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedChar.traits.split('·').map((trait, i) => (
                          <span key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm px-3 py-1.5 whitespace-nowrap">
                            {trait.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
