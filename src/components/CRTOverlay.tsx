export default function CRTOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
      style={{ borderRadius: 'inherit' }}
    >
      {/* 1. Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* 2. Moving scanline sweep (very subtle) */}
      <div className="absolute inset-0 animate-scanline opacity-[0.06]">
        <div
          className="h-1/3 w-full"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(126,240,212,0.6), transparent)',
          }}
        />
      </div>

      {/* 3. Vignette (darkened corners) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* 4. Phosphor glow overlay */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-[0.08]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(126,240,212,0.5), transparent 70%)',
        }}
      />

      {/* 5. RGB chromatic aberration at edges (subtle) */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-[0.04]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,0,0,1) 0%, transparent 3%, transparent 97%, rgba(0,0,255,1) 100%)',
        }}
      />

      {/* 6. Screen flicker */}
      <div className="absolute inset-0 animate-flicker bg-white/[0.005]" />
    </div>
  );
}
