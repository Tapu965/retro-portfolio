import { useState } from 'react';
import type { ReactNode } from 'react';
import CRTOverlay from './CRTOverlay';

interface ScreenProps {
  children: ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  return (
    // Full-screen dark room
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Monitor bezel (centered) */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
        <div className="relative h-full w-full max-w-[1400px]">
          {/* --- Plastic bezel --- */}
          <div
            className="absolute inset-0 rounded-[2.5rem] p-3 sm:p-5"
            style={{
              background:
                'linear-gradient(145deg, #3f3b33 0%, #2d2a24 50%, #1a1814 100%)',
              boxShadow:
                '0 10px 0 #0f0e0b, 0 25px 40px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,200,0.15), inset 0 -3px 6px rgba(0,0,0,0.6)',
              border: '2px solid #5a5346',
            }}
          >
            {/* --- Inner screen (the glass) --- */}
            <div
              className="relative h-full w-full overflow-hidden"
              style={
                {
                  '--screen-radius': '1.75rem',
                  borderRadius: 'var(--screen-radius)',
                  // deep inset shadow = tube depth
                  boxShadow:
                    'inset 0 0 60px rgba(0,0,0,0.95), inset 0 0 120px rgba(0,0,0,0.6), 0 0 0 3px #0a0a0a',
                  // CRT curvature via SVG filter
                  filter: 'url(#crt-curve)',
                  // phosphor background color
                  background: '#021012',
                } as React.CSSProperties
              }
            >
              {/* --- Desktop content lives here --- */}
              <div className="relative h-full w-full overflow-hidden">{children}</div>

              {/* --- Visual overlay (scanlines, vignette, flicker) --- */}
              <CRTOverlay />

              {/* --- Glass reflection (top-left highlight) --- */}
              <div
                className="pointer-events-none absolute inset-0 z-[60]"
                style={{
                  borderRadius: 'var(--screen-radius)',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 25%)',
                }}
              />
            </div>
          </div>

          {/* --- Power LED on bezel --- */}
          <div className="absolute bottom-2 right-8 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-warn shadow-[0_0_8px_#f5b842]" />
            <span className="font-mono text-[10px] tracking-widest text-bevel-dark">
              PWR
            </span>
          </div>

          {/* --- Brand plate on bezel --- */}
          <div className="absolute bottom-2 left-10">
            <span className="font-pixel text-[8px] tracking-[0.3em] text-bevel-dark/70">
              RETRO—OS
            </span>
          </div>
        </div>
      </div>

      {/* --- SVG filter for real CRT curvature (barrel distortion) --- */}
      <svg className="pointer-events-none absolute h-0 w-0">
        <defs>
          <filter id="crt-curve">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.00001 0.00003"
              numOctaves="1"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
