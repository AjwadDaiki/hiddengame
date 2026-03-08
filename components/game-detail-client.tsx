'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Game } from '@/data/games'
import GameCard from './game-card'
import PageNav from './page-nav'

interface Props {
  game: Game
  relatedGames: Game[]
}

// ─── Back button ──────────────────────────────────────────────────────────────
function BackButton() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 group">
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors"
        style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
        whileHover={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff', x: -2 }}
        transition={{ duration: 0.15 }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Retour
      </motion.div>
    </Link>
  )
}

// ─── Tag pill ─────────────────────────────────────────────────────────────────
function TagPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium border"
      style={{
        borderColor: accent + '30',
        backgroundColor: accent + '12',
        color: accent,
      }}
    >
      {label}
    </span>
  )
}

// ─── Stat block ───────────────────────────────────────────────────────────────
function StatBlock({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: accent }}>{value}</span>
    </div>
  )
}

// ─── Game iframe player ───────────────────────────────────────────────────────
function GamePlayer({ game, onExit }: { game: Game; onExit: () => void }) {
  const isFlash = game.isFlash
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Load Ruffle for Flash games
    if (isFlash && typeof window !== 'undefined') {
      const existing = document.querySelector('script[data-ruffle]')
      if (!existing) {
        const s = document.createElement('script')
        s.src = 'https://unpkg.com/@ruffle-rs/ruffle'
        s.setAttribute('data-ruffle', '1')
        document.head.appendChild(s)
      }
    }
  }, [isFlash])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: '#07070f' }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(7,7,15,0.95)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-6 rounded-full"
            style={{ backgroundColor: game.accent, boxShadow: `0 0 12px ${game.accent}` }}
          />
          <span className="font-bold text-white">{game.title}</span>
          {isFlash && (
            <span className="px-2 py-0.5 text-xs rounded-full border" style={{ borderColor: game.accent + '40', color: game.accent, backgroundColor: game.accent + '15' }}>
              Flash ✦ Ruffle
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
            style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
            whileHover={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Quitter
          </motion.button>
        </div>
      </div>

      {/* Game frame */}
      <div className="flex-1 relative">
        {isFlash ? (
          // Ruffle renders a <ruffle-player> into a div
          <div
            id="ruffle-container"
            className="w-full h-full"
            ref={el => {
              if (!el || !game.embedUrl) return
              const ruffle = (window as any).RufflePlayer?.newest()
              if (!ruffle) return
              el.innerHTML = ''
              const player = ruffle.createPlayer()
              player.style.width = '100%'
              player.style.height = '100%'
              player.load(game.embedUrl)
              el.appendChild(player)
            }}
          />
        ) : (
          <iframe
            ref={iframeRef}
            src={game.embedUrl}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; microphone; gamepad"
            title={game.title}
          />
        )}

        {/* How to play overlay — shows briefly then hides */}
        {game.howToPlay && <HowToPlayOverlay howToPlay={game.howToPlay} accent={game.accent} />}
      </div>
    </motion.div>
  )
}

function HowToPlayOverlay({ howToPlay, accent }: { howToPlay: string; accent: string }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 6000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-start gap-3 px-5 py-3 rounded-2xl max-w-sm"
          style={{ backgroundColor: 'rgba(7,7,15,0.92)', border: `1px solid ${accent}30`, backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: accent }}>Comment jouer</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{howToPlay}</p>
          </div>
          <button onClick={() => setVisible(false)} className="shrink-0 opacity-40 hover:opacity-100 transition-opacity mt-0.5">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Artwork card with 3D tilt ────────────────────────────────────────────────
function ArtCard({ game }: { game: Game }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [12, -12]), { stiffness: 80, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), { stiffness: 80, damping: 20 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <div className="flex justify-center lg:justify-end" style={{ perspective: '1000px' }}>
      <motion.div
        ref={cardRef}
        className="relative w-64 h-80 rounded-3xl overflow-hidden cursor-pointer select-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: `linear-gradient(135deg, ${game.gradientFrom}, ${game.gradientVia}, ${game.gradientTo})`,
          boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${game.accent}30, 0 0 80px ${game.accent}20`,
        }}
        onMouseMove={handleMouse}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Shine layer */}
        <div className="card-shine absolute inset-0" />

        {/* Abstract SVG art */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 256 320" fill="none">
          <circle cx="128" cy="120" r="90" fill={game.accent} style={{ filter: 'blur(40px)' }} />
          <circle cx="200" cy="240" r="60" fill={game.gradientTo} style={{ filter: 'blur(30px)' }} />
          <circle cx="40" cy="200" r="50" fill={game.gradientFrom} style={{ filter: 'blur(25px)' }} />
          <polygon points="128,40 220,160 36,160" stroke={game.accent} strokeWidth="1.5" opacity="0.4" />
          <line x1="0" y1="320" x2="256" y2="0" stroke={game.accent} strokeWidth="0.5" opacity="0.3" />
          <line x1="256" y1="320" x2="0" y2="0" stroke={game.accent} strokeWidth="0.5" opacity="0.3" />
          <circle cx="128" cy="160" r="60" stroke={game.accent} strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
        </svg>

        {/* Game info overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
          <p className="font-black text-white text-xl leading-tight">{game.title}</p>
          <p className="text-xs mt-1 font-medium" style={{ color: game.accent }}>{game.genre}</p>
        </div>

        {/* Neon corner accents */}
        <svg className="absolute top-3 left-3" width="20" height="20" fill="none">
          <path d="M0 20 L0 0 L20 0" stroke={game.accent} strokeWidth="2" opacity="0.8" />
        </svg>
        <svg className="absolute top-3 right-3" width="20" height="20" fill="none">
          <path d="M0 0 L20 0 L20 20" stroke={game.accent} strokeWidth="2" opacity="0.8" />
        </svg>
        <svg className="absolute bottom-3 left-3" width="20" height="20" fill="none">
          <path d="M0 0 L0 20 L20 20" stroke={game.accent} strokeWidth="2" opacity="0.8" />
        </svg>
        <svg className="absolute bottom-3 right-3" width="20" height="20" fill="none">
          <path d="M20 0 L20 20 L0 20" stroke={game.accent} strokeWidth="2" opacity="0.8" />
        </svg>

        {/* Ground glow */}
        <div
          className="absolute -bottom-8 inset-x-8 h-8 rounded-full blur-2xl"
          style={{ backgroundColor: game.accent, opacity: 0.35 }}
        />
      </motion.div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GameDetailClient({ game, relatedGames }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Neon glow on accent color
  const neonGlow = `0 0 30px ${game.accent}60, 0 0 60px ${game.accent}30`

  return (
    <>
      {/* Game player overlay */}
      <AnimatePresence>
        {isPlaying && (
          <GamePlayer game={game} onExit={() => setIsPlaying(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen" style={{ backgroundColor: '#07070f' }}>
        <PageNav />
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full"
            style={{ background: game.accent, filter: 'blur(180px)', opacity: 0.07 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
            style={{ background: game.gradientVia, filter: 'blur(150px)', opacity: 0.05 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <div className="dot-grid absolute inset-0 opacity-30" />
        </div>

        {/* Neon top line */}
        <div
          className="relative z-10 h-[2px] w-full"
          style={{ background: `linear-gradient(to right, transparent, ${game.accent}, transparent)`, boxShadow: neonGlow }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BackButton />
          </motion.div>

          {/* Hero section */}
          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — game info */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider"
                  style={{ backgroundColor: game.accent + '22', color: game.accent, border: `1px solid ${game.accent}40` }}>
                  {game.genre}
                </span>
                {game.subgenre && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full border"
                    style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}>
                    {game.subgenre}
                  </span>
                )}
                {game.isNew && (
                  <span className="px-3 py-1 text-xs font-bold rounded-full animate-pulse-dot"
                    style={{ backgroundColor: '#10b98120', color: '#10b981', border: '1px solid #10b98140' }}>
                    NOUVEAU
                  </span>
                )}
                {game.isFlash && (
                  <span className="px-3 py-1 text-xs font-bold rounded-full"
                    style={{ backgroundColor: '#f59e0b20', color: '#f59e0b', border: '1px solid #f59e0b40' }}>
                    ✦ Flash Classic
                  </span>
                )}
              </div>

              {/* Title */}
              <div>
                <h1
                  className="text-5xl lg:text-6xl font-black text-white leading-none tracking-tight"
                  style={{ textShadow: `0 0 60px ${game.accent}30` }}
                >
                  {game.title}
                </h1>
                {/* Neon accent line */}
                <motion.div
                  className="mt-3 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(to right, ${game.accent}, transparent)`, boxShadow: `0 0 20px ${game.accent}80` }}
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {game.description}
              </p>

              {/* Stars */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24"
                    fill={i <= Math.round(game.rating) ? game.accent : 'rgba(255,255,255,0.15)'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="ml-2 font-bold text-white">{game.rating}</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>({game.ratingCount} avis)</span>
              </div>

              {/* Stats grid */}
              <div
                className="grid grid-cols-3 gap-4 p-4 rounded-2xl border"
                style={{ borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <StatBlock label="Joueurs" value={game.players} accent={game.accent} />
                <StatBlock label="Taille" value={game.size} accent={game.accent} />
                {game.onlinePlayers
                  ? <StatBlock label="En ligne" value={game.onlinePlayers} accent={game.accent} />
                  : <StatBlock label="Playtime" value={game.playtime ?? '—'} accent={game.accent} />
                }
              </div>

              {/* Tags */}
              {game.tags && (
                <div className="flex flex-wrap gap-2">
                  {game.tags.map(tag => <TagPill key={tag} label={tag} accent={game.accent} />)}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {/* Primary play button */}
                <motion.button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${game.accent}, ${game.gradientTo})`,
                    color: '#fff',
                    boxShadow: `0 8px 40px ${game.accent}50`,
                  }}
                  whileHover={{ scale: 1.03, boxShadow: `0 12px 60px ${game.accent}70` }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="absolute inset-0 card-shine" />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="relative z-10">▶  Jouer maintenant</span>
                </motion.button>

                {/* Favorite */}
                <motion.button
                  className="flex items-center gap-2 px-5 py-4 rounded-2xl font-medium text-sm border"
                  style={{ borderColor: game.accent + '35', color: game.accent, backgroundColor: game.accent + '10' }}
                  whileHover={{ backgroundColor: game.accent + '22', borderColor: game.accent + '60' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  ▲ Favori
                </motion.button>

                {/* Share */}
                <motion.button
                  className="flex items-center gap-2 px-5 py-4 rounded-2xl font-medium text-sm border"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                  whileHover={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  Partager
                </motion.button>
              </div>

              {/* Console button hints */}
              <div className="flex items-center gap-4 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  <span className="font-bold" style={{ color: game.accent }}>▶</span> Jouer &nbsp;
                  <span className="font-bold" style={{ color: '#ec4899' }}>▲</span> Favori &nbsp;
                  <span className="font-bold" style={{ color: '#3b82f6' }}>■</span> Partager
                </span>
              </div>
            </motion.div>

            {/* Right — artwork card */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArtCard game={game} />
            </motion.div>
          </div>

          {/* How to play section */}
          {game.howToPlay && (
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: game.accent, boxShadow: `0 0 10px ${game.accent}` }} />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">Comment jouer</h2>
              </div>
              <div
                className="p-5 rounded-2xl border text-sm leading-relaxed"
                style={{
                  borderColor: game.accent + '25',
                  backgroundColor: game.accent + '08',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                {game.howToPlay}
              </div>
            </motion.section>
          )}

          {/* Related games */}
          {relatedGames.length > 0 && (
            <motion.section
              className="mt-16 pb-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: game.accent, boxShadow: `0 0 10px ${game.accent}` }} />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">Jeux similaires</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {relatedGames.map((related, i) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                  >
                    <Link href={`/play/${related.slug}`}>
                      <GameCard game={related} size="sm" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </>
  )
}

