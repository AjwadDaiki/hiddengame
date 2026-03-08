'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Game } from '@/data/games'
import GameCard from './game-card'
import PageNav from './page-nav'

export default function TopGamesClient({ games }: { games: Game[] }) {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#07070f' }}>
      <PageNav />

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: '#f97316', filter: 'blur(200px)', opacity: 0.06 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="dot-grid absolute inset-0 opacity-20" />
      </div>

      {/* Neon top line */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(to right, transparent, #f97316, transparent)', boxShadow: '0 0 20px #f9731680' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: '#f97316', boxShadow: '0 0 20px #f97316' }} />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black text-white">Top Jeux</h1>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-orange-400">Live</span>
                </div>
              </div>
              <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Classement en temps réel · {games.length} jeux
              </p>
            </div>
          </div>
        </motion.div>

        {/* Top 3 podium */}
        {games.length >= 3 && (
          <motion.div
            className="grid grid-cols-3 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[games[1], games[0], games[2]].map((game, podiumIndex) => {
              const rank = podiumIndex === 0 ? 2 : podiumIndex === 1 ? 1 : 3
              const heights = ['h-4', 'h-8', 'h-2']
              const medals = ['🥈', '🥇', '🥉']
              return (
                <Link key={game.id} href={`/play/${game.slug}`}>
                  <motion.div
                    className={`relative flex flex-col items-center gap-3 p-6 rounded-3xl border cursor-pointer ${podiumIndex === 1 ? 'ring-2' : ''}`}
                    style={{
                      background: `linear-gradient(135deg, ${game.gradientFrom}80, ${game.gradientVia}40)`,
                      borderColor: game.accent + (podiumIndex === 1 ? '60' : '25'),
                      boxShadow: podiumIndex === 1 ? `0 20px 60px ${game.accent}30, 0 0 0 2px ${game.accent}` : `0 8px 30px rgba(0,0,0,0.4)`,
                    }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  >
                    <span className="text-3xl">{medals[podiumIndex]}</span>
                    <div className="text-center">
                      <p className="font-black text-white text-sm leading-tight">{game.title}</p>
                      <p className="text-xs mt-1" style={{ color: game.accent }}>{game.genre}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      <span className="text-xs font-bold" style={{ color: game.accent }}>{game.rating}</span>
                    </div>
                    {/* Rank number */}
                    <div
                      className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                      style={{ backgroundColor: game.accent + '20', color: game.accent, border: `1px solid ${game.accent}35` }}
                    >
                      #{rank}
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </motion.div>
        )}

        {/* Neon separator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #f9731640, transparent)' }} />
          <span className="text-xs tracking-widest uppercase font-bold" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Classement complet
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, #f9731640, transparent)' }} />
        </div>

        {/* Full grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              className="relative"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.5) }}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
            >
              {/* Rank badge */}
              <div
                className="absolute top-2 left-2 z-10 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black"
                style={{
                  backgroundColor: i < 3 ? game.accent : 'rgba(0,0,0,0.7)',
                  color: i < 3 ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {i + 1}
              </div>
              <Link href={`/play/${game.slug}`}>
                <GameCard game={game} size="sm" isFocused={hoveredGame === game.id} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
