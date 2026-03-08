'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Topbar() {
  const [time, setTime] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

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
      if (e.key === '/') { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
      style={{
        background: 'linear-gradient(to bottom, rgba(7,7,15,0.98) 0%, rgba(7,7,15,0.0) 100%)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-8">
        <span
          className="text-xl font-black tracking-widest uppercase select-none"
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ArcadeWave
        </span>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {['Accueil', 'Explorer', 'Amis', 'Store'].map((item, i) => (
            <button
              key={item}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                i === 0
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Center search */}
      <div className="hidden md:flex items-center relative">
        <motion.div
          animate={{ width: searchOpen ? 320 : 220 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative"
        >
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2 cursor-text"
            onClick={() => setSearchOpen(true)}
          >
            <svg className="w-4 h-4 text-white/30 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="text-sm text-white/30 flex-1">
              {searchOpen ? <input autoFocus className="bg-transparent outline-none text-white w-full placeholder-white/30" placeholder="Rechercher un jeu..." onBlur={() => setSearchOpen(false)} /> : 'Rechercher...'}
            </span>
            <span className="text-xs text-white/20 font-mono border border-white/10 rounded px-1.5 py-0.5">/</span>
          </div>
        </motion.div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* XP bar */}
        <div className="hidden lg:flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white/50">Niv. 47</span>
            <span className="text-xs font-bold" style={{ color: '#a855f7' }}>12 840 XP</span>
          </div>
          <div className="w-28 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full xp-bar-fill"
              style={{
                width: '68%',
                background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
              }}
            />
          </div>
        </div>

        {/* Clock */}
        <span className="hidden md:block text-sm font-semibold text-white/30 tabular-nums">{time}</span>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center hover:bg-white/10 transition-colors">
          <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-[#07070f]" />
        </button>

        {/* Friends online */}
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.07] hover:bg-white/10 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-white/50">3 amis</span>
        </button>

        {/* Avatar */}
        <button
          className="w-9 h-9 rounded-xl overflow-hidden border-2 transition-all hover:scale-105"
          style={{ borderColor: 'rgba(168,85,247,0.5)' }}
        >
          <div
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)' }}
          />
        </button>
      </div>
    </header>
  )
}
