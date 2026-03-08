export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: '#07070f' }}
    >
      {/* Animated logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          {/* Outer ring */}
          <svg className="absolute inset-0 w-full h-full animate-spin" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="17" stroke="#a855f720" strokeWidth="2" />
            <path d="M20 3 A17 17 0 0 1 37 20" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {/* Inner dot */}
          <div
            className="absolute inset-0 m-auto w-3 h-3 rounded-full"
            style={{ background: '#a855f7', boxShadow: '0 0 12px #a855f7', animation: 'pulse 1.5s ease-in-out infinite' }}
          />
        </div>
        <span
          className="text-xl font-black tracking-tight"
          style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          ArcadeWave
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #a855f7, #3b82f6)',
            boxShadow: '0 0 8px #a855f780',
            animation: 'loading-bar 1.4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
