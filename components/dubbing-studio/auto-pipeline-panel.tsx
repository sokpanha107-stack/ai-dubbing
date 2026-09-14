// components/dubbing-studio/auto-pipeline-panel.tsx
'use client'; 

import React, { useState } from 'react';

export default function AutoPipelinePanel() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('រង់ចាំការបញ្ជា...');
  const [platform, setPlatform] = useState('tiktok');
  const [episodicMode, setEpisodicMode] = useState(true);

  const handleAutoPilotClick = async () => {
    setIsProcessing(true);
    setStatus(`🚀 កំពុងបញ្ជូនបញ្ជាទៅកាន់ AI (Platform: ${platform.toUpperCase()}, Episodic: ${episodicMode ? 'Bật' : 'Tắt'})...`);

    try {
      const response = await fetch('/api/auto-pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          videoUrl: 'full-story-source.mp4', 
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
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">🤖 ប្រព័ន្ធបញ្ជាស្វ័យប្រវត្តិ (Auto-Pilot Pro)</h2>
      
      {/* ជ្រើសរើស Platform */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">១. ជ្រើសរើសទិសដៅ Platform:</label>
        <select 
          value={platform} 
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="tiktok">TikTok (Sweet Spot: 1 - 5 នាទី)</option>
          <option value="facebook">Facebook Video (Sweet Spot: 8 - 10 នាទី)</option>
          <option value="youtube">YouTube Long-form (Sweet Spot: 8 - 15 នាទី)</option>
        </select>
      </div>

      {/* មុខងារ Episodic Splitter */}
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

      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-400">ស្ថានភាពប្រព័ន្ធ:</p>
        <p className="text-sm font-semibold text-blue-400 mt-1">{status}</p>
      </div>

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
