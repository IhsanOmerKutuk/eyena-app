'use client';

import { useRef, useState } from 'react';

export default function SplashScreen() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    setFading(true);
    setTimeout(() => setHidden(true), 900);
  };

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.9s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <video
        ref={videoRef}
        src="/intro.mp4.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}
