'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import GameCard from './game-card'
import { Game } from '@/data/games'

interface GameRowProps {
  title: string
  subtitle?: string
  games: Game[]
  cardSize?: 'sm' | 'md' | 'lg'
  focusedId?: string
  viewAllHref?: string
  onGameHover?: (game: Game) => void
  onGameHoverEnd?: () => void
  onGameClick?: (game: Game) => void
  rowIndex: number
}

export default function GameRow({
  title,
  subtitle,
  games,
  cardSize = 'md',
  focusedId,
  viewAllHref = '/games',
  onGameHover,
  onGameHoverEnd,
  onGameClick,
  rowIndex,
}: GameRowProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHoveringRow, setIsHoveringRow] = useState(false)

  const SCROLL_AMOUNT = 800

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? SCROLL_AMOUNT : -SCROLL_AMOUNT, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  // Mouse wheel -> horizontal scroll
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      trackRef.current?.scrollBy({ left: e.deltaY * 1.5, behavior: 'smooth' })
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: rowIndex * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHoveringRow(true)}
      onMouseLeave={() => setIsHoveringRow(false)}
      className="relative"
    >
      {/* Row header */}
      <div className="flex items-end justify-between mb-5"
        style={{ paddingLeft: 'max(80px, calc(64px + 1.5rem))', paddingRight: '3rem' }}
      >
        <div className="flex items-center gap-3">
          {/* Neon dot accent */}
          <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(to bottom, rgba(168,85,247,0.8), rgba(6,182,212,0.4))' }} />
          <div>
            <h2 className="text-lg font-black tracking-tight leading-none">{title}</h2>
            {subtitle && <p className="text-[11px] text-white/30 font-medium mt-1">{subtitle}</p>}
          </div>
        </div>
        <Link href={viewAllHref} className="text-xs font-bold text-white/35 hover:text-white/70 transition-colors flex items-center gap-1 uppercase tracking-widest">
          Voir tout
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </Link>
      </div>

      {/* Scroll arrows */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHoveringRow && canScrollLeft ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 z-20 w-10 h-10 rounded-xl bg-[#07070f]/90 border border-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors"
        style={{ transform: 'translateY(calc(-50% + 16px))' }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHoveringRow && canScrollRight ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 z-20 w-10 h-10 rounded-xl bg-[#07070f]/90 border border-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors"
        style={{ transform: 'translateY(calc(-50% + 16px))' }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </motion.button>

      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-8 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #07070f, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-8 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #07070f, transparent)' }}
      />

      {/* Scrollable track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onWheel={onWheel}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4"
        style={{ scrollSnapType: 'x proximity', paddingLeft: 'max(80px, calc(64px + 1.5rem))', paddingRight: '3rem' }}
      >
        {games.map((game) => (
          <div key={game.id} style={{ scrollSnapAlign: 'start' }}>
            <Link href={`/play/${game.slug}`} onClick={() => onGameClick?.(game)}>
              <GameCard
                game={game}
                size={cardSize}
                isFocused={focusedId === game.id}
                onHover={onGameHover}
                onHoverEnd={onGameHoverEnd}
              />
            </Link>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
