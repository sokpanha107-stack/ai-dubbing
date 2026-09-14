// components/dubbing-studio/auto-pipeline-panel.tsx
'use client'; // ប្រាប់ Next.js ថានេះជា Client Component សម្រាប់ Render UI

import React, { useState } from 'react';

export default function AutoPipelinePanel() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('រង់ចាំការបញ្ជា...');

  const handleAutoPilotClick = async () => {
    setIsProcessing(true);
    setStatus('កំពុងវិភាគវីដេអូ និងបកប្រែ (AI Agent ដើរតួ)...');
    
    // ទីកន្លែងនេះនៅថ្ងៃមុខយើងនឹងសរសេរកូដហៅទៅកាន់ pipeline.ts របស់យើង
    // ខាងក្រោមនេះគ្រាន់តែជាការក្លែងធ្វើសកម្មភាព (Simulation) ដើម្បីមើល UI សិន
    setTimeout(() => {
      setStatus('កំពុងកាត់ត និងបន្លំក្បួនខ្នាត (Transformer ដើរតួ)...');
    }, 2500);

    setTimeout(() => {
      setStatus('✨ ជោគជ័យ! វីដេអូរួចរាល់សម្រាប់ Export។');
      setIsProcessing(false);
    }, 5000);
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
