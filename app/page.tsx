'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import AmbientBackground from '@/components/ambient-background'
import Topbar from '@/components/topbar'
import Hero from '@/components/hero'
import GameRow from '@/components/game-row'

import { FEATURED_GAME, TOP_GAMES, RECENT_GAMES, NEW_GAMES, FLASH_GAMES, Game } from '@/data/games'

const FEATURED_GAMES: Game[] = [FEATURED_GAME, TOP_GAMES[0], TOP_GAMES[1], TOP_GAMES[2]]
const CAROUSEL_MS = 6000

const NAV_ITEMS = [
  { label: 'Accueil',  href: '/',          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: 'Explorer', href: '/games',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
  { label: 'Top Jeux', href: '/top-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { label: 'Nostalgie', href: '/nostalgie', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 3 19 21 12 17 5 21 5 3"/></svg> },
  { label: 'Amis',     href: '#',          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
]

const CATEGORIES = ['Tous', 'Action', 'RPG', 'FPS', 'Stratégie', 'Sport', 'Puzzle', 'Simulation', 'Flash']

export default function Home() {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [hoveredGame, setHoveredGame]     = useState<Game | null>(null)
  const [activeNav, setActiveNav]         = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  const [heroHovered, setHeroHovered]     = useState(false)

  // Carousel — single clean interval
  useEffect(() => {
    if (heroHovered || hoveredGame) return
    const t = setInterval(() => setFeaturedIndex(i => (i + 1) % FEATURED_GAMES.length), CAROUSEL_MS)
    return () => clearInterval(t)
  }, [heroHovered, hoveredGame])

  const displayGame = hoveredGame ?? FEATURED_GAMES[featuredIndex]

  const handleGameHover    = useCallback((g: Game) => setHoveredGame(g), [])
  const handleGameHoverEnd = useCallback(() => setHoveredGame(null), [])

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#060610' }}>

      <AmbientBackground accentColor={displayGame.accent} accentDark={displayGame.gradientVia} />
      <Topbar accentColor={displayGame.accent} />

      <main className="relative z-10" style={{ paddingBottom: '72px' }}>

        {/* Hero */}
        <div onMouseEnter={() => setHeroHovered(true)} onMouseLeave={() => setHeroHovered(false)}>
          <Hero
            game={displayGame}
            featuredGames={FEATURED_GAMES}
            featuredIndex={featuredIndex}
            onSelectFeatured={setFeaturedIndex}
          />
        </div>

        <div className="space-y-2 pt-6">

          {/* Category tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar px-8 md:px-16"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {CATEGORIES.map((cat, i) => (
              <button key={cat} onClick={() => setActiveCategory(i)}
                className="relative flex-shrink-0 px-5 py-3 text-sm font-bold transition-colors duration-200"
                style={{ color: activeCategory === i ? 'white' : 'rgba(255,255,255,0.32)' }}
              >
                {cat}
                {activeCategory === i && (
                  <motion.div layoutId="cat-bar" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: displayGame.accent, boxShadow: `0 0 8px ${displayGame.accent}` }}
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}/>
                )}
              </button>
            ))}
          </div>

          {/* HUD stats */}
          <div className="flex items-center gap-3 px-8 md:px-16 py-3 overflow-x-auto no-scrollbar">
            {[
              { label: 'EN LIGNE',       value: '142K',         unit: 'joueurs', color: '#22c55e', dot: true  },
              { label: 'TOP DU MOMENT',  value: 'Oceania Wars', color: '#f97316' },
              { label: 'OBJECTIF JOUR',  value: '3 / 5',        color: '#06b6d4' },
              { label: 'MISE À JOUR',    value: 'Il y a 2h',    color: '#a855f7' },
            ].map((s, i) => (
              <motion.div key={s.label} className="flex items-center gap-2.5 px-3.5 py-2 flex-shrink-0"
                initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.03 }}
                style={{ background: 'rgba(255,255,255,0.028)', border: '1px solid rgba(255,255,255,0.055)', borderRadius: '10px' }}
              >
                {s.dot && <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot flex-shrink-0" style={{ background: s.color }}/>}
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest mb-0.5" style={{ color: s.color }}>{s.label}</p>
                  <p className="text-sm font-black text-white leading-none">
                    {s.value}{s.unit && <span className="text-xs text-white/30 ml-1">{s.unit}</span>}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Top games */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mx-4 md:mx-8 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.016)', border: `1px solid ${displayGame.accent}1e`, transition: 'border-color 1.2s' }}>
            <div style={{ height: '1.5px', background: `linear-gradient(to right, transparent 5%, ${displayGame.accent}70 50%, transparent 95%)`, boxShadow: `0 0 14px ${displayGame.accent}40`, transition: 'background 1.2s' }}/>
            <div className="flex items-center gap-2 px-8 md:px-16 pt-4 pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse-dot"/>
              <span className="text-[9px] font-black uppercase tracking-widest text-orange-400">Trending</span>
            </div>
            <GameRow title="Top Jeux" subtitle="Les plus joués en ce moment" games={TOP_GAMES} cardSize="lg"
              onGameHover={handleGameHover} onGameHoverEnd={handleGameHoverEnd} rowIndex={0}/>
          </motion.div>

          <GameRow title="Continuer à jouer" subtitle="Là où tu t'es arrêté" games={RECENT_GAMES} cardSize="md"
            onGameHover={handleGameHover} onGameHoverEnd={handleGameHoverEnd} rowIndex={1}/>

          <GameRow title="Nouveautés" subtitle="Vient de sortir cette semaine" games={NEW_GAMES} cardSize="md"
            onGameHover={handleGameHover} onGameHoverEnd={handleGameHoverEnd} rowIndex={2}/>

          <GameRow title="Recommandés pour toi" subtitle="Basé sur tes habitudes" games={[...TOP_GAMES].reverse()} cardSize="sm"
            onGameHover={handleGameHover} onGameHoverEnd={handleGameHoverEnd} rowIndex={3}/>

          {/* Flash */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mx-4 md:mx-8 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.016)', border: '1px solid #f59e0b1e' }}>
            <div style={{ height: '1.5px', background: 'linear-gradient(to right, transparent 5%, #f59e0b70 50%, transparent 95%)', boxShadow: '0 0 14px #f59e0b40' }}/>
            <div className="flex items-center justify-between px-8 md:px-16 pt-4 pb-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">✦ Flash Classics</span>
              <Link href="/nostalgie"><span className="text-[11px] font-bold text-amber-400/50 hover:text-amber-400 transition-colors">Voir tout →</span></Link>
            </div>
            <GameRow title="Nostalgie Flash" subtitle="Les classiques des années 2000 ressuscités par Ruffle"
              games={FLASH_GAMES.slice(0, 6)} cardSize="md"
              onGameHover={handleGameHover} onGameHoverEnd={handleGameHoverEnd} rowIndex={4}/>
          </motion.div>

          <div className="flex justify-center pt-6 pb-4">
            <Link href="/games">
              <motion.div className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm border"
                style={{ borderColor: 'rgba(168,85,247,0.28)', color: '#a855f7', backgroundColor: 'rgba(168,85,247,0.06)' }}
                whileHover={{ backgroundColor: 'rgba(168,85,247,0.14)', borderColor: 'rgba(168,85,247,0.5)', scale: 1.02 }}
                whileTap={{ scale: 0.97 }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
                </svg>
                Explorer tout le catalogue
              </motion.div>
            </Link>
          </div>

        </div>
      </main>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50"
        style={{ background: 'rgba(6,6,16,0.95)', backdropFilter: 'blur(28px)', borderTop: '1px solid rgba(255,255,255,0.065)' }}>
        <div style={{
          height: '1px',
          background: `linear-gradient(to right, transparent 10%, ${displayGame.accent}50 50%, transparent 90%)`,
          boxShadow: `0 0 8px ${displayGame.accent}30`,
          transition: 'background 1.2s',
        }}/>
        <div className="flex items-stretch justify-around max-w-2xl mx-auto">
          {NAV_ITEMS.map((nav, i) => {
            const active = activeNav === i
            return (
              <Link key={nav.label} href={nav.href} onClick={() => setActiveNav(i)} className="flex-1">
                <motion.div className="flex flex-col items-center justify-center gap-1 py-3 relative"
                  whileHover={{ y: -2 }} whileTap={{ scale: 0.92 }}>
                  {active && (
                    <motion.div layoutId="nav-dot" className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{ background: displayGame.accent, boxShadow: `0 0 8px ${displayGame.accent}` }}
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}/>
                  )}
                  <div className="w-5 h-5" style={{ color: active ? displayGame.accent : 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }}>
                    {nav.icon}
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: active ? 'white' : 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }}>
                    {nav.label}
                  </span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}
