// components/dubbing-studio/auto-pipeline-panel.tsx
'use client'; 

import React, { useState } from 'react';
import { SUPPORTED_PLATFORMS } from '@/lib/constants/platforms';

export default function AutoPipelinePanel() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('រង់ចាំការបញ្ជា...');
  
  // 🎛️ បន្ថែម State សម្រាប់គ្រប់គ្រងស្ទីលវីដេអូទាំង ៤ និងភាសា ព្រមទាំង Platform និង Episodic Mode
  const [videoStyle, setVideoStyle] = useState('top-down');
  const [targetLang, setTargetLang] = useState('khmer');
  const [platform, setPlatform] = useState('tiktok');
  const [episodicMode, setEpisodicMode] = useState(true);

  const handleAutoPilotClick = async () => {
    setIsProcessing(true);
    setStatus(`🚀 កំពុងបញ្ជូនបញ្ជាទៅកាន់ AI Engine (Style: ${videoStyle}, Platform: ${platform.toUpperCase()}, Episodic: ${episodicMode ? 'เปิด' : 'ปิด'})...`);

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
      setStatus('❌ មានបញ្ហាក្នុងการភ្ជាប់ទៅកាន់ Server');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        🎛️ savpd.io Master Chef Control Center
      </h2>
      
      {/* ១. ជ្រើសរើសស្ទីលវីដេអូ (4 Core Styles) */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">១. ជ្រើសរើសទម្រង់ស្ទីលវីដេអូ:</label>
        <select 
          value={videoStyle} 
          onChange={(e) => setVideoStyle(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="top-down">🎬 Top-Down (ទម្លាក់រឿងទាំងដុំ ឱ្យ AI កាត់ចែកជាភាគ)</option>
          <option value="bottom-up">🧩 Bottom-Up (ទម្លាក់រឿងរាយ ឱ្យ AI ផ្គុំចូលគ្នា)</option>
          <option value="cinematic">🎥 Cinematic Style (រចនាប័ទ្មភាពយន្តធំ)</option>
          <option value="voiceover">🎙️ Voiceover Narration (បែបនិទានរឿង)</option>
        </select>
      </div>

      {/* ២. ជ្រើសរើសភាសាគោលដៅ */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">២. ជ្រើសរើសភាសាគោលដៅ:</label>
        <select 
          value={targetLang} 
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="khmer">🇰🇭 ភាសាខ្មែរ (Khmer)</option>
          <option value="english">🇬🇧 ភាសាអង់គ្លេស (English)</option>
          <option value="thai">🇹🇭 ភាសាថៃ (Thai)</option>
        </select>
      </div>

      {/* ៣. ជ្រើសរើស Platform (ទាញយកទិន្នន័យស្វ័យប្រវត្តិពី SUPPORTED_PLATFORMS) */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">៣. ជ្រើសរើសទិសដៅ Platform:</label>
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
