// components/dubbing-studio/auto-pipeline-panel.tsx
'use client'; 

import React, { useState } from 'react';

export default function AutoPipelinePanel() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('រង់ចាំការបញ្ជា...');

  const handleAutoPilotClick = async () => {
    setIsProcessing(true);
    setStatus('🚀 កំពុងបញ្ជូនបញ្ជាទៅកាន់ម៉ាស៊ីន AI...');

    try {
      // ហៅទៅកាន់ API Endpoint ដែលយើងទើបតែបង្កើត (app/api/auto-pilot/route.ts)
      const response = await fetch('/api/auto-pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: 'test-video.mp4', targetLanguage: 'Khmer' })
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
      <h2 className="text-xl font-bold mb-4">🤖 ប្រព័ន្ធបញ្ជាស្វ័យប្រវត្តិ (Auto-Pilot)</h2>
      
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-400">ស្ថានភាពប្រព័ន្ធ:</p>
        <p className="text-lg font-semibold text-blue-400 mt-1">{status}</p>
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
