'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FLASH_GAMES, Game } from '@/data/games'
import PageNav from '@/components/page-nav'

// ─── Load Ruffle dynamically ──────────────────────────────────────────────────
function useRuffle() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const existing = document.querySelector('script[data-ruffle]')
    if (existing) return
    const s = document.createElement('script')
    s.src = 'https://unpkg.com/@ruffle-rs/ruffle'
    s.setAttribute('data-ruffle', '1')
    document.head.appendChild(s)
  }, [])
}

// ─── Flash game player modal ──────────────────────────────────────────────────
function FlashPlayer({ game, onClose }: { game: Game; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tryLoad = () => {
      const ruffle = (window as any).RufflePlayer?.newest()
      if (!ruffle || !containerRef.current || !game.embedUrl) return false
      containerRef.current.innerHTML = ''
      const player = ruffle.createPlayer()
      player.style.width = '100%'
      player.style.height = '100%'
      player.load(game.embedUrl)
      containerRef.current.appendChild(player)
      return true
    }

    if (!tryLoad()) {
      // Ruffle not ready yet, poll briefly
      const interval = setInterval(() => { if (tryLoad()) clearInterval(interval) }, 300)
      return () => clearInterval(interval)
    }
  }, [game])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: '#07070f' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Bar */}
      <div
        className="flex items-center justify-between px-6 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: '#f59e0b', boxShadow: '0 0 12px #f59e0b' }} />
          <span className="font-bold text-white">{game.title}</span>
          <span className="px-2 py-0.5 text-xs rounded-full border" style={{ borderColor: '#f59e0b40', color: '#f59e0b', backgroundColor: '#f59e0b15' }}>
            ✦ Flash · Ruffle
          </span>
        </div>
        <motion.button
          onClick={onClose}
          className="px-4 py-1.5 rounded-full text-sm border"
          style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
          whileHover={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
        >
          ✕ Quitter
        </motion.button>
      </div>

      {/* Ruffle container */}
      <div ref={containerRef} className="flex-1 flex items-center justify-center">
        <p className="text-sm animate-pulse" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Chargement de Ruffle Flash Emulator…
        </p>
      </div>
    </motion.div>
  )
}

// ─── Flash game card ──────────────────────────────────────────────────────────
function FlashCard({ game, onClick }: { game: Game; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background: `linear-gradient(135deg, ${game.gradientFrom}, ${game.gradientVia}, ${game.gradientTo})`,
        border: `1px solid ${hovered ? game.accent + '60' : game.accent + '20'}`,
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${game.accent}25` : '0 8px 30px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
    >
      {/* Abstract art */}
      <div className="relative h-44 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 240 176" fill="none">
          <circle cx="120" cy="80" r="70" fill={game.accent} style={{ filter: 'blur(30px)' }} />
          <circle cx="200" cy="140" r="50" fill={game.gradientTo} style={{ filter: 'blur(20px)' }} />
          <polygon points="120,20 210,120 30,120" stroke={game.accent} strokeWidth="1" opacity="0.35" />
          <circle cx="120" cy="88" r="50" stroke={game.accent} strokeWidth="1" strokeDasharray="3 5" opacity="0.4" />
        </svg>

        {/* Flash badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#f59e0b', border: '1px solid #f59e0b30', backdropFilter: 'blur(8px)' }}>
          ✦ FLASH
        </div>

        {/* Play overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: game.accent, boxShadow: `0 0 30px ${game.accent}80` }}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-white text-sm leading-tight">{game.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill={game.accent}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-xs font-bold" style={{ color: game.accent }}>{game.rating}</span>
          </div>
        </div>
        <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {game.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: game.accent + '18', color: game.accent }}>
            {game.genre}
          </span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{game.ratingCount} avis</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NostalgiePage() {
  const [activeGame, setActiveGame] = useState<Game | null>(null)
  useRuffle()

  return (
    <>
      <AnimatePresence>
        {activeGame && (
          <FlashPlayer game={activeGame} onClose={() => setActiveGame(null)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen" style={{ backgroundColor: '#07070f' }}>
        <PageNav />
        {/* Ambient */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, #f59e0b08 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, #a855f708 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="dot-grid absolute inset-0 opacity-20" />
        </div>

        {/* Neon top line */}
        <div className="relative z-10 h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, #f59e0b, #a855f7, transparent)', boxShadow: '0 0 20px #f59e0b60' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <motion.div className="flex items-center gap-2 mb-10 text-sm"
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>Accueil</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span className="font-medium" style={{ color: '#f59e0b' }}>Nostalgie Flash</span>
          </motion.div>

          {/* Header */}
          <motion.div className="mb-12"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1.5 h-10 rounded-full"
                style={{ backgroundColor: '#f59e0b', boxShadow: '0 0 20px #f59e0b' }} />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-5xl font-black text-white">Nostalgie</h1>
                  <span className="px-3 py-1 text-sm font-bold rounded-full"
                    style={{ backgroundColor: '#f59e0b20', color: '#f59e0b', border: '1px solid #f59e0b40' }}>
                    ✦ Flash
                  </span>
                </div>
                <p className="mt-2 text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Les classiques du Flash, ressuscités par Ruffle — l'émulateur Flash open-source en WebAssembly.
                </p>
              </div>
            </div>

            {/* Ruffle info banner */}
            <motion.div
              className="mt-6 flex items-start gap-4 p-4 rounded-2xl border"
              style={{ borderColor: '#f59e0b25', backgroundColor: '#f59e0b08' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: '#f59e0b20' }}>
                ⚡
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">Propulsé par Ruffle</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Adobe Flash Player est mort en 2021, mais ces jeux vivent à nouveau grâce à{' '}
                  <a href="https://ruffle.rs" target="_blank" rel="noopener noreferrer"
                    className="font-medium underline underline-offset-2"
                    style={{ color: '#f59e0b' }}>Ruffle.rs</a>
                  {' '}— un émulateur Flash écrit en Rust et compilé en WebAssembly.
                  Aucun plugin à installer. Ça tourne directement dans ton navigateur.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Neon separator */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #f59e0b40, transparent)' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {FLASH_GAMES.length} classiques
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, #f59e0b40, transparent)' }} />
          </div>

          {/* Flash game grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {FLASH_GAMES.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <FlashCard game={game} onClick={() => setActiveGame(game)} />
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            className="mt-16 pb-8 text-center text-xs"
            style={{ color: 'rgba(255,255,255,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Tous les jeux Flash sont la propriété de leurs créateurs respectifs.
            ArcadeWave ne redistribue que l'émulation via Ruffle.rs (licence Apache 2.0).
          </motion.p>
        </div>
      </div>
    </>
  )
}
