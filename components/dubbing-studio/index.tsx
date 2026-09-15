// components/dubbing-studio/index.tsx
'use client';

import React, { useState, useRef } from 'react';
import { DashboardScreenContainer, type DUB_LANGS } from './dashboard-screen';

type LangCode = (typeof DUB_LANGS)[number]['code'];
type Status = 'idle' | 'processing' | 'done';

export function DubbingStudio() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [targetLang, setTargetLang] = useState<LangCode>('km');
  const [status, setStatus] = useState<Status>('idle');
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const acceptFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setVideoUrl(URL.createObjectURL(selectedFile));
  };

  const reset = () => {
    setFile(null);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    setStatus('idle');
    setStage(0);
    setProgress(0);
  };

  const start = async () => {
    setStatus('processing');
    setStage(0);
    setProgress(15);

    // AI Processing Simulation
    setTimeout(() => {
      setStage(1);
      setProgress(50);
    }, 1500);

    setTimeout(() => {
      setStage(2);
      setProgress(85);
    }, 3000);

    setTimeout(() => {
      setProgress(100);
      setStatus('done');
    }, 4500);
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => acceptFile(e.target.files?.[0])}
      />

      <DashboardScreenContainer
        file={file}
        videoUrl={videoUrl}
        dragging={dragging}
        setDragging={setDragging}
        acceptFile={acceptFile}
        inputRef={inputRef}
        reset={reset}
        targetLang={targetLang}
        setTargetLang={setTargetLang}
        start={start}
        status={status}
        stage={stage}
        progress={progress}
      />
    </div>
  );
}
