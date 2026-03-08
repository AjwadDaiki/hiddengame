'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import AmbientBackground from '@/components/ambient-background'
import Topbar from '@/components/topbar'
import Hero from '@/components/hero'
import GameRow from '@/components/game-row'

import {
  FEATURED_GAME,
  TOP_GAMES,
  RECENT_GAMES,
  NEW_GAMES,
  FLASH_GAMES,
  Game,
} from '@/data/games'

const CATEGORIES = ['Tous', 'Action', 'RPG', 'FPS', 'Strategie', 'Sport', 'Horreur', 'Aventure', 'Simulation']

const SIDE_NAV = [
  {
    label: 'Accueil',
    href: '/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Explorer',
    href: '/games',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    label: 'Nostalgie',
    href: '/nostalgie',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 3 19 21 12 17 5 21 5 3"/>
      </svg>
    ),
  },
  {
    label: 'Top Jeux',
    href: '/games',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/>
        <path d="M7 4h10l1 7H6L7 4z"/><path d="M5 4a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h1"/><path d="M19 4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"/>
      </svg>
    ),
  },
  {
    label: 'Amis',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Parametres',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93A10 10 0 1 0 4.93 19.07M19.07 4.93L4.93 19.07"/>
      </svg>
    ),
  },
]

export default function Home() {
  const [activeGame, setActiveGame] = useState<Game>(FEATURED_GAME)
  const [activeNav, setActiveNav] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredGame, setHoveredGame] = useState<Game | null>(null)
  const [sideExpanded, setSideExpanded] = useState(false)

  const displayGame = hoveredGame ?? activeGame

  const handleGameHover = useCallback((game: Game) => {
    setHoveredGame(game)
  }, [])

  const handleGameHoverEnd = useCallback(() => {
    setHoveredGame(null)
  }, [])

  const handleGameClick = useCallback((game: Game) => {
    setActiveGame(game)
  }, [])

  // Keyboard shortcut for side nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        setSideExpanded((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#07070f] overflow-x-hidden">
      {/* Ambient background */}
      <AmbientBackground
        accentColor={displayGame.accent}
        accentDark={displayGame.gradientVia}
      />

      {/* Side navigation — console rail */}
      <motion.nav
        animate={{ width: sideExpanded ? 196 : 60 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        onMouseEnter={() => setSideExpanded(true)}
        onMouseLeave={() => setSideExpanded(false)}
        className="fixed left-0 top-1/2 z-40 overflow-hidden"
        style={{
          transform: 'translateY(-50%)',
          borderRadius: '0 18px 18px 0',
          background: 'rgba(10,10,20,0.85)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Top neon accent line */}
        <div style={{
          height: '1px',
          background: `linear-gradient(to right, ${displayGame.accent}80, transparent)`,
          boxShadow: `0 0 8px ${displayGame.accent}50`,
          transition: 'background 1.2s ease',
        }} />

        <div className="flex flex-col py-4 gap-1">
          {SIDE_NAV.map((navItem, i) => (
            <Link key={navItem.label} href={navItem.href} onClick={() => setActiveNav(i)}>
              <div
                className="relative flex items-center h-11 gap-3.5 transition-all duration-200"
                style={{
                  padding: '0 16px',
                  color: activeNav === i ? 'white' : 'rgba(255,255,255,0.3)',
                  background: activeNav === i
                    ? `linear-gradient(to right, ${displayGame.accent}18, transparent)`
                    : 'transparent',
                }}
              >
                {/* Active left bar with neon glow */}
                {activeNav === i && (
                  <motion.div
                    layoutId="sidenav-bar"
                    className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full"
                    style={{
                      background: displayGame.accent,
                      boxShadow: `0 0 10px ${displayGame.accent}, 0 0 20px ${displayGame.accent}60`,
                    }}
                  />
                )}
                <div
                  className="w-[18px] h-[18px] flex-shrink-0"
                  style={{ color: activeNav === i ? displayGame.accent : 'inherit', transition: 'color 0.3s' }}
                >
                  {navItem.icon}
                </div>
                <motion.span
                  animate={{ opacity: sideExpanded ? 1 : 0, x: sideExpanded ? 0 : -4 }}
                  transition={{ duration: 0.18 }}
                  className="text-[13px] font-semibold whitespace-nowrap"
                >
                  {navItem.label}
                </motion.span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom neon accent line */}
        <div style={{
          height: '1px',
          background: `linear-gradient(to right, ${displayGame.accent}40, transparent)`,
          transition: 'background 1.2s ease',
        }} />
      </motion.nav>

      {/* Topbar */}
      <Topbar />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero section */}
        <Hero game={displayGame} />

        {/* Content section */}
        <div className="pb-28 space-y-4">

          {/* Neon section separator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 px-8 md:px-16 py-2"
          >
            <div className="flex-1 h-px" style={{
              background: `linear-gradient(to right, transparent, ${displayGame.accent}50, transparent)`,
              boxShadow: `0 0 6px ${displayGame.accent}30`,
              transition: 'background 1.2s ease, box-shadow 1.2s ease',
            }} />
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: displayGame.accent, opacity: 0.6 }}>
              ◆ ◆ ◆
            </span>
            <div className="flex-1 h-px" style={{
              background: `linear-gradient(to left, transparent, ${displayGame.accent}50, transparent)`,
              boxShadow: `0 0 6px ${displayGame.accent}30`,
              transition: 'background 1.2s ease, box-shadow 1.2s ease',
            }} />
          </motion.div>

          {/* Quick stats bar — console HUD style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 px-8 md:px-16 overflow-x-auto no-scrollbar"
          >
            {[
              { label: 'EN LIGNE', value: '142K', unit: 'joueurs', color: '#22c55e', dot: true },
              { label: 'TOP DU MOMENT', value: 'Oceania Wars', color: '#f97316' },
              { label: 'CLASSEMENT', value: '#8 247', color: '#f59e0b' },
              { label: 'OBJECTIF JOUR', value: '3 / 5', color: '#06b6d4' },
              { label: 'MISE A JOUR', value: 'Il y a 2h', color: '#a855f7' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 px-4 py-2.5 flex-shrink-0 cursor-pointer group"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                  borderRadius: '14px',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                whileHover={{ scale: 1.03 }}
              >
                {stat.dot && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse-dot" style={{ background: stat.color }} />
                )}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: stat.color }}>
                    {stat.label}
                  </p>
                  <p className="text-sm font-black text-white leading-none">
                    {stat.value}
                    {stat.unit && <span className="text-xs font-semibold text-white/40 ml-1">{stat.unit}</span>}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Category filter — neon pill style */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-2 px-8 md:px-16 overflow-x-auto no-scrollbar pb-1"
          >
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(i)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 px-4 py-2 text-[12px] font-bold tracking-wide transition-all duration-200"
                style={
                  activeCategory === i
                    ? {
                        background: `linear-gradient(135deg, ${displayGame.accent}cc, ${displayGame.gradientVia}aa)`,
                        color: 'white',
                        borderRadius: '10px',
                        boxShadow: `0 4px 20px ${displayGame.accent}40, 0 0 0 1px ${displayGame.accent}40`,
                        transition: 'all 0.3s ease',
                      }
                    : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.4)',
                        borderRadius: '10px',
                      }
                }
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* TOP GAMES ROW — hero section with neon border */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-4 rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.012)',
              border: `1px solid ${displayGame.accent}25`,
              boxShadow: `0 0 40px ${displayGame.accent}08, inset 0 1px 0 rgba(255,255,255,0.05)`,
              transition: 'border-color 1.2s ease, box-shadow 1.2s ease',
            }}
          >
            {/* Top glow bar */}
            <div style={{
              height: '2px',
              background: `linear-gradient(to right, transparent 10%, ${displayGame.accent}70 50%, transparent 90%)`,
              boxShadow: `0 0 12px ${displayGame.accent}60`,
              transition: 'background 1.2s ease',
            }} />

            <div className="flex items-center gap-3 px-10 pt-5 pb-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse-dot" />
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Trending</span>
              </div>
            </div>
            <GameRow
              title="Top Jeux"
              subtitle="Les plus joues en ce moment"
              games={TOP_GAMES}
              cardSize="lg"
              onGameHover={handleGameHover}
              onGameHoverEnd={handleGameHoverEnd}
              onGameClick={handleGameClick}
              rowIndex={0}
            />
          </motion.div>

          {/* Continue playing */}
          <GameRow
            title="Continuer a jouer"
            subtitle="La ou tu t'es arrete"
            games={RECENT_GAMES}
            cardSize="md"
            onGameHover={handleGameHover}
            onGameHoverEnd={handleGameHoverEnd}
            onGameClick={handleGameClick}
            rowIndex={1}
          />

          {/* New arrivals */}
          <GameRow
            title="Nouveautes"
            subtitle="Vient de sortir cette semaine"
            games={NEW_GAMES}
            cardSize="md"
            onGameHover={handleGameHover}
            onGameHoverEnd={handleGameHoverEnd}
            onGameClick={handleGameClick}
            rowIndex={2}
          />

          {/* Recommended - mix */}
          <GameRow
            title="Recommandes pour toi"
            subtitle="Base sur tes habitudes de jeu"
            games={[...TOP_GAMES].reverse()}
            cardSize="sm"
            onGameHover={handleGameHover}
            onGameHoverEnd={handleGameHoverEnd}
            onGameClick={handleGameClick}
            rowIndex={3}
          />

          {/* Flash Nostalgie row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-4 rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.012)',
              border: '1px solid #f59e0b25',
              boxShadow: '0 0 40px #f59e0b08, inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ height: '2px', background: 'linear-gradient(to right, transparent 10%, #f59e0b70 50%, transparent 90%)', boxShadow: '0 0 12px #f59e0b60' }} />
            <div className="flex items-center justify-between px-10 pt-5 pb-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">✦ Flash Classics</span>
              </div>
              <Link href="/nostalgie">
                <span className="text-[11px] font-bold text-amber-400/60 hover:text-amber-400 transition-colors">
                  Voir tout →
                </span>
              </Link>
            </div>
            <GameRow
              title="Nostalgie Flash"
              subtitle="Les classiques des annees 2000, ressuscites par Ruffle"
              games={FLASH_GAMES.slice(0, 6)}
              cardSize="md"
              onGameHover={handleGameHover}
              onGameHoverEnd={handleGameHoverEnd}
              onGameClick={handleGameClick}
              rowIndex={4}
            />
          </motion.div>

          {/* All games CTA */}
          <motion.div
            className="flex justify-center pt-4 pb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/games">
              <motion.div
                className="flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold text-sm border"
                style={{ borderColor: 'rgba(168,85,247,0.35)', color: '#a855f7', backgroundColor: 'rgba(168,85,247,0.08)' }}
                whileHover={{ backgroundColor: 'rgba(168,85,247,0.18)', borderColor: 'rgba(168,85,247,0.6)', scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
                </svg>
                Explorer tout le catalogue — {(TOP_GAMES.length + RECENT_GAMES.length + NEW_GAMES.length + FLASH_GAMES.length)} jeux
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Bottom keyboard hints bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-end gap-6 px-8 py-3"
        style={{
          background: 'linear-gradient(to top, rgba(7,7,15,0.9) 0%, transparent 100%)',
        }}
      >
        {[
          { keys: ['←', '→'], label: 'Naviguer' },
          { keys: ['Scroll'], label: 'Defiler' },
          { keys: ['Clic'], label: 'Selectionner' },
          { keys: ['/'], label: 'Recherche' },
          { keys: ['Tab'], label: 'Menu' },
        ].map((hint) => (
          <div key={hint.label} className="flex items-center gap-1.5 opacity-30 hover:opacity-60 transition-opacity">
            <div className="flex items-center gap-1">
              {hint.keys.map((k) => (
                <kbd
                  key={k}
                  className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 text-[10px] font-bold rounded font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  {k}
                </kbd>
              ))}
            </div>
            <span className="text-[11px] font-semibold text-white/50">{hint.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
