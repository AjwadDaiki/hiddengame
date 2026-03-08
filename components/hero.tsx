'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Game } from '@/data/games'

interface HeroProps {
  game: Game
  featuredGames?: Game[]
  featuredIndex?: number
  onSelectFeatured?: (i: number) => void
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden:   { opacity: 0, y: 22 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function StarRating({ rating, accent }: { rating: number; accent: string }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={s <= Math.round(rating) ? accent : 'rgba(255,255,255,0.1)'} />
        </svg>
      ))}
      <span className="text-sm font-black ml-1.5" style={{ color: accent }}>{rating}</span>
    </div>
  )
}

export default function Hero({ game, featuredGames = [], featuredIndex = 0, onSelectFeatured }: HeroProps) {
  const [imgError, setImgError] = useState<Record<string, boolean>>({})

  const hasThumb = !!game.thumbnailUrl && !imgError[game.id]

  return (
    <section className="relative w-full" style={{ height: '100vh', minHeight: '640px' }}>

      {/* ── BG: full-bleed game art or gradient ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={game.id + '-bg'}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {hasThumb ? (
            <img
              src={game.thumbnailUrl}
              alt={game.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(p => ({ ...p, [game.id]: true }))}
            />
          ) : (
            <div className="absolute inset-0 ken-burns" style={{
              background: `
                radial-gradient(ellipse 100% 70% at 75% 35%, ${game.accent}38 0%, transparent 55%),
                radial-gradient(ellipse 70% 90% at 15% 75%, ${game.gradientVia}50 0%, transparent 55%),
                radial-gradient(ellipse 50% 50% at 90% 90%, ${game.gradientTo}30 0%, transparent 50%),
                linear-gradient(155deg, ${game.gradientFrom} 0%, #080818 40%, #060610 100%)
              `,
            }}>
              {/* Geometric art unique per game */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <filter id={`hb-${game.id}`}><feGaussianBlur stdDeviation="45"/></filter>
                  <filter id={`hb2-${game.id}`}><feGaussianBlur stdDeviation="8"/></filter>
                </defs>
                {/* Large atmosphere blobs */}
                <circle cx="1050" cy="280" r="420" fill={game.accent} filter={`url(#hb-${game.id})`} opacity="0.45"/>
                <circle cx="250" cy="650" r="320" fill={game.gradientVia} filter={`url(#hb-${game.id})`} opacity="0.35"/>
                <circle cx="1300" cy="750" r="240" fill={game.gradientTo} filter={`url(#hb-${game.id})`} opacity="0.25"/>
                {/* Sharp geometric lines */}
                <polygon points="720,30 1430,870 10,870" fill="none" stroke={game.accent} strokeWidth="0.6" opacity="0.12"/>
                <circle cx="1050" cy="280" r="220" fill="none" stroke={game.accent} strokeWidth="0.5" opacity="0.2"/>
                <circle cx="1050" cy="280" r="360" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                {/* Accent cross/reticle at main light source */}
                <line x1="1050" y1="140" x2="1050" y2="200" stroke={game.accent} strokeWidth="1.5" opacity="0.4" filter={`url(#hb2-${game.id})`}/>
                <line x1="910" y1="280" x2="970" y2="280" stroke={game.accent} strokeWidth="1.5" opacity="0.4" filter={`url(#hb2-${game.id})`}/>
                <circle cx="1050" cy="280" r="8" fill={game.accent} opacity="0.5" filter={`url(#hb2-${game.id})`}/>
                {/* Corner brackets */}
                <path d="M30,40 L30,20 L50,20" fill="none" stroke={game.accent} strokeWidth="2" opacity="0.35"/>
                <path d="M1410,40 L1410,20 L1390,20" fill="none" stroke={game.accent} strokeWidth="2" opacity="0.35"/>
                <path d="M30,860 L30,880 L50,880" fill="none" stroke={game.accent} strokeWidth="2" opacity="0.2"/>
                <path d="M1410,860 L1410,880 L1390,880" fill="none" stroke={game.accent} strokeWidth="2" opacity="0.2"/>
              </svg>
            </div>
          )}

          {/* Color grade: left dark for readability, bottom black */}
          <div className="absolute inset-0" style={{
            background: `
              linear-gradient(to right, rgba(6,6,16,0.92) 0%, rgba(6,6,16,0.5) 40%, rgba(6,6,16,0.1) 65%, rgba(6,6,16,0.35) 100%),
              linear-gradient(to top, rgba(6,6,16,1) 0%, rgba(6,6,16,0.25) 30%, transparent 55%),
              linear-gradient(to bottom, rgba(6,6,16,0.6) 0%, transparent 15%)
            `,
          }}/>
        </motion.div>
      </AnimatePresence>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? '3px' : '2px', height: i % 3 === 0 ? '3px' : '2px',
              left: `${12 + (i * 41) % 76}%`, top: `${20 + (i * 57) % 60}%`,
              background: i % 2 === 0 ? game.accent : 'rgba(255,255,255,0.55)',
              boxShadow: i % 2 === 0 ? `0 0 5px ${game.accent}` : 'none',
            }}
            animate={{ y: [0, -(18 + (i % 4) * 10), 0], opacity: [0, 0.55, 0], scale: [0.4, 1, 0.4] }}
            transition={{ duration: 4.5 + (i % 5), repeat: Infinity, delay: (i * 0.45) % 5, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Grid */}
      <div className="absolute inset-0 hex-grid opacity-20 pointer-events-none"/>

      {/* ── Game info — bottom left ── */}
      <div className="absolute inset-0 flex items-end pointer-events-none"
        style={{ paddingLeft: 'clamp(2rem, 6vw, 5rem)', paddingRight: '2rem', paddingBottom: 'clamp(5rem, 8vh, 7rem)' }}>
        <AnimatePresence mode="wait">
          <motion.div key={game.id} variants={stagger} initial="hidden" animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="flex flex-col max-w-2xl pointer-events-auto w-full"
          >
            {/* Badges */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                style={{ color: game.accent, background: `${game.accent}18`, borderColor: `${game.accent}45` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: game.accent }}/>
                {game.genre}{game.subgenre && ` · ${game.subgenre}`}
              </span>
              {game.isNew && (
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Nouveau
                </span>
              )}
              {game.onlinePlayers && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-dot"/>
                  {game.onlinePlayers}
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1 variants={item} className="font-black leading-none mb-4"
              style={{ fontSize: 'clamp(52px, 7.5vw, 96px)', letterSpacing: '-0.04em', lineHeight: 0.9,
                textShadow: `0 0 60px ${game.accent}25, 0 2px 40px rgba(0,0,0,0.5)` }}>
              {game.title}
            </motion.h1>

            {/* Description */}
            <motion.p variants={item} className="mb-6 max-w-md"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>
              {game.description}
            </motion.p>

            {/* Progress bar */}
            {game.progress && (
              <motion.div variants={item} className="mb-5 max-w-xs">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Progression</span>
                  <span className="text-[9px] font-black" style={{ color: game.accent }}>{game.progress}%</span>
                </div>
                <div className="h-px rounded-full overflow-hidden bg-white/8">
                  <motion.div className="h-full rounded-full"
                    initial={{ width: 0 }} animate={{ width: `${game.progress}%` }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ background: `linear-gradient(90deg, ${game.gradientVia}, ${game.accent})`, boxShadow: `0 0 8px ${game.accent}` }}/>
                </div>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex items-center gap-3 mb-7">
              <Link href={`/play/${game.slug}`}>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-black text-white cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${game.accent}, ${game.gradientVia}cc)`,
                    boxShadow: `0 6px 28px ${game.accent}45, 0 0 0 1px ${game.accent}30`, fontSize: '14px' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  {game.progress ? 'Continuer' : 'Jouer maintenant'}
                </motion.div>
              </Link>
              <Link href={`/play/${game.slug}`}>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                  Détails
                </motion.div>
              </Link>
            </motion.div>

            {/* Console buttons */}
            <motion.div variants={item} className="flex items-center gap-5 mb-5">
              {[
                { bg: game.accent, label: 'Jouer',   symbol: '×', glow: true },
                { bg: '#ef4444',   label: 'Détails', symbol: '○', glow: false },
                { bg: '#ec4899',   label: 'Favori',  symbol: '□', glow: false },
              ].map((btn, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-white"
                    style={{ background: btn.bg, fontSize: '15px',
                      boxShadow: btn.glow ? `0 0 16px ${btn.bg}70` : `0 0 8px ${btn.bg}30` }}>
                    {btn.symbol}
                  </div>
                  <span className="text-xs font-semibold"
                    style={{ color: i === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)' }}>
                    {btn.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Meta */}
            <motion.div variants={item} className="flex items-center gap-6 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[
                { label: 'Note',     node: <StarRating rating={game.rating} accent={game.accent}/> },
                { label: 'Joueurs',  node: <span className="text-sm font-black text-white">{game.players}</span> },
                { label: 'Taille',   node: <span className="text-sm font-black text-white">{game.size}</span> },
              ].map(m => (
                <div key={m.label}>
                  <p className="text-[9px] font-black uppercase tracking-widest mb-1.5 text-white/25">{m.label}</p>
                  {m.node}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Carousel dots — right side, vertical ── */}
      {featuredGames.length > 1 && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5">
          {featuredGames.map((g, i) => (
            <button key={g.id} onClick={() => onSelectFeatured?.(i)}
              className="relative transition-all duration-300 rounded-full overflow-hidden"
              style={{
                width: '4px', height: featuredIndex === i ? '28px' : '4px',
                background: featuredIndex === i ? game.accent : 'rgba(255,255,255,0.22)',
                boxShadow: featuredIndex === i ? `0 0 10px ${game.accent}80` : 'none',
              }}
            />
          ))}
          <span className="text-[8px] font-black text-white/20 mt-1 tabular-nums">
            {featuredIndex + 1}/{featuredGames.length}
          </span>
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #060610)' }}/>
    </section>
  )
}
