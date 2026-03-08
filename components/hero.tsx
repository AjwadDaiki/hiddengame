'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Game } from '@/data/games'

interface HeroProps {
  game: Game
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// Console-style button prompts
const BUTTONS = [
  { color: '#22c55e', label: 'Jouer', symbol: '▶' },
  { color: '#3b82f6', label: 'Details', symbol: '■' },
  { color: '#ec4899', label: 'Favori', symbol: '▲' },
]

function ConsoleButtons({ accent }: { accent: string }) {
  return (
    <div className="flex items-center gap-5">
      {BUTTONS.map((btn, i) => (
        <div key={btn.label} className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2"
            style={{
              borderColor: i === 0 ? accent : 'rgba(255,255,255,0.2)',
              color: i === 0 ? accent : 'rgba(255,255,255,0.3)',
              boxShadow: i === 0 ? `0 0 12px ${accent}60` : 'none',
            }}
          >
            {btn.symbol}
          </div>
          <span
            className="text-xs font-bold"
            style={{ color: i === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }}
          >
            {btn.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-3 h-3" viewBox="0 0 24 24">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={s <= Math.round(rating) ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
          />
        </svg>
      ))}
      <span className="text-xs font-bold text-white/40 ml-1">{rating}</span>
    </div>
  )
}

export default function Hero({ game }: HeroProps) {
  const artRef = useRef<HTMLDivElement>(null)
  const [isHoveringArt, setIsHoveringArt] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14])
  const rotateX = useTransform(springY, [-0.5, 0.5], [9, -9])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = artRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mouseX.set(0); mouseY.set(0); setIsHoveringArt(false) }

  return (
    <section className="relative w-full min-h-screen flex items-end pb-20 overflow-hidden">

      {/* Dynamic background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={game.id + '-bg'}
          className="absolute inset-0 hex-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            background: `
              radial-gradient(ellipse 65% 85% at 78% 45%, ${game.accent}22 0%, transparent 60%),
              radial-gradient(ellipse 45% 60% at 15% 75%, ${game.gradientVia}44 0%, transparent 55%),
              radial-gradient(ellipse 30% 40% at 50% 10%, ${game.accent}0d 0%, transparent 50%),
              linear-gradient(165deg, ${game.gradientFrom} 0%, #0b0b18 45%, #07070f 100%)
            `,
          }}
        />
      </AnimatePresence>

      {/* Neon vignette edges */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(7,7,15,0.8) 0%, transparent 20%, transparent 80%, rgba(7,7,15,0.6) 100%)',
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #07070f)' }}
      />

      {/* Content — left padding clears the 64px side nav */}
      <div className="relative z-10 w-full flex items-center justify-between gap-12 pt-20"
        style={{ paddingLeft: 'max(88px, calc(64px + 2rem))', paddingRight: '4rem' }}
      >
        {/* LEFT — game info */}
        <div className="flex-1 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={game.id}
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            >
              {/* Genre + New badges */}
              <motion.div variants={item} className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border"
                  style={{ color: game.accent, background: `${game.accent}14`, borderColor: `${game.accent}35` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: game.accent }} />
                  {game.genre}{game.subgenre && ` · ${game.subgenre}`}
                </span>
                {game.isNew && (
                  <span className="px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    Nouveau
                  </span>
                )}
              </motion.div>

              {/* Neon accent line */}
              <motion.div
                variants={item}
                className="mb-5"
                style={{ '--neon-color': game.accent } as React.CSSProperties}
              >
                <div className="neon-line animate-neon-pulse" style={{ width: '80px' }} />
              </motion.div>

              {/* TITLE — big, with neon text glow */}
              <motion.h1
                variants={item}
                className="font-black leading-none mb-6"
                style={{
                  fontSize: 'clamp(52px, 7vw, 88px)',
                  letterSpacing: '-0.04em',
                  textShadow: `0 0 60px ${game.accent}25, 0 0 120px ${game.accent}10`,
                  lineHeight: 0.95,
                }}
              >
                {game.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={item}
                className="text-sm leading-relaxed mb-8 max-w-md"
                style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}
              >
                {game.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={item} className="flex items-center gap-3 mb-8">
                <Link href={`/play/${game.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className="flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold text-sm text-white tracking-wide cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${game.accent}dd, ${game.gradientVia}cc)`,
                      boxShadow: `0 6px 30px ${game.accent}45, 0 0 0 1px ${game.accent}30`,
                    }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    {game.progress ? 'Continuer' : 'Jouer maintenant'}
                  </motion.div>
                </Link>

                <Link href={`/play/${game.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className="flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-sm tracking-wide cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      color: 'rgba(255,255,255,0.65)',
                    }}
                  >
                    Details
                  </motion.div>
                </Link>
              </motion.div>

              {/* Progress bar */}
              {game.progress && (
                <motion.div variants={item} className="mb-7">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Progression</span>
                    <span className="text-[10px] font-black" style={{ color: game.accent }}>{game.progress}%</span>
                  </div>
                  <div className="h-0.5 bg-white/08 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${game.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{
                        background: `linear-gradient(90deg, ${game.gradientVia}, ${game.accent})`,
                        boxShadow: `0 0 8px ${game.accent}80`,
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Console button hints */}
              <motion.div variants={item} className="mb-8">
                <ConsoleButtons accent={game.accent} />
              </motion.div>

              {/* Meta divider */}
              <motion.div
                variants={item}
                className="flex items-center gap-6 pt-5"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                {[
                  { label: 'Note', content: <StarRating rating={game.rating} /> },
                  { label: 'Joueurs', content: <span className="text-sm font-bold">{game.players}</span> },
                  ...(game.playtime ? [{ label: 'Temps joue', content: <span className="text-sm font-bold">{game.playtime}</span> }] : []),
                  { label: 'Taille', content: <span className="text-sm font-bold">{game.size}</span> },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/25 mb-1">{m.label}</p>
                    {m.content}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — 3D floating artwork */}
        <div className="hidden lg:flex flex-col items-center flex-shrink-0">
          <motion.div
            ref={artRef}
            onMouseMove={onMove}
            onMouseEnter={() => setIsHoveringArt(true)}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
            className="cursor-pointer select-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={game.id + '-art'}
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.2 } }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="float-art"
              >
                <div
                  className="relative overflow-hidden card-shine"
                  style={{
                    width: '260px',
                    height: '420px',
                    borderRadius: '24px',
                    background: `linear-gradient(145deg, ${game.gradientFrom}, ${game.gradientVia}, ${game.gradientTo})`,
                    boxShadow: `
                      0 50px 120px rgba(0,0,0,0.7),
                      0 0 0 1px rgba(255,255,255,0.08),
                      0 0 80px ${game.accent}30,
                      0 0 160px ${game.accent}12,
                      inset 0 1px 0 rgba(255,255,255,0.12)
                    `,
                  }}
                >
                  {/* Abstract SVG art */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 420" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <filter id={`f-${game.id}`}><feGaussianBlur stdDeviation="14"/></filter>
                      <filter id={`f2-${game.id}`}><feGaussianBlur stdDeviation="4"/></filter>
                    </defs>
                    {/* Soft blobs */}
                    <circle cx="130" cy="150" r="120" fill={game.accent} filter={`url(#f-${game.id})`} opacity="0.45"/>
                    <circle cx="220" cy="320" r="90" fill={game.gradientVia} filter={`url(#f-${game.id})`} opacity="0.3"/>
                    <circle cx="40" cy="360" r="70" fill={game.gradientTo} filter={`url(#f-${game.id})`} opacity="0.2"/>
                    {/* Geometric lines */}
                    <polygon points="130,24 248,340 12,340" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                    <circle cx="130" cy="210" r="105" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                    <rect x="65" y="110" width="130" height="130" rx="18" fill="none"
                      stroke={game.accent} strokeWidth="0.5" opacity="0.3"
                      transform="rotate(20 130 175)"
                    />
                    {/* Neon corner accents */}
                    <line x1="12" y1="12" x2="48" y2="12" stroke={game.accent} strokeWidth="1.5" opacity="0.6" filter={`url(#f2-${game.id})`}/>
                    <line x1="12" y1="12" x2="12" y2="48" stroke={game.accent} strokeWidth="1.5" opacity="0.6" filter={`url(#f2-${game.id})`}/>
                    <line x1="248" y1="408" x2="212" y2="408" stroke={game.accent} strokeWidth="1.5" opacity="0.6" filter={`url(#f2-${game.id})`}/>
                    <line x1="248" y1="408" x2="248" y2="372" stroke={game.accent} strokeWidth="1.5" opacity="0.6" filter={`url(#f2-${game.id})`}/>
                  </svg>

                  {/* Rotating ring decoration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin-slow opacity-8" width="200" height="200" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" fill="none" stroke={game.accent} strokeWidth="0.5"
                        strokeDasharray="12 8" opacity="0.2"/>
                    </svg>
                  </div>

                  {/* Big letter watermark */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <span className="font-black select-none" style={{
                      fontSize: '180px', lineHeight: 1,
                      color: 'rgba(255,255,255,0.035)',
                      letterSpacing: '-0.06em',
                    }}>
                      {game.title.charAt(0)}
                    </span>
                  </div>

                  {/* Bottom gradient + info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-1 rounded-full animate-pulse-dot" style={{ background: game.accent }} />
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: game.accent }}>
                        {game.genre}
                      </span>
                    </div>
                    <p className="text-lg font-black text-white leading-tight">{game.title}</p>
                  </div>

                  {/* Hover gloss */}
                  {isHoveringArt && (
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }}
                    />
                  )}
                </div>

                {/* Ground glow reflection */}
                <div className="mt-5 mx-auto rounded-full"
                  style={{
                    width: '55%', height: '14px',
                    background: `radial-gradient(ellipse, ${game.accent}50 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-25 pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Decouvrir</span>
        <svg className="w-4 h-4 text-white animate-bounce-y" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  )
}
