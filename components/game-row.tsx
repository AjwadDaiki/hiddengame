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

  const SCROLL_AMOUNT = 900

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

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      trackRef.current?.scrollBy({ left: e.deltaY * 1.5, behavior: 'smooth' })
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: rowIndex * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHoveringRow(true)}
      onMouseLeave={() => setIsHoveringRow(false)}
      className="relative"
    >
      {/* Row header */}
      <div className="flex items-end justify-between mb-5 px-8 md:px-16">
        <div className="flex items-center gap-3">
          <div className="w-0.5 h-5 rounded-full" style={{ background: 'rgba(168,85,247,0.6)' }} />
          <div>
            <h2 className="text-lg font-black tracking-tight leading-none text-white">{title}</h2>
            {subtitle && <p className="text-[11px] mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>{subtitle}</p>}
          </div>
        </div>
        <Link href={viewAllHref}>
          <span className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            Voir tout
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </span>
        </Link>
      </div>

      {/* Scroll arrows */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHoveringRow && canScrollLeft ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        onClick={() => scroll('left')}
        className="absolute left-3 top-1/2 z-20 w-9 h-9 rounded-xl flex items-center justify-center transition-colors backdrop-blur-sm"
        style={{
          transform: 'translateY(calc(-50% + 16px))',
          background: 'rgba(6,6,16,0.88)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHoveringRow && canScrollRight ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        onClick={() => scroll('right')}
        className="absolute right-3 top-1/2 z-20 w-9 h-9 rounded-xl flex items-center justify-center transition-colors backdrop-blur-sm"
        style={{
          transform: 'translateY(calc(-50% + 16px))',
          background: 'rgba(6,6,16,0.88)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </motion.button>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-8 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #060610, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-8 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #060610, transparent)' }} />

      {/* Scrollable track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onWheel={onWheel}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-8 md:px-16"
        style={{ scrollSnapType: 'x proximity' }}
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
