'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ALL_GAMES, Game } from '@/data/games'
import GameCard from '@/components/game-card'
import PageNav from '@/components/page-nav'

// ─── All distinct genres ──────────────────────────────────────────────────────
const ALL_GENRES = ['Tous', ...Array.from(new Set(ALL_GAMES.map(g => g.genre))).sort()]

// ─── Search input ─────────────────────────────────────────────────────────────
function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Rechercher un jeu..."
        className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm text-white outline-none transition-all"
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onFocus={e => { e.currentTarget.style.border = '1px solid rgba(168,85,247,0.5)' }}
        onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)' }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity text-white"
        >
          ✕
        </button>
      )}
    </div>
  )
}

// ─── Genre pill ───────────────────────────────────────────────────────────────
function GenrePill({ label, active, count, onClick }: { label: string; active: boolean; count: number; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border"
      style={active ? {
        background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
        borderColor: '#a855f780',
        color: '#fff',
        boxShadow: '0 4px 20px #a855f740',
      } : {
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.04)',
        color: 'rgba(255,255,255,0.55)',
      }}
      whileHover={active ? {} : { borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {label}
      <span
        className="text-xs px-1.5 py-0.5 rounded-full font-bold"
        style={{ backgroundColor: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)', color: active ? '#fff' : 'rgba(255,255,255,0.4)' }}
      >
        {count}
      </span>
    </motion.button>
  )
}

// ─── Sort options ─────────────────────────────────────────────────────────────
type SortKey = 'rating' | 'title' | 'new'
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'rating', label: 'Mieux notés' },
  { key: 'new', label: 'Nouveautés' },
  { key: 'title', label: 'A → Z' },
]

export default function GamesPage() {
  const [search, setSearch] = useState('')
  const [activeGenre, setActiveGenre] = useState('Tous')
  const [sort, setSort] = useState<SortKey>('rating')
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  const genreCounts = useMemo(() => {
    const map: Record<string, number> = { Tous: ALL_GAMES.length }
    ALL_GAMES.forEach(g => { map[g.genre] = (map[g.genre] ?? 0) + 1 })
    return map
  }, [])

  const filtered = useMemo(() => {
    let games = ALL_GAMES
    if (activeGenre !== 'Tous') games = games.filter(g => g.genre === activeGenre)
    if (search.trim()) {
      const q = search.toLowerCase()
      games = games.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    return [...games].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      return 0
    })
  }, [search, activeGenre, sort])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#07070f' }}>
      <PageNav />
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, #a855f715 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="dot-grid absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Accueil
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span className="text-sm text-white">Catalogue</span>
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-black text-white">Tous les jeux</h1>
              <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {ALL_GAMES.length} jeux disponibles · Joue gratuitement dans ton navigateur
              </p>
            </div>
            {/* Sort */}
            <div className="flex items-center gap-2">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSort(opt.key)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border"
                  style={sort === opt.key ? {
                    borderColor: '#a855f760',
                    backgroundColor: '#a855f720',
                    color: '#a855f7',
                  } : {
                    borderColor: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filters row */}
        <motion.div
          className="flex flex-col gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SearchBar value={search} onChange={setSearch} />
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {ALL_GENRES.map(genre => (
              <GenrePill
                key={genre}
                label={genre}
                active={activeGenre === genre}
                count={genreCounts[genre] ?? 0}
                onClick={() => setActiveGenre(genre)}
              />
            ))}
          </div>
        </motion.div>

        {/* Neon separator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, #a855f740, transparent)' }} />
          <span className="text-xs tracking-widest uppercase font-bold" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, #a855f740, transparent)' }} />
        </div>

        {/* Game grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center py-24 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-5xl mb-4">🎮</div>
              <p className="text-lg font-bold text-white mb-2">Aucun jeu trouvé</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Essaie un autre terme de recherche ou une autre catégorie
              </p>
              <button
                onClick={() => { setSearch(''); setActiveGenre('Tous') }}
                className="mt-6 px-6 py-2.5 rounded-full text-sm font-medium border"
                style={{ borderColor: '#a855f740', color: '#a855f7', backgroundColor: '#a855f710' }}
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeGenre}-${search}-${sort}`}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
                  onMouseEnter={() => setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  <Link href={`/play/${game.slug}`}>
                    <GameCard
                      game={game}
                      size="sm"
                      isFocused={hoveredGame === game.id}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
