// components/dubbing-studio/index.tsx (ឬ file Component មេរបស់ Dashboard)
'use client';

import React, { useState } from 'react';
import { SUPPORTED_PLATFORMS } from '@/lib/constants/platforms';
import { SUPPORTED_LANGUAGES } from '@/lib/constants/languages';

export function DubbingStudio() {
  const [videoStyle, setVideoStyle] = useState('top-down');
  const [targetLang, setTargetLang] = useState('km');
  const [platform, setPlatform] = useState('tiktok');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('រង់ចាំការបញ្ជា...');

  const handleProcess = async () => {
    setIsProcessing(true);
    setStatus('🚀 កំពុងដំណើរការ AI ស្វ័យប្រវត្តិ...');
    // จำลองการทำงาน API
    setTimeout(() => {
      setIsProcessing(false);
      setStatus('✨ ជោគជ័យ!');
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-950 text-white rounded-3xl border border-gray-800 shadow-2xl space-y-4">
      
      {/* 🌟 1. ផ្នែក Upload វីដេអូ (តូចល្មម មិនញ៉េរញ៉ៃ) */}
      <div className="border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer bg-gray-900/50 transition-all">
        <div className="text-2xl mb-1">📁</div>
        <p className="text-xs font-semibold text-gray-200">ទម្លាក់វីដេអូ ឬចុចទីនេះเพื่อ Upload</p>
        <p className="text-[10px] text-gray-400 mt-0.5">MP4, MOV, WEBM</p>
      </div>

      {/* 🌟 2. ជ្រើសរើសស្ទីលសាច់រឿង (Option ទាំង 4 ប៊ូតុងតូចៗស្អាត) */}
      <div>
        <label className="block text-[11px] text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
          ១. ជ្រើសរើសស្ទីលសាច់រឿង:
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setVideoStyle('top-down')}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
              videoStyle === 'top-down' ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-gray-900 border-gray-800 text-gray-400'
            }`}
          >
            <div className="font-bold">🎬 Top-Down</div>
            <div className="text-[9px] opacity-70">កាត់ចែកជាភាគ</div>
          </button>

          <button
            type="button"
            onClick={() => setVideoStyle('bottom-up')}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
              videoStyle === 'bottom-up' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-gray-900 border-gray-800 text-gray-400'
            }`}
          >
            <div className="font-bold">🧩 Bottom-Up</div>
            <div className="text-[9px] opacity-70">ផ្គុំរឿងរាយ</div>
          </button>
        </div>
      </div>

      {/* 🌟 3. ရើសភាសាគោលដៅ និង Platform តម្រៀបទន្ទឹមគ្នា ឬមានរបៀប */}
      <div className="grid grid-cols-2 gap-2">
        {/* ភាសា */}
        <div>
          <label className="block text-[11px] text-gray-400 mb-1 font-medium">២. ភាសាគោលដៅ:</label>
          <select 
            value={targetLang} 
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2.5 bg-gray-900 text-white rounded-xl border border-gray-800 text-xs focus:outline-none focus:border-blue-500"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.nativeName}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-[11px] text-gray-400 mb-1 font-medium">៣. ទិសដៅ Platform:</label>
          <select 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2.5 bg-gray-900 text-white rounded-xl border border-gray-800 text-xs focus:outline-none focus:border-blue-500"
          >
            {Object.values(SUPPORTED_PLATFORMS).map((p: any) => (
              <option key={p.id} value={p.id}>
                📱 {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ស្ថានភាពប្រព័ន្ធ */}
      <div className="p-2.5 bg-gray-900/60 rounded-xl border border-gray-800/80 text-center">
        <p className="text-[10px] text-gray-400">{status}</p>
      </div>

      {/* 🌟 4. ប៊ូតុងបញ្ជាចុងក្រោយ */}
      <button 
        type="button"
        onClick={handleProcess}
        disabled={isProcessing}
        className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all shadow-lg shadow-blue-600/20"
      >
        {isProcessing ? '⏳ កំពុងដំណើរការ...' : '🚀 ចាប់ផ្តើម AI Workflow ស្វ័យប្រវត្តិ'}
      </button>

    </div>
  );
}
