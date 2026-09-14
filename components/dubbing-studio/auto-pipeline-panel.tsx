// components/dubbing-studio/auto-pipeline-panel.tsx
'use client'; 

import React, { useState } from 'react';
import { SUPPORTED_PLATFORMS } from '@/lib/constants/platforms';
import { SUPPORTED_LANGUAGES } from '@/lib/constants/languages';

export default function AutoPipelinePanel() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('រង់ចាំការបញ្ជា...');
  
  // 🎛️ State គ្រប់គ្រងទម្រង់ស្ទីលវីដេអូ, ភាសា, Platform និង Episodic Mode
  const [videoStyle, setVideoStyle] = useState('top-down'); // 'top-down' หรือ 'bottom-up' หรือ 'cinematic' หรือ 'voiceover'
  const [targetLang, setTargetLang] = useState('km');
  const [platform, setPlatform] = useState('tiktok');
  const [episodicMode, setEpisodicMode] = useState(true);

  const handleAutoPilotClick = async () => {
    setIsProcessing(true);
    setStatus(`🚀 កំពុងបញ្ជូនបញ្ជាទៅកាន់ AI Engine (Style: ${videoStyle}, Platform: ${platform.toUpperCase()}, Episodic: ${episodicMode ? 'បើក' : 'បិទ'})...`);

    try {
      const response = await fetch('/api/auto-pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          videoUrl: 'full-story-source.mp4', 
          videoStyle,
          targetLanguage: targetLang,
          targetPlatform: platform,
          episodicSplit: episodicMode 
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
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        🎛️ savpd.io Option Control
      </h2>
      
      {/* ១. បំបែកទម្រង់ស្ទីលវីដេអូ ជា Card ប៊ូតុងដាច់ពីគ្នា (Top-Down vs Bottom-Up vs others) */}
      <div className="mb-5">
        <label className="block text-sm text-gray-400 mb-2 font-semibold">១. ជ្រើសរើសទម្រង់ស្ទីលសាច់រឿង:</label>
        <div className="grid grid-cols-2 gap-3">
          {/* Top-Down Card */}
          <button
            type="button"
            onClick={() => { setVideoStyle('top-down'); setEpisodicMode(true); }}
            className={`p-3 rounded-xl border text-left transition-all ${
              videoStyle === 'top-down'
                ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <div className="text-base mb-1">🎬</div>
            <div className="text-xs font-bold">Top-Down Splitter</div>
            <div className="text-[10px] opacity-70 mt-0.5">ទម្លាក់រឿងទាំងដុំ កាត់ចែកជាភាគ</div>
          </button>

          {/* Bottom-Up Card */}
          <button
            type="button"
            onClick={() => { setVideoStyle('bottom-up'); setEpisodicMode(false); }}
            className={`p-3 rounded-xl border text-left transition-all ${
              videoStyle === 'bottom-up'
                ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <div className="text-base mb-1">🧩</div>
            <div className="text-xs font-bold">Bottom-Up Assembler</div>
            <div className="text-[10px] opacity-70 mt-0.5">ផ្គុំរឿងពីរាយ ជារឿងពេញ</div>
          </button>
        </div>

        {/* ស្ទីលបន្ថែម (Cinematic & Voiceover) */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button
            type="button"
            onClick={() => setVideoStyle('cinematic')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              videoStyle === 'cinematic'
                ? 'bg-purple-600/20 border-purple-500 text-white shadow-md'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <div className="text-xs font-bold">🎥 Cinematic Style</div>
          </button>

          <button
            type="button"
            onClick={() => setVideoStyle('voiceover')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              videoStyle === 'voiceover'
                ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <div className="text-xs font-bold">🎙️ Voiceover</div>
          </button>
        </div>
      </div>

      {/* ២. ជ្រើសរើសភាសាគោលដៅ (20+ Languages Support) */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2 font-semibold">២. ជ្រើសរើសភាសាគោលដៅ (20+ Languages):</label>
        <select 
          value={targetLang} 
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-blue-500"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.nativeName} ({lang.name})
            </option>
          ))}
        </select>
      </div>

      {/* ៣. ជ្រើសរើស Platform (Dynamic SUPPORTED_PLATFORMS) */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2 font-semibold">៣. ជ្រើសរើសទិសដៅ Platform:</label>
        <select 
          value={platform} 
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-blue-500"
        >
          {Object.values(SUPPORTED_PLATFORMS).map((p: any) => (
            <option key={p.id} value={p.id}>
              📱 {p.name} — ({p.description})
            </option>
          ))}
        </select>
      </div>

      {/* ៤. មុខងារ Episodic Splitter Mode */}
      <div className="mb-6 flex items-center justify-between bg-gray-800 p-3 rounded-lg border border-gray-700">
        <div>
          <p className="text-sm font-semibold">ប្រព័ន្ធកាត់ចែកជាភាគ (Episodic Mode)</p>
          <p className="text-xs text-gray-400">AI ច្របាច់សាច់រឿងពេញចេញជា Episode ស្វ័យប្រវត្តិ</p>
        </div>
        <input 
          type="checkbox" 
          checked={episodicMode} 
          onChange={(e) => setEpisodicMode(e.target.checked)}
          className="w-5 h-5 accent-blue-600 cursor-pointer"
        />
      </div>

      {/* ស្ថានភាពប្រព័ន្ធ */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-400">ស្ថានភាពប្រព័ន្ធ:</p>
        <p className="text-sm font-semibold text-blue-400 mt-1">{status}</p>
      </div>

      {/* ប៊ូតុងបញ្ជា */}
      <button 
        type="button"
        onClick={handleAutoPilotClick}
        disabled={isProcessing}
        className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
          isProcessing 
            ? 'bg-gray-600 cursor-not-allowed opacity-70' 
            : 'bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.5)]'
        }`}
      >
        {isProcessing ? '⏳ កំពុងដំណើរការម៉ាស៊ីន...' : '🚀 ចាប់ផ្តើម One-Click Auto-Pilot'}
      </button>
    </div>
  );
}
