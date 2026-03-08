'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Game } from '@/data/games'
import GameCard from './game-card'
import PageNav from './page-nav'

// Accent color per genre
const GENRE_ACCENTS: Record<string, string> = {
  rpg: '#a855f7',
  mmo: '#2c5364',
  fps: '#3b82f6',
  'battle royale': '#f43f5e',
  survie: '#22c55e',
  combat: '#f97316',
  jrpg: '#a855f7',
  puzzle: '#94a3b8',
  strategie: '#84cc16',
  horreur: '#ef4444',
  course: '#f59e0b',
  aventure: '#06b6d4',
  simulation: '#06b6d4',
  action: '#ef4444',
  moba: '#3b82f6',
  sport: '#f59e0b',
  platformer: '#a855f7',
  'tower defense': '#22c55e',
  arcade: '#ec4899',
}

interface Props {
  genre: { slug: string; name: string; count: number }
  games: Game[]
  allGenres: { slug: string; name: string; count: number }[]
}

export default function GenrePageClient({ genre, games, allGenres }: Props) {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)
  const accent = GENRE_ACCENTS[genre.slug] ?? '#a855f7'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#07070f' }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[700px] h-[500px] rounded-full"
          style={{ background: accent, filter: 'blur(200px)', opacity: 0.07 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="dot-grid absolute inset-0 opacity-20" />
      </div>

      <PageNav />

      {/* Neon top line */}
      <div
        className="relative z-10 h-[2px]"
        style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)`, boxShadow: `0 0 20px ${accent}80` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 mb-8 text-sm"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>Accueil</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <Link href="/games" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>Catalogue</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span className="font-medium" style={{ color: accent }}>{genre.name}</span>
        </motion.div>

        {/* Genre header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <div
              className="w-1.5 h-10 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 20px ${accent}` }}
            />
            <h1 className="text-5xl font-black text-white">{genre.name}</h1>
          </div>
          <p className="text-sm pl-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {genre.count} jeux disponibles · Joue gratuitement sans téléchargement
          </p>
          <motion.div
            className="mt-4 ml-6 h-[2px] rounded-full"
            style={{ background: `linear-gradient(to right, ${accent}, transparent)`, boxShadow: `0 0 15px ${accent}80` }}
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* All genres sidebar nav */}
        <div className="flex gap-8">
          {/* Sidebar — other genres */}
          <motion.aside
            className="hidden lg:flex flex-col gap-2 w-44 shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Genres
            </p>
            {allGenres.map(g => (
              <Link key={g.slug} href={`/genre/${g.slug}`}>
                <motion.div
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors"
                  style={g.slug === genre.slug ? {
                    backgroundColor: accent + '20',
                    color: accent,
                    border: `1px solid ${accent}35`,
                  } : {
                    color: 'rgba(255,255,255,0.45)',
                    border: '1px solid transparent',
                  }}
                  whileHover={g.slug !== genre.slug ? { color: '#fff', borderColor: 'rgba(255,255,255,0.12)' } : {}}
                >
                  <span>{g.name}</span>
                  <span className="text-xs opacity-50">{g.count}</span>
                </motion.div>
              </Link>
            ))}
          </motion.aside>

          {/* Game grid */}
          <div className="flex-1">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {games.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.5) }}
                  onMouseEnter={() => setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  <Link href={`/play/${game.slug}`}>
                    <GameCard
                      game={game}
                      size="md"
                      isFocused={hoveredGame === game.id}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {games.length === 0 && (
              <div className="flex flex-col items-center py-20 text-center">
                <p className="text-4xl mb-4">🎮</p>
                <p className="font-bold text-white text-lg mb-2">Aucun jeu dans cette catégorie</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Reviens bientôt, on ajoute des jeux chaque semaine.</p>
                <Link href="/games">
                  <motion.div
                    className="mt-6 px-6 py-2.5 rounded-full text-sm font-medium border"
                    style={{ borderColor: accent + '40', color: accent, backgroundColor: accent + '10' }}
                    whileHover={{ backgroundColor: accent + '20' }}
                  >
                    Voir tout le catalogue
                  </motion.div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
