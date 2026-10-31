'use client';

import React, { useEffect, useState } from 'react';

interface PawPoint {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function PawTrail() {
  const [paws, setPaws] = useState<PawPoint[]>([]);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let counter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 45) {
        lastX = e.clientX;
        lastY = e.clientY;
        const angle = (Math.atan2(e.movementY, e.movementX) * 180) / Math.PI + 90;
        const newPaw: PawPoint = {
          id: counter++,
          x: e.clientX,
          y: e.clientY,
          rotation: angle
        };

        setPaws(prev => [...prev.slice(-12), newPaw]);

        setTimeout(() => {
          setPaws(prev => prev.filter(p => p.id !== newPaw.id));
        }, 1200);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {paws.map(paw => (
        <span
          key={paw.id}
          className="absolute block size-4 opacity-40 transition-opacity duration-1000 ease-out"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            transform: `translate(-50%, -50%) rotate(${paw.rotation}deg)`,
            backgroundImage: "url('/cursor/paw.svg')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}
    </div>
  );
}
