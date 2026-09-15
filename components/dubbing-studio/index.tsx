// components/dubbing-studio/index.tsx
'use client';

import React, { useState } from 'react';
import { SUPPORTED_PLATFORMS } from '@/lib/constants/platforms';
import { SUPPORTED_LANGUAGES } from '@/lib/constants/languages';

export function DubbingStudio() {
  // 🎛️ States គ្រប់គ្រងមុខងារទាំងអស់ឱ្យប្រទាក់ក្រឡាគ្នា
  const [dubbingMode, setDubbingMode] = useState('level1'); // កម្រិតសំឡេង
  const [videoStyle, setVideoStyle] = useState('normal');   // ទម្រង់សាច់វីដេអូ
  const [subtitleStyle, setSubtitleStyle] = useState('dynamic'); // ស្ទីល Subtitle
  const [targetLang, setTargetLang] = useState('km');       // ភាសា
  const [platform, setPlatform] = useState('tiktok');       // Platform
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('រង់ចាំការបញ្ជា...');

  const handleProcess = async () => {
    setIsProcessing(true);
    setStatus('🚀 កំពុងបញ្ជូនបញ្ជាប្រទាក់ក្រឡាគ្នាទៅកាន់ AI...');
    
    try {
      const response = await fetch('/api/auto-pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          dubbingMode,      
          videoStyle,       
          subtitleStyle,    
          targetLanguage: targetLang, 
          targetPlatform: platform    
        })
      });

      const data = await response.json();
      if (data.success) {
        setStatus(`✨ ជោគជ័យ! ${data.message}`);
      } else {
        setStatus(`❌ បរាជ័យ: ${data.message}`);
      }
    } catch (error) {
      setStatus('❌ មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-950 text-white rounded-3xl border border-gray-800 shadow-2xl space-y-4">
      
      {/* 🌟 1. ផ្នែក Upload វីដេអូ */}
      <div className="border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer bg-gray-900/50 transition-all">
        <div className="text-xl mb-1">📁</div>
        <p className="text-xs font-semibold text-gray-200">ទម្លាក់វីដេអូ ឬចុចទីនេះដើម្បី Upload</p>
        <p className="text-[10px] text-gray-400 mt-0.5">MP4, MOV, WEBM</p>
      </div>

      {/* 🌟 2. កម្រិតបញ្ចូលសំឡេងទាំង ៤ (Audio/Dubbing Level) */}
      <div>
        <label className="block text-[11px] text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
          ១. កម្រិតបញ្ចូលសំឡេង (AI Dubbing):
        </label>
        <select 
          value={dubbingMode} 
          onChange={(e) => setDubbingMode(e.target.value)}
          className="w-full p-2.5 bg-gray-900 text-white rounded-xl border border-gray-800 text-xs focus:outline-none focus:border-blue-500"
        >
          <option value="level1">🎙️ កម្រិត ១៖ បកប្រែ & បញ្ចូលសំឡេងតាមតួធម្មតា (Voiceover)</option>
          <option value="level2">🎵 កម្រិត ២៖ បញ្ចូលសំឡេងតួ + កែច្នៃ Sound Effect (SFX)</option>
          <option value="level3">🎬 កម្រិត ៣៖ បែបរឿង/ភាពយន្ត (សំឡេងតួ + SFX ពិសេស)</option>
          <option value="level4">🔥 កម្រិត ៤ (Pro)៖ បង្កើតសំឡេង និង SFX ពីសូន្យ (សម្រាប់វីដេអូគរ)</option>
        </select>
      </div>

      {/* 🌟 3. ទម្រង់សាច់វីដេអូទាំង ៣ (Video Structure) */}
      <div>
        <label className="block text-[11px] text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
          ២. ទម្រង់សាច់វីដេអូ (មាន Hook & Thumbnail ស្វ័យប្រវត្តិ):
        </label>
        <div className="grid grid-cols-3 gap-2">
          
          <button
            type="button"
            onClick={() => setVideoStyle('normal')}
            className={`p-2 rounded-xl border text-center transition-all ${
              videoStyle === 'normal' ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
            }`}
          >
            <div className="text-sm mb-0.5">🎞️</div>
            <div className="text-[10px] font-bold">វីដេអូធម្មតា</div>
            <div className="text-[8px] opacity-75 mt-1 leading-tight">រៀបសាច់រឿង<br/>ទាក់ទាញ</div>
          </button>

          <button
            type="button"
            onClick={() => setVideoStyle('top-down')}
            className={`p-2 rounded-xl border text-center transition-all ${
              videoStyle === 'top-down' ? 'bg-blue-600/20 border-blue-500 text-white shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
            }`}
          >
            <div className="text-sm mb-0.5">🎬</div>
            <div className="text-[10px] font-bold">បំបែកជាភាគ</div>
            <div className="text-[8px] opacity-75 mt-1 leading-tight">កាត់ EP<br/>(Top-Down)</div>
          </button>

          <button
            type="button"
            onClick={() => setVideoStyle('bottom-up')}
            className={`p-2 rounded-xl border text-center transition-all ${
              videoStyle === 'bottom-up' ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md' : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
            }`}
          >
            <div className="text-sm mb-0.5">🧩</div>
            <div className="text-[10px] font-bold">ផ្គុំរឿងរាយ</div>
            <div className="text-[8px] opacity-75 mt-1 leading-tight">ផ្គុំឃ្លីបចូលគ្នា<br/>(Bottom-Up)</div>
          </button>

        </div>
      </div>

      {/* 🌟 4. ជម្រើស Subtitle */}
      <div>
        <label className="block text-[11px] text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
          ៣. ជ្រើសរើសស្ទីល Subtitle:
        </label>
        <select 
          value={subtitleStyle} 
          onChange={(e) => setSubtitleStyle(e.target.value)}
          className="w-full p-2.5 bg-gray-900 text-white rounded-xl border border-gray-800 text-xs focus:outline-none focus:border-blue-500"
        >
          <option value="none">❌ អត់ដាក់ Subtitle</option>
          <option value="standard">📝 Subtitle ស្តង់ដារ (ធម្មតា)</option>
          <option value="dynamic">✨ Subtitle រំលេចពាក្យ (ស្ទីល Alex Hormozi)</option>
          <option value="bilingual">🌍 Subtitle ទ្វេភាសា (ខ្មែរផង អង់គ្លេសផង)</option>
        </select>
      </div>

      {/* 🌟 5. រើសភាសាគោលដៅ និង Platform */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <label className="block text-[11px] text-gray-400 mb-1 font-medium">៤. ភាសាគោលដៅ:</label>
          <select 
            value={targetLang} 
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2 bg-gray-900 text-white rounded-xl border border-gray-800 text-xs focus:outline-none focus:border-blue-500"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.nativeName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] text-gray-400 mb-1 font-medium">៥. ទិសដៅ Platform:</label>
          <select 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 bg-gray-900 text-white rounded-xl border border-gray-800 text-xs focus:outline-none focus:border-blue-500"
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
      <div className="p-2.5 bg-gray-900/60 rounded-xl border border-gray-800/80 text-center mt-2">
        <p className="text-[10px] text-blue-400 font-medium">{status}</p>
      </div>

      {/* 🌟 6. ប៊ូតុងបញ្ជាចុងក្រោយ */}
      <button 
        type="button"
        onClick={handleProcess}
        disabled={isProcessing}
        className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
      >
        {isProcessing ? '⏳ កំពុងដំណើរការម៉ាស៊ីន AI...' : '🚀 ចាប់ផ្តើម AI Workflow ស្វ័យប្រវត្តិ'}
      </button>

    </div>
  );
}
