'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface TopbarProps {
  accentColor?: string
}

export default function Topbar({ accentColor = '#a855f7' }: TopbarProps) {
  const [time, setTime] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
    }
    update()
    const t = setInterval(update, 10000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchOpen) { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery('') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [searchOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14"
        style={{
          background: 'linear-gradient(to bottom, rgba(6,6,16,0.97) 0%, rgba(6,6,16,0.0) 100%)',
        }}
      >
        {/* Left — logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accentColor}, #06b6d4)` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <span
            className="text-base font-black tracking-widest uppercase select-none"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #06b6d4 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'background 0.8s ease',
            }}
          >
            ArcadeWave
          </span>
        </Link>

        {/* Center — search */}
        <motion.div
          className="hidden md:flex items-center"
          animate={{ width: searchOpen ? 380 : 200 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div
            className="w-full flex items-center gap-2 rounded-xl px-3.5 py-2 cursor-text"
            style={{
              background: 'rgba(255,255,255,0.055)',
              border: searchOpen ? `1px solid ${accentColor}50` : '1px solid rgba(255,255,255,0.07)',
              boxShadow: searchOpen ? `0 0 20px ${accentColor}15` : 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onClick={() => setSearchOpen(true)}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ color: searchOpen ? accentColor : 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            {searchOpen ? (
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-white text-sm w-full placeholder-white/30"
                placeholder="Rechercher un jeu..."
                onBlur={() => { if (!searchQuery) { setSearchOpen(false) } }}
              />
            ) : (
              <span className="text-sm text-white/25 flex-1">Rechercher...</span>
            )}
            {!searchOpen && (
              <kbd className="text-[10px] text-white/20 font-mono border border-white/10 rounded px-1.5 py-0.5 flex-shrink-0">/</kbd>
            )}
          </div>
        </motion.div>

        {/* Right — system status */}
        <div className="flex items-center gap-3">

          {/* XP / Level */}
          <div className="hidden lg:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-white/40">NIV. 47</span>
              <span className="text-[10px] font-black" style={{ color: accentColor, transition: 'color 0.8s' }}>
                12 840 XP
              </span>
            </div>
            <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-full xp-bar-fill"
                style={{ width: '68%', background: `linear-gradient(90deg, ${accentColor}90, ${accentColor})`, transition: 'background 0.8s ease' }}
              />
            </div>
          </div>

          {/* Clock */}
          <div
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <svg className="w-3 h-3 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="text-sm font-bold text-white/55 tabular-nums">{time}</span>
          </div>

          {/* Friends online */}
          <button
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="text-xs font-semibold text-white/45">3 amis</span>
          </button>

          {/* Notifications */}
          <button
            className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <svg className="w-4 h-4 text-white/45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>

          {/* Avatar */}
          <button
            className="w-8 h-8 rounded-lg overflow-hidden border-2 hover:scale-105 transition-transform"
            style={{ borderColor: `${accentColor}60`, transition: 'border-color 0.8s' }}
          >
            <div
              className="w-full h-full"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #06b6d4)`, transition: 'background 0.8s' }}
            />
          </button>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-14 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 px-4"
          >
            <div
              className="rounded-2xl overflow-hidden backdrop-blur-2xl"
              style={{
                background: 'rgba(10,10,24,0.96)',
                border: `1px solid ${accentColor}25`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${accentColor}10`,
              }}
            >
              <div className="p-4">
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                  Résultats pour "{searchQuery}"
                </p>
                <Link href={`/games?q=${encodeURIComponent(searchQuery)}`} onClick={() => { setSearchOpen(false); setSearchQuery('') }}>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <span className="text-sm text-white/70">Rechercher "{searchQuery}" dans le catalogue</span>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
